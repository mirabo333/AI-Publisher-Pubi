import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { image, question } = await request.json();

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    };

    const payload: any = {
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content: [],
        },
      ],
      max_tokens: 2000,
    };

    if (image) {
      payload.messages[0].content.push({
        type: "image_url",
        image_url: {
          url: `data:image/jpeg;base64,${image}`,
        },
      });

      payload.messages[0].content.push({
        type: "text",
        text: `
        아래의 요청사항을 최대한 상세하게 반영해서 전송한 이미지와 동일한 웹 페이지의 UI를 구성해줘. 
        1. React는 tsx파일로 작성.
        2. React 코드의 컴포넌트 명은 App 으로 설정.
        3. 스타일링에는 SCSS 사용, 재사용을 위해 변수와 mixin 사용.
        4. SCSS를 통해 구현한 스타일링과 정확히 일치하는 CSS 파일 코드를 함께 제공.
        5. 코드의 들여쓰기는 4 스페이스로 설정.
        6. 레이아웃, 색상 등 이미지의 구성요소를 최대한 정확하게 반영하며, 이미지에 없는 요소는 추가하지 않음.
        `,
      });

      console.log(payload.message, "::: payloadMessage");
    }

    if (question) {
      payload.messages[0].content.push({
        type: "text",
        text: question,
      });
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(payload),
    });

    console.log(response, "::: response");

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json();

    console.log(responseData);

    return NextResponse.json(
      { answer: responseData.choices[0].message.content },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
