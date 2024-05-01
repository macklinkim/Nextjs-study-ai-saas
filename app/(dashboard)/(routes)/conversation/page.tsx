"use client"
import * as z from "zod"
import { MessagesSquare } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Heading from "@/components/heading";
import { formSchema } from "./constants";
import {
  Form,
  FormControl,
  FormField,
  FormItem
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import clerkMiddleware from '../../../../middleware';
import { Button } from "@/components/ui/button";
const Conversation = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: ""
    }
  });

  const isLoading = form.formState.isSubmitting;
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log(data);
  }

  return (
    <div>
      <Heading
        title="Conversation"
        description="This is the conversation page"
        icon={MessagesSquare}
        iconColor="text-indigo-500"
        bgColor="bg-indigo-500/10" />
      {/* npx shadcn-ui@latest add form, shadcn ui써서 작성, useForm, zod 합쳐짐 개꿀 */}
      {/* npx shadcn-ui@latest add input */}
      <div className="px-4 lg:px-8">
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="rounded-lg border w-full p-4 px-3 md:px-6 grid grid-cols-12 gap-2">
              <FormField name="prompt" render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-10" >
                  <FormControl className="m-0 p-0">
                    <Input className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent" disabled={isLoading} placeholder="뭘 물어볼까?" {...field} />
                  </FormControl>
                </FormItem>)} />
                <Button className="col-span-12 lg:col-span-2">AI에 질문하기</Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Conversation;