import { useForm } from "react-hook-form";
import { createDoctorProfile } from "@/validations/createDoctorProfile";
import { createDocProfile } from "@/services/doctor.service";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";

const CreateDoctorProfile = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(createDoctorProfile) });

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      formData.append("specialization", data.specialization);
    formData.append("qualification", data.qualification);
    formData.append("experience", data.experience);
    formData.append("clinicAddress", data.clinicAddress);
    formData.append("slotDuration", data.slotDuration);

    // Extracting File 
    if(data.profileImage && data.profileImage.length > 0) {
      formData.append("profileImage", data.profileImage[0]);
    }

    await createDocProfile(formData);

      toast.success("Doctor Profile Created Successfully");
      navigate("/doctors/profile");
    } catch (error) {
      toast.error("Error while creating Doctors Profile");
      console.log("Doc Profile Creation Error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-amber-50 via-orange-50 to-amber-50 flex items-center justify-center px-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg border border-stone-100 p-8">
        <h2 className="text-2xl font-semibold text-stone-800 mb-6">
          Create Your Porfile
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Specialization*/}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="specialization"
              className="text-sm font-medium text-stone-700"
            >
              Specialization
            </label>
            <input
              type="text"
              id="specialization"
              className="rounded-lg border border-stone-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              {...register("specialization")}
            />
            {errors.specialization && (
              <p className="text-xs text-red-500 mt-1.5">
                {errors.specialization.message}
              </p>
            )}
          </div>

          {/* Qualification */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="qualification"
              className="text-sm font-medium text-stone-700"
            >
              Qualification
            </label>
            <input
              type="text"
              className="rounded-lg border border-stone-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              {...register("qualification")}
            />
            {errors.experience && (
              <p className="text-xs text-red-500 mt-1.5">
                {" "}
                {errors.experience.message}
              </p>
            )}
          </div>

          {/* Experience */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="experience"
              className="text-sm font-medium text-stone-700"
            >
              Experience
            </label>
            <input
              type="number"
              className="rounded-lg border border-stone-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:bg-amber-50"
              {...register("experience")}
            />
            {errors.experience && (
              <p className="text-xs text-red-500 mt-1.5">
                {errors.experience.message}
              </p>
            )}
          </div>

          {/* Profile IMage */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="profileImage"
              className="text-sm font-medium text-stone-700"
            >
              ProfileImage
            </label>
            <input
              type='file'
              className="rounded-lg border border-stone-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:bg-amber-50"
              {...register("profileImage")}
            />
            {errors.profileImage && (
              <p className="text-xs text-red-500 mt-1.5">
                {errors.profileImage.message}
              </p>
            )}
          </div>

          {/* Slot Duration */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-stone-700">
              Slot Duration (minutes)
            </label>
            <input
              type="number"
              className="rounded-lg border border-stone-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              {...register("slotDuration")}
            />
            {errors.slotDuration && (
              <p className="text-xs text-red-500 mt-1.5">
                {errors.slotDuration.message}
              </p>
            )}
          </div>

          {/* Clinic Address */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-stone-700">
              Clinic Address
            </label>
            <input
              type="text"
              className="rounded-lg border border-stone-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              {...register("clinicAddress")}
            />
            {errors.clinicAddress && (
              <p className="text-xs text-red-500 mt-1.5">
                {errors.clinicAddress.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-xl bg-amber-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-amber-700 disabled:opacity-60"
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateDoctorProfile;
