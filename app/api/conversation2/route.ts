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
    const { messages } = body;
    const isPro = await checkSubscription();
    console.log("[api/Llama3]", messages);
    if (!userId) {
      return new NextResponse("[api/Llama3] unauthorized user", { status: 401 });
    }
    if (!process.env.REPLICATE_API_TOKEN) {
      return new NextResponse("[api/Llama3] no config Replicate key", { status: 500 });
    }
    if (!messages) {
      return new NextResponse("[api/Llama3] no prompt provided", { status: 500 });
    }
    const freeTrial = await checkApiLimit();
    if (!freeTrial&&!isPro) {
      //403 error 권한 때문에 거절됨을 의미한다.
      return new NextResponse("[api/conversation] api limit exceeded", { status: 403 });
    }
    let response = '';
    for await (const event of replicate.stream("meta/meta-llama-3-70b-instruct",
      {
        input: {
          prompt: messages[messages.length - 1].content
        }
      })) {
      response += event;
    };
    console.log('[api/Llama3/response]', response);
    if (!isPro) {
      await increaseApiLimit();
    }
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.log("[api/Llama3]", error);
    return new NextResponse("[api/Llama3] Error", { status: 500 });
  }
}
