import { NextRequest } from "next/server";

type Provider = "openai" | "anthropic" | "gemini";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

// OpenAI content types
type OpenAIContentPart =
  | { type: "image_url"; image_url: { url: string } }
  | { type: "text"; text: string };

type OpenAIMessage =
  | { role: "system"; content: string }
  | { role: "user" | "assistant"; content: string | OpenAIContentPart[] };

// Anthropic content types
type AnthropicContentPart =
  | { type: "image"; source: { type: "base64"; media_type: string; data: string } }
  | { type: "text"; text: string };

type AnthropicMessage = {
  role: "user" | "assistant";
  content: string | AnthropicContentPart[];
};

// Gemini content types
type GeminiPart =
  | { text: string }
  | { inline_data: { mime_type: string; data: string } };

type GeminiContent = {
  role: "user" | "model";
  parts: GeminiPart[];
};

const SYSTEM_PROMPT = `당신은 UI 코드 생성 전문 어시스턴트입니다.
이미지나 텍스트 요청을 받아 웹 UI 코드를 생성합니다.
코드 생성 규칙:
1. React는 tsx 파일로 작성, 컴포넌트 명은 App으로 설정.
2. 스타일링에는 SCSS 사용, 재사용을 위해 변수와 mixin 사용.
3. SCSS와 정확히 일치하는 CSS 파일 코드를 함께 제공.
4. 코드 들여쓰기는 4 스페이스.
5. 레이아웃, 색상 등 이미지의 구성요소를 최대한 정확하게 반영, 이미지에 없는 요소는 추가하지 않음.
이전 대화 내용을 참고하여 수정 요청에 응답할 때는 기존 코드를 기반으로 변경사항을 반영하세요.`;

// ── OpenAI (GPT-4o) ──────────────────────────────────────────────────────────
async function streamOpenAI(
  apiKey: string,
  chatHistory: ChatMessage[],
  image?: string,
  question?: string,
  mimeType = "image/jpeg"
): Promise<ReadableStream> {
  const currentContent: OpenAIContentPart[] = [];

  if (image) {
    currentContent.push({
      type: "image_url",
      image_url: { url: `data:${mimeType};base64,${image}` },
    });
  }
  currentContent.push({
    type: "text",
    text: image ? `이미지를 분석해서 동일한 웹 UI를 구현해줘. ${question ?? ""}` : question ?? "",
  });

  const messages: OpenAIMessage[] = [
    { role: "system", content: SYSTEM_PROMPT },
    ...chatHistory.map((m): OpenAIMessage => ({ role: m.role, content: m.content })),
    { role: "user", content: currentContent },
  ];

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({ model: "gpt-4o", messages, max_tokens: 8192, stream: true }),
  });

  if (!res.ok) throw new Error(`OpenAI error: ${res.status} ${await res.text()}`);

  return new ReadableStream({
    async start(controller) {
      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";
        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const data = line.slice(6).trim();
          if (data === "[DONE]") continue;
          try {
            const json = JSON.parse(data);
            const text = json.choices?.[0]?.delta?.content;
            if (text) controller.enqueue(new TextEncoder().encode(text));
          } catch {}
        }
      }
      controller.close();
    },
  });
}

// ── Anthropic (Claude) ────────────────────────────────────────────────────────
async function streamAnthropic(
  apiKey: string,
  chatHistory: ChatMessage[],
  image?: string,
  question?: string,
  mimeType = "image/jpeg"
): Promise<ReadableStream> {
  const currentContent: AnthropicContentPart[] = [];

  if (image) {
    currentContent.push({
      type: "image",
      source: { type: "base64", media_type: mimeType, data: image },
    });
  }
  currentContent.push({
    type: "text",
    text: image ? `이미지를 분석해서 동일한 웹 UI를 구현해줘. ${question ?? ""}` : question ?? "",
  });

  const messages: AnthropicMessage[] = [
    ...chatHistory.map((m): AnthropicMessage => ({ role: m.role, content: m.content })),
    { role: "user", content: currentContent },
  ];

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-6",
      max_tokens: 8192,
      system: SYSTEM_PROMPT,
      stream: true,
      messages,
    }),
  });

  if (!res.ok) throw new Error(`Anthropic error: ${res.status} ${await res.text()}`);

  return new ReadableStream({
    async start(controller) {
      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";
        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const data = line.slice(6).trim();
          try {
            const json = JSON.parse(data);
            if (json.type === "content_block_delta" && json.delta?.type === "text_delta") {
              controller.enqueue(new TextEncoder().encode(json.delta.text));
            }
          } catch {}
        }
      }
      controller.close();
    },
  });
}

// ── Google Gemini ─────────────────────────────────────────────────────────────
async function streamGemini(
  apiKey: string,
  chatHistory: ChatMessage[],
  image?: string,
  question?: string,
  mimeType = "image/jpeg"
): Promise<ReadableStream> {
  const contents: GeminiContent[] = chatHistory.map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }],
  }));

  const currentParts: GeminiPart[] = [];
  if (image) {
    currentParts.push({ inline_data: { mime_type: mimeType, data: image } });
  }
  currentParts.push({
    text: image ? `이미지를 분석해서 동일한 웹 UI를 구현해줘. ${question ?? ""}` : question ?? "",
  });
  contents.push({ role: "user", parts: currentParts });

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:streamGenerateContent?alt=sse&key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents,
        systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
        generationConfig: { maxOutputTokens: 8192 },
      }),
    }
  );

  if (!res.ok) throw new Error(`Gemini error: ${res.status} ${await res.text()}`);

  return new ReadableStream({
    async start(controller) {
      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";
        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const data = line.slice(6).trim();
          try {
            const json = JSON.parse(data);
            const text = json.candidates?.[0]?.content?.parts?.[0]?.text;
            if (text) controller.enqueue(new TextEncoder().encode(text));
          } catch {}
        }
      }
      controller.close();
    },
  });
}

// ── Main handler ──────────────────────────────────────────────────────────────
export async function POST(request: NextRequest) {
  try {
    const {
      image,
      question,
      chatHistory = [],
      provider,
      apiKey,
      imageMimeType = "image/jpeg",
    }: {
      image?: string;
      question?: string;
      chatHistory: ChatMessage[];
      provider: Provider;
      apiKey: string;
      imageMimeType?: string;
    } = await request.json();

    if (!apiKey) {
      return new Response(JSON.stringify({ error: "API key가 필요합니다." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (!image && !question) {
      return new Response(JSON.stringify({ error: "이미지 또는 질문이 필요합니다." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    let stream: ReadableStream;

    switch (provider) {
      case "openai":
        stream = await streamOpenAI(apiKey, chatHistory, image, question, imageMimeType);
        break;
      case "anthropic":
        stream = await streamAnthropic(apiKey, chatHistory, image, question, imageMimeType);
        break;
      case "gemini":
        stream = await streamGemini(apiKey, chatHistory, image, question, imageMimeType);
        break;
      default:
        return new Response(JSON.stringify({ error: "지원하지 않는 provider입니다." }), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        });
    }

    return new Response(stream, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: "Something went wrong" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
