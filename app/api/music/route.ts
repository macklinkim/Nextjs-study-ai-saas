import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Replicate from "replicate"
import { increaseApiLimit, checkApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";
const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN || ""
});

export async function POST(request: Request) {
  try {
    const { userId } = auth();
    const body = await request.json();
    const { prompt } = body;
    const isPro = await checkSubscription();
    console.log("[api/music]", prompt);
    if (!userId) {
      return new NextResponse("[api/music] unauthorized user", { status: 401 });
    }
    if (!process.env.REPLICATE_API_TOKEN) {
      return new NextResponse("[api/music] no config Replicate key", { status: 500 });
    }
    if (!prompt) {
      return new NextResponse("[api/music] no prompt provided", { status: 500 });
    }
    const freeTrial = await checkApiLimit();
    if (!freeTrial && !isPro) {
      return new NextResponse("[api/conversation] api limit exceeded", { status: 403 });
    }
    const response = await replicate.run("riffusion/riffusion:8cf61ea6c56afd61d8f5b9ffd14d7c216c0a93844ce2d82ac1c9ecc9c7f24e05",
      {
        input: {
          prompt_b: prompt
        }
      });
    if (!isPro) {
      await increaseApiLimit();
    }
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.log("[api/music]", error);
    return new NextResponse("[api/music] Error", { status: 500 });
  }
}
