import {z} from "zod";

export const updateDocProfileSchema = z.object({
  specialization: z.string().min(2).optional(),
  qualification: z.string().min(2).optional(),
  experience: z.coerce.number().min(0).optional(),
  clinicAddress: z.string().min(5).optional(),
  slotDuration: z.coerce.number().min(5).optional(),
});
