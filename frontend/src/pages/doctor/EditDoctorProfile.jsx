import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { updateDoctorProfile } from '@/services/doctor.service'
import { editDoctorProfileSchema,  } from '@/validations/editDoctor.schema'
import { zodResolver } from '@hookform/resolvers/zod'


const EditDoctorProfile = () => {
  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm(
    {
      resolver: zodResolver(editDoctorProfileSchema)
    }
  );

  const onSubmit = async(data) => {
    try {
        await updateDoctorProfile(data);
        toast.success("Profile Updated Successfully!");
        navigate("/doctors/profile")
    } catch (error) {
        toast.error("Error while updating Profile")
        console.log("DOc Profile Update Error:", error);
    }
  }
  
return (
  <div className="min-h-screen bg-linear-to-br from-amber-50 via-orange-50 to-amber-50 flex items-center justify-center px-4">
    <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg border border-stone-100 p-8">
      
      <h2 className="text-2xl font-semibold text-stone-800 mb-6">
        Edit Doctor Profile
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        
        {/* Specialization */}
        <div className="flex flex-col gap-1">
          <label htmlFor="specialization" className="text-sm font-medium text-stone-700">
            Specialization
          </label>
          <input
            type="text"
            id="specialization"
            className="rounded-lg border border-stone-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
            {...register("specialization")}
          />
          {errors.specialization && (
            <p className="text-xs text-red-500">{errors.specialization.message}</p>
          )}
        </div>

        {/* Qualification */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-stone-700">
            Qualification
          </label>
          <input
            type="text"
            className="rounded-lg border border-stone-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
            {...register("qualification")}
          />
          {errors.qualification && (
            <p className='text-xs text-red-500 mt-1.5'>
                     {errors.qualification.message}
            </p>
          ) }
        </div>

        {/* Experience */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-stone-700">
            Experience (Years)
          </label>
          <input
            type="number"
            className="rounded-lg border border-stone-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
            {...register("experience")}
          />
          {errors.experience && (
            <p className='text-xs text-red-500 mt-1.5'>
                     {errors.experience.message}
            </p>
          ) }
        </div>

        {/* Profile Image */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-stone-700">
            Profile Image
          </label>
          <input
            type="file"
            className="text-sm file:mr-4 file:rounded-md file:border-0 file:bg-amber-100 file:px-4 file:py-2 file:text-sm file:font-medium file:text-amber-700 hover:file:bg-amber-200"
            {...register("profileImage")}
          />
          {errors.profileImage && (
            <p className='text-xs text-red-500 mt-1.5'>
                     {errors.profileImage.message}
            </p>
          ) }
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
            <p className='text-xs text-red-500 mt-1.5'>
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
            <p className='text-xs text-red-500 mt-1.5'>
                     {errors.clinicAddress.message}
            </p>
          ) }
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
)
}

export default EditDoctorProfile
