import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";
import { NextApiRequest } from "next";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function GET(request: NextApiRequest) {
  const { question, img } = request.query;

  // const imgPath = "/NEWS/IMAGE/2017/01/06/82204593.1.jpg";
  // "https://lh4.googleusercontent.com/proxy/NdFbPrPkG1hLsMdq-cul_WBQRJHJvQiRkow1j3C3UyYIuMyO5MWQpQmpeyrGNhtcPfLlf-OCELaWwFaO1wJy";
  // const imgData = fs.readFileSync(imgPath, { encoding: "base64" });
  // const imgData =
  // "NdFbPrPkG1hLsMdq-cul_WBQRJHJvQiRkow1j3C3UyYIuMyO5MWQpQmpeyrGNhtcPfLlf-OCELaWwFaO1wJy";

  // openai.
  const chatCompletion = await openai.chat.completions.create({
    messages: [
      { role: "user", content: question as string },
      {
        role: "user",
        content: [
          {
            type: "image_url",
            image_url: { url: `data:image/pngjpase64, ${img}` },
          },
        ],
      },
    ],
    model: "gpt-4o",
  });

  console.log(chatCompletion);

  return NextResponse.json(chatCompletion.choices[0]);
}

export async function POST(request: Request) {
  const { question, imgUrl } = await request.json();
  console.log("i am post!");

  const chatCompletion = await openai.chat.completions.create({
    messages: [
      { role: "user", content: question as string },
      {
        role: "user",
        content: [
          {
            type: "image_url",
            image_url: { url: imgUrl },
          },
        ],
      },
    ],
    model: "gpt-4o",
  });

  console.log(chatCompletion);

  return NextResponse.json(chatCompletion.choices[0]);
}
