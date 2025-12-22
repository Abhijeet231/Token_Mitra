import { z } from "zod";

export const editDoctorProfileSchema = z.object({
  specialization: z.string().trim().min(2).optional(),

  qualification: z.string().trim().min(2).optional(),

  experience: z.coerce
    .number()
    .optional(),

  clinicAddress: z.string().trim().min(5).optional(),

  slotDuration: z.coerce
    .number()
    .optional(),

  profileImage: z.instanceof(FileList).optional(),
});

