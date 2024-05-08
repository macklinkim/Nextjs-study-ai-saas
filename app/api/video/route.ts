import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Replicate from "replicate"
import { increaseApiLimit, checkApiLimit } from "@/lib/api-limit";
const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN || ""
});

export async function POST(request: Request) {
  try {
    const { userId } = auth();
    const body = await request.json();
    const { prompt } = body;
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
    if (!freeTrial) {
      return new NextResponse("[api/conversation] api limit exceeded", { status: 403 });
    }
    const response = await replicate.run("anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351",
      {
        input: {
          fps: 24,
          width: 1024,
          height: 576,
          prompt: prompt,
          guidance_scale: 17.5,
          negative_prompt: "very blue, dust, noisy, washed out, ugly, distorted, broken"
        }
      });
    await increaseApiLimit();
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.log("[api/music]", error);
    return new NextResponse("[api/music] Error", { status: 500 });
  }
}
