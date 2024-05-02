import { ChatCompletionMessageParam } from 'openai/resources/chat/completions';
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
// import Configuration from "openai";
// import OpenAIApi from "openai";
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY // This is also the default, can be omitted
});

export async function POST(request: Request) {
	try {
		const { userId } = auth();
		const body = await request.json();
		const { messages } = body;
    const firstMessage:ChatCompletionMessageParam = {
      role: "system",
      content: "You are a code Generator. You must answer only in markdown code snippets. must add explanations and Use code comments for explanations.",
    }
    console.log("[api/Code]", messages);
    
		if (!userId) {
			return new NextResponse("[api/Code] unauthorized", { status: 401 });
		}
		if (!process.env.OPENAI_API_KEY) {
			return new NextResponse("[api/Code] no config openapi key", { status: 500 });
		}
		if (!messages) {
			return new NextResponse("[api/Code] no messages", { status: 500 });
		}
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [firstMessage, {"role": "user", "content": messages[messages.length-1].content}],
    });
    console.log("[api/Code]", response.choices[0].message);
    
		return NextResponse.json(response.choices[0].message, { status: 200 });
	} catch (error) {
		console.log("[api/Code]", error);
		return new NextResponse("[api/Code] Error", { status: 500 });
	}
}
