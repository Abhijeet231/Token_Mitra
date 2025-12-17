import {z} from "zod"


export const loginSchema = z.object({
      email: z.email("Email address required!"),
      password: z.string().min(6, "Enter Valid password!")
})