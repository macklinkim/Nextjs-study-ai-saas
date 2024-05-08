import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import OpenAI from 'openai';
import { increaseApiLimit, checkApiLimit } from "@/lib/api-limit";
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function POST(request: Request) {
  try {
    const { userId } = auth();
    const body = await request.json();
    const { prompt, amount = 1, resolution = "256x256" } = body;
    console.log("[api/image] prompt", prompt, ' amount:', amount, ' resolution :', resolution);
    if (!userId) {
      return new NextResponse("[api/image] unauthorized", { status: 401 });
    }
    if (!process.env.OPENAI_API_KEY) {
      return new NextResponse("[api/image] no config openapi key", { status: 500 });
    }
    if (!prompt) {
      return new NextResponse("[api/image] no prompt", { status: 500 });
    }
    if (!amount) {
      return new NextResponse("[api/image] no amount", { status: 500 });
    }
    if (!resolution) {
      return new NextResponse("[api/image] no resolution", { status: 500 });
    }
    //더이상 createImage는 사용하지 않는다.
    //https://community.openai.com/t/image-generation-stopped-working/479663
    /* 
    openai.images.generate({
    model: "dall-e-3",
    prompt: "a white siamese cat",
    n: 1,
    size: "1024x1024",
    }); 
    */
    const freeTrial = await checkApiLimit();
    if (!freeTrial) {
      //403 error 권한 때문에 거절됨을 의미한다.
      return new NextResponse("[api/conversation] api limit exceeded", { status: 403 });
    }
    let response = null;
    //dall-e 2는 256x256, 512x512 까지 생성지원한다.
    //dall-e 3는 1024x1024만 생성지원됩니다.
    if (resolution === "256x256" || resolution === "512x512") {
      response = await openai.images.generate({
        model: "dall-e-2",
        prompt: prompt,
        n: Number(amount),
        size: resolution,
      });
    } else if (resolution === "1024x1024") {
      response = await openai.images.generate({
        model: "dall-e-3",
        prompt: prompt,
        n: Number(amount),
        size: resolution,
      });
    }
    console.log("[api/image]", response?.data);
    await increaseApiLimit();
    return NextResponse.json(response?.data, { status: 200 });
  } catch (error) {
    console.log("[api/image]", error);
    return new NextResponse("[api/image] Error", { status: 500 });
  }
}
