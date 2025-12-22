import {z} from "zod";

export const updateDocProfileSchema = z.object({
  specialization: z.string().min(2).optional(),
  qualification: z.string().min(2).optional(),
  experience: z.coerce.number().min(0).optional(),
  clinicAddress: z.string().min(5).optional(),
  slotDuration: z.coerce.number().min(5).optional(),
}).refine(
  (data) => Object.keys(data).length > 0,
  {message: "At least one filed is required to updated profile"}
)



export const createDoctorProfileSchema = z.object({
  specialization: z.string().min(2),
  qualification: z.string().min(2),
  experience: z.coerce.number().min(0),
  clinicAddress: z.string().min(5),
  slotDuration: z.coerce.number().min(5)
})