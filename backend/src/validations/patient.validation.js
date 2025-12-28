import {z} from 'zod';

// Create Patient Profile
export const createPatientProfileSchema = z.object({
      age: z.coerce.number().int().min(1, "Age must be greater than 0"),
     gender: z.enum(["male", "female", "other"]),
}).strict();

// Update Patient Profile
export const updatePatientProfileSchema = z.object({
      age: z.coerce.number().int().min(1, "Age must be greater than 0").optional(),
      gender: z.enum(["male", "female", "other"]).optional(),
}).strict();