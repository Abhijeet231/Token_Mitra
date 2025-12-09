import { z } from "zod";
// Creating availability
export const addAvailabilitySchema = z.object({
  date: z.string().min(1, "Date is required"),
  startTime: z.string().min(1, "Start time is required"),
  endTime: z.string().min(1, "End time is required"),
  maxPatients: z.number().int().nonnegative().optional(),
}).refine(
    (data) => {
        const start = new Date(`2000-01-01 ${data.startTime}`);
        const end = new Date(`2000-01-01 ${data.endTime}`);
        return start < end;
    },
    {
        message: "End time must be after start timi",
        path: ["endTime"],
    }
);

// Updating availability
export const updateAvailabilitySchema = z.object({
  date: z.string().min(1, "Date is required").optional(),
  startTime: z.string().min(1, "Start time is required").optional(),
  endTime: z.string().min(1, "End time is required").optional(),
  maxPatients: z.number().int().nonnegative().optional(),
}).refine(
    (data) => {
        if(data.startTime && data.endTime){
            const start = new Date(`2000-01-01 ${data.startTime}`);
            const end = new Date(`2000-01-01 ${data.endTime}`);
            return start < end;
        }
        return true;
    },
    {
        message: "End time must be after start time",
        path: ["endTime"],
    }
);