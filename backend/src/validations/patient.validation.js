import {z} from 'zod';

export const updatePatientProfileSchema = z.object({
      age: z.coerce.number().min(1, "Age must be greater than 0"),
     gender: z.enum(["male", "female", "other"]),
})