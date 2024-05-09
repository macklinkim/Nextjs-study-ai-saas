"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Music } from "lucide-react";
import { useForm } from "react-hook-form";
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
import Heading from "@/components/heading";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Empty from "@/components/empty";
import Loader from "@/components/loader";
import { useProModal } from "@/hooks/use-pro-modal";
const MusicPage = () => {
  const router = useRouter();
  const [music, setMusic] = useState<string>();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: ""
    }
  });
  const proModal = useProModal();
  const isLoading = form.formState.isSubmitting;
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setMusic(undefined);

      const response = await axios.post("/api/music", data);
      console.log('[conversation page]', music);
      setMusic(response.data.audio);
      form.reset();
    } catch (error: any) {
      console.log('[conversation page]', error);
      if(error?.response?.status === 403){
        proModal.onOpen();
      }
    } finally {
      router.refresh();
    }
    console.log(data);
  }

  return (
    <div>
      <Heading
        title="AI에 작곡을 부탁하기"
        description="replicate로 음악을 생성해보세요."
        icon={Music}
        iconColor="text-sky-500"
        bgColor="bg-sky-500/10" />
      {/* npx shadcn-ui@latest add form, shadcn ui써서 작성, useForm, zod 합쳐짐 개꿀 */}
      {/* npx shadcn-ui@latest add input */}
      <div className="px-4 lg:px-8">
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="rounded-lg border w-full p-4 px-3 md:px-6 grid grid-cols-12 gap-2">
              <FormField name="prompt" render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-10" >
                  <FormControl className="m-0 p-0">
                    <Input className="p-1 border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent" disabled={isLoading} placeholder="AI야 피아노 솔로곡 만들어줘" {...field} />
                  </FormControl>
                </FormItem>)} />
              <Button className="col-span-12 lg:col-span-2">AI에 질문하기</Button>
            </form>
          </Form>
        </div>
        <div className="space-y-4 mt-4">
          {isLoading && (<div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted"> <Loader text="음악을 만드는 중입니다."/> </div>)}
          {!music && !isLoading && (<Empty src="/music-removebg.png" label="아직 만들어진 곡이 없습니다." />)}
          {music && (
            <audio controls className="w-full mt-6">
              <source src={music}/>
            </audio>
          )}
        </div>
      </div>
    </div>
  );
}

export default MusicPage;