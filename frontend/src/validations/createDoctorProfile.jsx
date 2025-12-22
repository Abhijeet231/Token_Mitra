import {z} from "zod";

export const createDoctorProfile = z.object({
    specialization: z.string().trim().min(2, "specialization must be at least 2 character"),
    qualification: z.string().trim().min(2, "Qalification is required"),
    experience: z.coerce.number().min(0, "Experience can not be negative"),
    clinicAddress: z.string().trim().min(5, "Clinic address is required"),
    slotDuration: z.coerce.number().min(5, "Slot Duration must be at least 5 minutes"),
    profileImage: z.instanceof(FileList).optional()

})