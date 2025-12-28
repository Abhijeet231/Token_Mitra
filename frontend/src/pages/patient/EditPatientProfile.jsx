import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { updatePatientProfile } from "@/services/patient.service";


const EditPatientProfile = () => {

    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting}
    } = useForm();

    const onSubmit = async(data) => {
        try {
            await updatePatientDetails(data); // change this 
            toast.success("Changes Saved!");
            navigate("/patient/profile", {replace: true});
        } catch (error) {
            toast.error("Error while updating profile");
            console.log("Error While Editing Patient Profile")
        }
    }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-2 border border-amber-300 shadow-lg hover:shadow-xl ">
        <div className="w-full max-w-md ">
        <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">Edit Your Profile</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Age*/}
            <div>
                <label htmlFor="age">Age</label>

                <input type="number"
                id="age"
                className="border border-black"
                {...register("age")}
                />

               {errors.age && (
                <p className="text-red-500 text-sm mt-1">
                    {errors.age.message}
                </p>
               )}
            </div>

            {/* Gender*/}
            <div>
                <label htmlFor="gender">Gender</label>

               <select id="gender"
                 {...register("gender")}
               >

                <option value= "">Select gender</option>
                <option value= "male">Male</option>
                <option value= "female">Female</option>
                <option value= "other">Other</option>

               </select>

               {errors.gender && (
                <p>
                    {errors.gender.message}
                </p>
               )}
            </div>

            <button type="submit"
                 disabled={isSubmitting}
            >
               {isSubmitting ? "Saving...": "Save Changes"}
            </button>

        </form>

</div>
    </div>
  )
}

export default EditPatientProfile