import {z} from "zod";

export const registerSchema = z.object({
   fullName: z.string().min(3, "Full name must be at least 3 characters long"),
   email: z.email("Invalid email address zzz"),
   password: z.string().min(6, "password must be at least 6 characters long"),
   role: z.enum(['patient', 'doctor']).default('patient'),

})


export const loginSchema = z.object({
      email: z.email("Email address required!"),
      password: z.string().min(6, "Enter Valid password!")
})