import {z} from "zod";

export const addAvailabilitySchema = z.object({
    date: z.string().min(1,"Date is required"),
    startTime: z.string().min(1),
    endTime: z.string().min(1),
    maxPatients: z.coerce.number().int().positive().optional(),
})