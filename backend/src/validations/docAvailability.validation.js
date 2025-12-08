import { z } from "zod";

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
