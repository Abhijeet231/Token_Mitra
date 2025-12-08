import {z} from "zod";

export const updateDocProfileSchema = z.object({
     specialization: z.string().min(2," specialization is required."),
     qualification: z.string().min(2,"qualification is required!"),
     experience: z.number().min(0, "Experience must be at least 0-1 years"),
     clinicAddress: z.string().min(5, "Clinic clinicAddress is required!"),
     slotDuration: z.number().min(5, "Slot duration must be at least 5/10 minutes.")
})