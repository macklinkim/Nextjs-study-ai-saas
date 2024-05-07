import * as z from "zod";

export const formSchema = z.object({
  prompt: z.string().min(1, { message: "영상을 넣어야합니다." }),
})