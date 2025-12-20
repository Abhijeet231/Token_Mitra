import { z } from "zod";

export const editDoctorProfileSchema = z.object({
  specialization: z
    .string()
    .trim()
    .min(2, "Specialization must be at least 2 characters")
    .optional(),

  qualification: z
    .string()
    .trim()
    .min(2, "Qualification must be at least 2 characters")
    .optional(),

  experience: z.coerce
    .number()
    .min(0, "Experience cannot be negative")

    .optional(),

  clinicAddress: z
    .string()
    .trim()
    .min(5, "Clinic address must be at least 5 characters")
    .optional(),

  slotDuration: z.coerce
    .number()
    .min(5, "Slot duration must be at least 5 minutes")

    .optional(),

  profileImage: z.any().optional(),
});
