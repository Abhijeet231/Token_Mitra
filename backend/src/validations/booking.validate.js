import { z } from "zod";

export const createBookingSchema = z.object({
  availabilityId: z
    .string()
    .min(1, "Availability ID is required"),

  issue: z
    .string()
    .min(3, "Issue description must be at least 3 characters")
    .max(200, "Issue description must be under 200 characters")
    
});
