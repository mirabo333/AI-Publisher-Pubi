import { NextRequest, NextResponse } from "next/server";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const SYSTEM_PROMPT = `당신은 UI 코드 생성 전문 어시스턴트입니다.
이미지나 텍스트 요청을 받아 웹 UI 코드를 생성합니다.
코드 생성 규칙:
1. React는 tsx 파일로 작성, 컴포넌트 명은 App으로 설정.
2. 스타일링에는 SCSS 사용, 재사용을 위해 변수와 mixin 사용.
3. SCSS와 정확히 일치하는 CSS 파일 코드를 함께 제공.
4. 코드 들여쓰기는 4 스페이스.
5. 레이아웃, 색상 등 이미지의 구성요소를 최대한 정확하게 반영, 이미지에 없는 요소는 추가하지 않음.
이전 대화 내용을 참고하여 수정 요청에 응답할 때는 기존 코드를 기반으로 변경사항을 반영하세요.`;

export async function POST(request: NextRequest) {
  try {
    const { image, question, chatHistory = [] }: { image?: string; question?: string; chatHistory: ChatMessage[] } = await request.json();

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    };

    // 현재 유저 메시지 구성 (이미지 + 텍스트)
    const currentUserContent: any[] = [];

    if (image) {
      currentUserContent.push({
        type: "image_url",
        image_url: {
          url: `data:image/jpeg;base64,${image}`,
        },
      });
    }

    currentUserContent.push({
      type: "text",
      text: image
        ? `이미지를 분석해서 동일한 웹 UI를 구현해줘. ${question || ""}`
        : question || "",
    });

    // 메시지 배열: system + 이전 대화 + 현재 메시지
    const messages: any[] = [
      { role: "system", content: SYSTEM_PROMPT },
      ...chatHistory.map((msg) => ({
        role: msg.role,
        content: msg.content,
      })),
      {
        role: "user",
        content: currentUserContent,
      },
    ];

    const payload = {
      model: "gpt-4o",
      messages,
      max_tokens: 4096,
    };

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json();
    const answer = responseData.choices[0].message.content;

    return NextResponse.json({ answer }, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
