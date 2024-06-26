import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import OpenAI from 'openai';
import Replicate from "replicate";
import { increaseApiLimit, checkApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});
const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN || ""
})
export async function POST(request: Request) {
  try {
    const { userId } = auth();
    const body = await request.json();
    const { messages } = body;
    const isPro = await checkSubscription();
    console.log("[api/conversation3]", messages);
    if (!userId) {
      return new NextResponse("[api/conversation3] unauthorized", { status: 401 });
    }
    if (!process.env.OPENAI_API_KEY) {
      return new NextResponse("[api/conversation3] no config openapi key", { status: 500 });
    }
    if (!messages) {
      return new NextResponse("[api/conversation3] no messages", { status: 500 });
    }
    
    const freeTrial = await checkApiLimit();
    
    if (!freeTrial && !isPro) {
      //403 error 권한 때문에 거절됨을 의미한다.
      return new NextResponse("[api/conversation3] api limit exceeded", { status: 403 });
    }
    
    const response = await openai.chat.completions.create({
      // model: "gpt-3.5-turbo",
      model: "gpt-3.5-turbo-0301",
      messages: [{ "role": "user", "content": messages[messages.length - 1].content }],
    });
    console.log("[api/conversation3]", response.choices[0].message);
    if (!isPro) {
      await increaseApiLimit();
      
    }
    return NextResponse.json(response.choices[0].message, { status: 200 });
  } catch (error) {
    console.log("[api/conversation3]", error);
    return new NextResponse("[api/conversation3] Error", { status: 500 });
  }
}
