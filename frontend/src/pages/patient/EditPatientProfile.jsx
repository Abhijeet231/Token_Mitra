import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { updatePatientProfile, getPatientDetails } from "@/services/patient.service";
import { useState, useEffect } from "react";


const EditPatientProfile = () => {

    const navigate = useNavigate();
    const [patient, setPatient] = useState(null);

    // Fetching Patient details
    useEffect(() => {
        const getPaitent = async() => {
            try {
                let res = await getPatientDetails();
                setPatient(res.data.data);

            } catch (error) {
              toast("Error WHile Fetching Patient Account Details!");
              console.log("Error while fetching Patient Account Detail:", error)                
            }
        }
        getPaitent();
    },[]);

    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting},
        reset
    } = useForm();

    // On Submit 
    const onSubmit = async(data) => {
        try {
            await updatePatientProfile(data); // change this 
            toast.success("Changes Saved!");
            navigate("/patient/profile", {replace: true});
        } catch (error) {
            toast.error("Error while updating profile");
            console.log("Error While Editing Patient Profile")
        }
    }
 
    // Old Patient data 
    useEffect(() => {
        if(patient) {
            reset({
                age: patient.age || "",
                gender: patient.gender || "",
            });
        }
    }, [patient, reset])

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-2">
        <div className="w-full max-w-md mb-4 ">

            <div className="text-center mb-6">
        <h2 className="font-bold text-4xl bg-linear-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-2">Edit Your Profile Details</h2>
        <p className="text-gray-600 text-lg">Hellow User</p>
            </div>
                
         <div className="bg-white rounded-2xl shadow-xl border-2 border-amber-200 p-8 hover:shadow-2xl transition-all duration-300">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Age*/}
            <div>
                <label htmlFor="age"
                   className="text-sm font-semibold text-gray-800 mb-2 flex items-center gap-2"
                >Age</label>

                <input type="number"
                id="age"
                className="w-full px-4 py-3 rounded-xl border-2 border-amber-200 bg-amber-50/30 focus:border-amber-500 outline-none transition-all shadow-sm hover:shadow-md"
                {...register("age")}
                />

               {errors.age && (
                <p className="text-red-500 text-sm mt-1.5 flex items-center gap-1">
                    {errors.age.message}
                </p>
               )}
            </div>

            {/* Gender*/}
            <div>
                <label htmlFor="gender"
                      className="text-sm font-semibold text-gray-800 mb-2 flex items-center gap-2"
                >Gender</label>

               <select id="gender"
               className="w-full px-4 py-3 rounded-xl border-2 border-amber-300 bg-amber-50/30 focus:border-amber-500 outline-none transition-all shadow-sm hover:shadow-md"
                 {...register("gender")}
               >

                <option value= "">Select gender</option>
                <option value= "male">Male</option>
                <option value= "female">Female</option>
                <option value= "other">Other</option>

               </select>

               {errors.gender && (
                <p className="text-red-500 text-sm mt-1.5 flex items-center gap-1">
                    {errors.gender.message}
                </p>
               )}
            </div>

            <button type="submit"
               className="w-full mt-6 px-6 py-4 flex items-center justify-center gap-2 text-center bg-linear-to-r from-amber-500 to-orange-500 text-white font-semibold text-base rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scael-[1.02] active:scale-[0.98] border-2 border-amber-400"
                 disabled={isSubmitting}
            >
               {isSubmitting ? "Saving...": "Save Changes"}
            </button>

        </form>

        </div>

</div>
    </div>
  )
}

export default EditPatientProfile