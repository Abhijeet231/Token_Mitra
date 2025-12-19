import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { updateDoctorProfile } from '@/services/doctor.service'

const EditDoctorProfile = () => {
  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm();

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
    <div>
           <h2>Complete Your Profile</h2>
           <form onSubmit={handleSubmit(onSubmit)}>
             <div>
                <label htmlFor="specialization">specialization</label>
                <input type="text"
                 id='specialization'
                 {...register("specialization", {
                    required: "specialization is required"
                 })}
                />
             </div>

             <div>
                   <input type="text"
                   {...register("qualification")}
                   />
             </div>

             <div>
                <input type="number"
                {...register("experience")}
                />
             </div>

             <div>
                <input type="file"
                {...register("profileImage")}
                />
             </div>

             <div>
                <input type="text"
                {...register("slotDuration")}
                />
             </div>

             <div>
                <input type="text"
                {...register("clinicAddress")}
                />
             </div>
           </form>
    </div>
  )
}

export default EditDoctorProfile