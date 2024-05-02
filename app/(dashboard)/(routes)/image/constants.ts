import * as z from "zod";

export const formSchema = z.object({
  prompt: z.string().min(1, { message: "이미지 관련 내용을 넣어야합니다." }),
  amount: z.string().min(1),
  resolution: z.string().min(1),
})

export const amountOptions = [
  { value: "1", label: "1 photo" },
  { value: "2", label: "2 photos" },
  { value: "3", label: "3 photos" },
  { value: "4", label: "4 photos" },
  { value: "5", label: "5 photos" },
]