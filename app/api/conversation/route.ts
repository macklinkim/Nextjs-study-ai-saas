import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import OpenAI from 'openai';

import { increaseApiLimit, checkApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function POST(request: Request) {
  try {
    const { userId } = auth();
    const body = await request.json();
    const { messages } = body;
    const freeTrial = await checkApiLimit();
    const isPro = await checkSubscription();

    console.log("[api/conversation]", messages);
    if (!userId) {
      return new NextResponse("[api/conversation] unauthorized", { status: 401 });
    }
    if (!process.env.OPENAI_API_KEY) {
      return new NextResponse("[api/conversation] no config openapi key", { status: 500 });
    }
    if (!messages) {
      return new NextResponse("[api/conversation] no messages", { status: 500 });
    }

    if (!freeTrial && !isPro) {
      //403 error 권한 때문에 거절됨을 의미한다.
      return new NextResponse("[api/conversation] api limit exceeded", { status: 403 });
    }

    const response = await openai.chat.completions.create({
      // model: "gpt-3.5-turbo",
      model: "gpt-4",
      messages: [{ "role": "user", "content": messages[messages.length - 1].content }],
    });
    console.log("[api/conversation]", response.choices[0].message);
    if (!isPro) {
      await increaseApiLimit();
    }
    return NextResponse.json(response.choices[0].message, { status: 200 });
  } catch (error) {
    console.log("[api/conversation]", error);
    return new NextResponse("[api/conversation] Error", { status: 500 });
  }
}
