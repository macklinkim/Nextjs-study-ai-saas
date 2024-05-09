"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Music, Video } from "lucide-react";
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
const VideoPage = () => {
  const router = useRouter();
  const [video, setVideo] = useState<string>();
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
      setVideo(undefined);

      const response = await axios.post("/api/video", data);
      console.log('[video page]', response.data[0]);
      setVideo(response.data[0]);
      form.reset();
    } catch (error: any) {
      console.log('[video page]', error);
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
        title="AI로 영상제작하기"
        description="zero-scope로 영상을 생성해보세요."
        icon={Video}
        iconColor="text-green-500"
        bgColor="bg-green-500/10" />
      {/* npx shadcn-ui@latest add form, shadcn ui써서 작성, useForm, zod 합쳐짐 개꿀 */}
      {/* npx shadcn-ui@latest add input */}
      <div className="px-4 lg:px-8">
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="rounded-lg border w-full p-4 px-3 md:px-6 grid grid-cols-12 gap-2">
              <FormField name="prompt" render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-10" >
                  <FormControl className="m-0 p-0">
                    <Input className="p-1 border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent" disabled={isLoading} placeholder="한국여행 영상 만들어줘" {...field} />
                  </FormControl>
                </FormItem>)} />
              <Button className="col-span-12 lg:col-span-2">AI에 질문하기</Button>
            </form>
          </Form>
        </div>
        <div className="space-y-4 mt-4">
          {isLoading && (<div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted"> <Loader text="영상을 만드는 중입니다. 2~3분 소요되니 페이지를 벗어나지마세요."/> </div>)}
          {!video && !isLoading && (<Empty src="/video-removebg.png" label="아직 만들어진 영상이 없습니다." />)}
          {video && (
            <video controls className="w-full aspect-video mt-6 rounded-lg border bg-black">
              <source src={video}/>
            </video>
          )}
        </div>
      </div>
    </div>
  );
}

export default VideoPage;