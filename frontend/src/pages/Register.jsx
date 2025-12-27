import React from 'react'
import { registerUser } from '@/services/auth.service';
import { registerSchema } from '@/validations/register.schema';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from 'react-router-dom';
import { User, Mail, Lock, UserPlus, Briefcase } from "lucide-react";

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
    <div className='min-h-screen flex items-center justify-center  px-4 py-12'>
      <div className='w-full max-w-md'>
        <div className='text-center mb-8'>
          <h2 className='font-bold text-4xl bg-linear-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-3'>Create Account</h2>
          <p className='text-gray-600 text-lg'>Join us today</p>
        </div>

        <div className='bg-white rounded-2xl shadow-xl border-2 border-amber-200 p-8 hover:shadow-2xl transition-all duration-300'>
          <form className='space-y-5' onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor='fullName' className='text-sm font-semibold text-gray-800 mb-2 flex items-center gap-2'>
                <User size={16} className="text-amber-600" />
                Full Name
              </label>
              <input type="text" id='fullName' className='w-full px-4 py-3 rounded-xl border-2 border-amber-200 bg-amber-50/30 focus:border-amber-500 outline-none transition-all shadow-sm hover:shadow-md' 
              placeholder="Enter your full name"
              {...register("fullName")}
              />

              {errors.fullName && (
                <p className="text-red-500 text-sm mt-1.5 flex items-center gap-1">
                  {errors.fullName.message}
                </p>
              )}

            </div>

            <div>
              <label htmlFor="email" className='text-sm font-semibold text-gray-800 mb-2 flex items-center gap-2'>
                <Mail size={16} className="text-amber-600" />
                Email
              </label>
              <input type="email" id='email' className='w-full px-4 py-3 rounded-xl border-2 border-amber-200 bg-amber-50/30 focus:border-amber-500 outline-none transition-all shadow-sm hover:shadow-md' 
              placeholder="Enter your email"
              {...register("email")}
              />

              {errors.email && (
                <p className="text-red-500 text-sm mt-1.5 flex items-center gap-1">
                  {errors.email.message}
                </p>
              )}

            </div>


            <div>
              <label htmlFor='password' className='text-sm font-semibold text-gray-800 mb-2 flex items-center gap-2'>
                <Lock size={16} className="text-amber-600" />
                Password
              </label>
              <input type="password" id='password' className='w-full px-4 py-3 rounded-xl border-2 border-amber-200 bg-amber-50/30 focus:border-amber-500 outline-none transition-all shadow-sm hover:shadow-md'
              placeholder="Enter your password"
              {...register("password")}
              />

              {errors.password && (
                <p className="text-red-500 text-sm mt-1.5 flex items-center gap-1">
                  {errors.password.message}
                </p>
              )}

            </div>


            <div>
              <label htmlFor="role" className=' text-sm font-semibold text-gray-800 mb-2 flex items-center gap-2'>
                <Briefcase size={16} className="text-amber-600" />
                Role
              </label>
              <select name="role" id="role"
              className='w-full px-4 py-3 rounded-xl border-2 border-amber-200 bg-amber-50/30 focus:border-amber-500 outline-none transition-all shadow-sm hover:shadow-md'
              {...register('role')}
              >
              

                
                <option value={"patient"}>Patient</option>
                <option value={"doctor"}>Doctor</option>
              </select>

              {errors.role && (
                <p className="text-red-500 text-sm mt-1.5 flex items-center gap-1">
                  {errors.role.message}
                </p>
              )}

            </div>



            <button type='submit'
            disabled={isSubmitting}
            className='w-full mt-6 px-6 py-3.5 flex items-center justify-center gap-2 text-center bg-linear-to-r from-amber-500 to-orange-500 text-white font-semibold text-base rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] border-2 border-amber-400'>
              {isSubmitting ? (
                "Loading...."
              ) : (
                <>
                  <UserPlus size={20} />
                  Register
                </>
              )}
            </button>
          </form>

          <div className='mt-6 text-center pt-6 border-t border-amber-200'>
            <p className='text-gray-600 text-sm'>Already have an account? <Link to={'/login'} className='text-amber-600 font-semibold hover:text-amber-700 hover:underline transition-colors'>Login</Link></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register