"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Download, ImageIcon, MessagesSquare } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod"
import { amountOptions, formSchema, resolutionOptions } from './constants';
import axios from "axios";
import { cn } from "@/lib/utils";
import {
  Form,
  FormControl,
  FormField,
  FormItem
} from "@/components/ui/form";
import Heading from "@/components/heading";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectValue,
  SelectItem
} from "@/components/ui/select";
import Empty from "@/components/empty";
import Loader from "@/components/loader";
import { Card, CardFooter } from "@/components/ui/card";
import { useProModal } from "@/hooks/use-pro-modal";
import Image from "next/image";
const ImagePage = () => {
  const router = useRouter();
  const [images, setImages] = useState<string[]>([]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      amount: "1",
      resolution: "256x256",
    }
  });
  const proModal = useProModal();
  const isLoading = form.formState.isSubmitting;
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setImages([]);
      // console.log('[conversation page]', data);
      const response = await axios.post("/api/image", data);
      const URLS = response.data.map((image: { url: string }) => image.url);
      setImages(URLS);
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
  const downloadImage = (image: any) => { 
    console.log('[page/downloadImage]', image);
    var element = document.createElement("a");
    element.setAttribute("href", image);
    element.setAttribute("download", "image.png");
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };
  return (
    <div>
      <Heading
        title="AI로 그림 생성하기"
        description="AI를 이용한 그림 생성"
        icon={ImageIcon}
        iconColor="text-pink-500"
        bgColor="bg-pink-500/10" />
      {/* npx shadcn-ui@latest add form, shadcn ui써서 작성, useForm, zod 합쳐짐 개꿀 */}
      {/* npx shadcn-ui@latest add input  사용*/}
      {/* npx shadcn-ui@latest add select 사용 */}
      <div className="px-4 lg:px-8">
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="rounded-lg border w-full p-4 px-3 md:px-6 grid grid-cols-12 gap-2">
              <FormField name="prompt" render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-5" >
                  <FormControl className="m-0 p-0">
                    <Input className="p-1 border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent" disabled={isLoading} placeholder="만들고 싶은 그림의 설명을 적어보세요." {...field} />
                  </FormControl>
                </FormItem>)} />
              <FormField name="amount" control={form.control} render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-2" >
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}>
                    <FormControl className="m-0 p-0">
                      <SelectTrigger className="p-1 border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent">
                        <SelectValue defaultValue={field.value} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {amountOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )} />
              <FormField name="resolution" control={form.control} render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-2" >
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}>
                    <FormControl className="m-0 p-0">
                      <SelectTrigger className="p-1 border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent">
                        <SelectValue defaultValue={field.value} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {resolutionOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )} />
              <Button className="col-span-12 lg:col-span-3">AI제작 그림만들기</Button>
            </form>
          </Form>
        </div>
        <div className="space-y-4 mt-4">
          {isLoading && (<div className="p-20"> <Loader /> </div>)}
          {images.length === 0 && !isLoading && (<Empty src="/image-remv.png" label="아직 생성된 그림이 없습니다. 제작을 시작하세요~" />)}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 m-4">
            {images.map((image, index) => (
              <Card key={index} className="w-full h-full rounded-lg overflow-hidden">
                <div className=" relative aspect-square">
                  <Image alt="image" fill src={image} />
                </div>
                <CardFooter className="p-4">
                  <Button variant="secondary"
                    className="w-full"
                    onClick={() => downloadImage(image)}>
                    <Download className="mr-2 h-4 w-4" />다운로드
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}

export default ImagePage;