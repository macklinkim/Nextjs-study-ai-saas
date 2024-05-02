"use client"
import { useState } from "react";
import { ChatCompletionMessageParam } from "openai/resources/chat/completions";
import { useRouter } from "next/navigation";
import { Code } from "lucide-react";
import { useForm } from "react-hook-form";
import ReactMarkDown from "react-markdown";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod"
import { formSchema } from "./constants";
import axios from "axios";

import {
  Form,
  FormControl,
  FormField,
  FormItem
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import Heading from "@/components/heading";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Empty from "@/components/empty";
import Loader from "@/components/loader";
import UserAvatar from "@/components/user-avatar";
import BotAvatar from "@/components/bot-avatar";
const CodePage = () => {
  const router = useRouter();
  const [messages, setMessages] = useState<ChatCompletionMessageParam[]>([]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: ""
    }
  });

  const isLoading = form.formState.isSubmitting;
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const userMessage: ChatCompletionMessageParam = {
        role: "user",
        content: data.prompt,
      };
      const newMessages = [...messages, userMessage];
      const response = await axios.post("/api/code", {
        messages: newMessages,
      });
      setMessages((current) => [...current, userMessage, response.data]);
      console.log('[conversation page]', messages);
      form.reset();
    } catch (error: any) {
      console.log('[conversation page]', error);
    } finally {
      router.refresh();
    }
    console.log(data);
  }

  return (
    <div>
      <Heading
        title="AI에 코딩 질문하기"
        description="Gpt[3.5]-turbo AI에 코딩 질문하기"
        icon={Code}
        iconColor="text-orange-500"
        bgColor="bg-orange-500/10" />
      {/* npx shadcn-ui@latest add form, shadcn ui써서 작성, useForm, zod 합쳐짐 개꿀 */}
      {/* npx shadcn-ui@latest add input */}
      <div className="px-4 lg:px-8">
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="rounded-lg border w-full p-4 px-3 md:px-6 grid grid-cols-12 gap-2">
              <FormField name="prompt" render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-10" >
                  <FormControl className="m-0 p-0">
                    <Input className="p-1 border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent" disabled={isLoading} placeholder="간단하게 React axios custom hook 만들어줄래?" {...field} />
                  </FormControl>
                </FormItem>)} />
              <Button className="col-span-12 lg:col-span-2">코딩 질문하기</Button>
            </form>
          </Form>
        </div>
        <div className="space-y-4 mt-4">
          {isLoading && (<div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted"> <Loader /> </div>)}
          {messages.length === 0 && !isLoading && (<Empty label="아직 대화가 없습니다. 대화를 시작하세요~" />)}
          <div className="flex flex-col-reverse gap-4">
            {messages.map((message, index) => (
              <div className={
                cn("whitespace-pre-wrap p-8 w-full flex items-start gap-x-8 rounded-lg text-wrap ", message.role === 'user' ? "bg-white border border-black/10" : "bg-muted")}
                key={index} >
                {message.role === 'user' ? <UserAvatar /> : null}
                <ReactMarkDown
                  components={{
                    pre: ({ node, ...props }) => <div className="overflow-auto text-wrap w-full my-2 px-3 rounded-lg bg-black/10" > <pre {...props}></pre>  </div>,
                    code: ({ node, ...props }) => <code className="rounded-lg bg-black/10" {...props}/>
                  }}
                  className="overflow-hidden w-full  text-sm leading-7"
                >
                  {'' + message?.content}
                </ReactMarkDown>
                {message.role === 'assistant' ? <BotAvatar /> : null}
              </div>))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CodePage;