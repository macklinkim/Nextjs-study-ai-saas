import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
// import Configuration from "openai";
// import OpenAIApi from "openai";
import OpenAI from 'openai';
import { amountOptions } from '../../(dashboard)/(routes)/image/constants';

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
    let response = null;
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

    return NextResponse.json(response?.data , { status: 200 });
  } catch (error) {
    console.log("[api/image]", error);
    return new NextResponse("[api/image] Error", { status: 500 });
  }
}
