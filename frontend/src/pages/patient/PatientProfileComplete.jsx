import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { updatePatientDetails } from "@/services/patient.service";

const PatientProfileComplete = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await updatePatientDetails(data);
      toast.success("Profile completed successfully");
      navigate("/patient", { replace: true });
    } catch (error) {
      toast.error("Error while updating profile");
      console.error("Profile Update Error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-green-50 via-emerald-50 to-lime-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-green-100 p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">
          Complete Your Profile
        </h2>
        <p className="text-gray-600 text-sm text-center mb-6">
          Please complete your profile to continue booking appointments
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Age */}
          <div>
            <label
              htmlFor="age"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Age
            </label>
            <input
              type="number"
              id="age"
              className="w-full px-4 py-3 rounded-lg border border-gray-300
                         focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500
                         focus:ring-opacity-20 outline-none transition"
              {...register("age", {
                required: "Age is required",
                min: {
                  value: 1,
                  message: "Age must be greater than 0",
                },
              })}
            />
            {errors.age && (
              <p className="text-red-500 text-sm mt-1">
                {errors.age.message}
              </p>
            )}
          </div>

          {/* Gender */}
          <div>
            <label
              htmlFor="gender"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Gender
            </label>
            <select
              id="gender"
              className="w-full px-4 py-3 rounded-lg border border-gray-300
                         focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500
                         focus:ring-opacity-20 outline-none transition bg-white"
              {...register("gender", {
                required: "Gender is required",
              })}
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && (
              <p className="text-red-500 text-sm mt-1">
                {errors.gender.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-6 px-6 py-3 rounded-lg text-white font-semibold
                       bg-linear-to-r from-green-600 to-emerald-600
                       hover:from-green-700 hover:to-emerald-700
                       transition disabled:opacity-50 disabled:cursor-not-allowed
                       shadow-md hover:shadow-lg"
          >
            {isSubmitting ? "Saving..." : "Save & Continue"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PatientProfileComplete;
