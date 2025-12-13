import {z} from 'zod';

export const updatePatientProfileSchema = z.object({
    age: z.number().optional(),
    gender: z.string().optional(),
})