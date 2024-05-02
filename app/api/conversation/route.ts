import { config } from "./../../../middleware";
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
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{"role": "user", "content": messages[messages.length-1].content}],
    });
    console.log("[api/conversation]", response.choices[0].message);
    
		return NextResponse.json(response.choices[0].message, { status: 200 });
	} catch (error) {
		console.log("[api/conversation]", error);
		return new NextResponse("[api/conversation] Error", { status: 500 });
	}
}
