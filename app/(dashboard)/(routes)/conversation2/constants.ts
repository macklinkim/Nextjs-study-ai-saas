import * as z from "zod";

export const formSchema = z.object({
  prompt: z.string().min(1, { message: "내용을 넣어야합니다." }),
})