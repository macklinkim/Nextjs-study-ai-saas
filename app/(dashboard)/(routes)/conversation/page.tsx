"use client"
import Heading from "@/components/heading";
import { MessagesSquare } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod"

const Conversation = () => {
  const form = useForm({
    defaultValues: {
      prompt: ""
    }
  });

  return (
    <div>
      <Heading
        title="Conversation"
        description="This is the conversation page"
        icon={MessagesSquare}
        iconColor="text-indigo-500"
        bgColor="bg-indigo-500/10" />
      {/* npx shadcn-ui@latest add form, shadcn ui써서 작성, useForm, zod 합쳐짐 개꿀 */}
      <div className="px-4 lg:px-8">

      </div>
    </div>
  );
}

export default Conversation;