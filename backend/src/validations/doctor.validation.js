import {z} from "zod";

const optionalNumber = z.preprocess(
  (val) => (val === "" ? undefined : Number(val)),
  z.number().min(0)
);

export const updateDocProfileSchema = z.object({
  specialization: z.string().min(2).optional(),
  qualification: z.string().min(2).optional(),
  experience: optionalNumber.optional(),
  clinicAddress: z.string().min(5).optional(),
  slotDuration: z.preprocess(
    (val) => (val === "" ? undefined : Number(val)),
    z.number().min(5)
  ).optional(),
});
