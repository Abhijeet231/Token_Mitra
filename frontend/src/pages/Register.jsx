import React from 'react'
import { registerUser } from '@/services/auth.service';
import { registerSchema } from '@/validations/register.schema';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from 'react-router-dom';




const Register = () => {

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: {errors, isSubmitting},
    
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async(data) => {
    try {
      const result = await registerUser(data);
      toast.success("User Registered Successfully");
      console.log("Registered USer:", result.data);
      
      navigate('/login');

    } catch (error) {
      toast.error("User Registration Error!")
      console.log("USer Registration Errro:", error)
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-linear-to-br from-emerald-50 via-green-50 to-lime-50 px-4 py-6'>
      <div className='w-full max-w-md'>
        <div className='text-center mb-8'>
          <h2 className='font-bold text-3xl text-gray-900 mb-2'>Create Account</h2>
          <p className='text-gray-600'>Join us today</p>
        </div>

        <div className='bg-white rounded-2xl shadow-lg border border-green-100 p-8'>
          <form className='space-y-4' onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor='fullName' className='block text-sm font-medium text-gray-700 mb-2'>Full Name</label>
              <input type="text" id='fullName' className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:ring-opacity-20 outline-none transition' 
              {...register("fullName")}
              />

              {errors.fullName && (
                <p className="text-red-500 text-sm mt-1.5">
                  {errors.fullName.message}
                </p>
              )}

            </div>

            <div>
              <label htmlFor="email" className='block text-sm font-medium text-gray-700 mb-2'>Email</label>
              <input type="email" id='email' className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:ring-opacity-20 outline-none transition' 
              {...register("email")}
              />

              {errors.email && (
                <p className="text-red-500 text-sm mt-1.5">
                  {errors.email.message}
                </p>
              )}

            </div>


            <div>
              <label htmlFor='password' className='block text-sm font-medium text-gray-700 mb-2'>Password</label>
              <input type="password" id='password' className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:ring-opacity-20 outline-none transition'
              {...register("password")}
              />

              {errors.password && (
                <p className="text-red-500 text-sm mt-1.5">
                  {errors.password.message}
                </p>
              )}

            </div>


            <div>
              <label htmlFor="role" className='block text-sm font-medium text-gray-700 mb-2'>Role</label>
              <select name="role" id="role"
              className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:ring-opacity-20 outline-none transition bg-white'
              {...register('role')}
              >
              

                
                <option value={"patient"}>Patient</option>
                <option value={"doctor"}>Doctor</option>
              </select>

              {errors.role && (
                <p className="text-red-500 text-sm mt-1.5">
                  {errors.role.message}
                </p>
              )}

            </div>



            <button type='submit'
            disabled={isSubmitting}
            className='w-full mt-6 px-6 py-3 text-center bg-linear-to-r from-green-600 to-emerald-600 text-white font-medium rounded-lg hover:from-green-700 hover:to-emerald-700 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg'>
              {isSubmitting ? "Loading...." : "Register"}
            </button>
          </form>

          <div className='mt-6 text-center'>
            <p className='text-gray-600 text-sm'>Already have an account? <Link to={'/login'} className='text-green-600 font-medium hover:text-green-700 hover:underline'>Login</Link></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register