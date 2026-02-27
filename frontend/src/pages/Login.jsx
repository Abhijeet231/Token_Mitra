import { loginSchema } from "@/validations/login.schema";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Mail, Lock, LogIn } from "lucide-react";

const Login = () => {

  const navigate = useNavigate();
  const {login} = useAuth()

  const {
    register,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      const result = await login(data);
      toast.success("User Logged In")
      console.log("Logged In USer:", result.data)

      result.data.data.role === 'patient'? navigate('/patient') : navigate("/doctors/profile")

    } catch (error) {
      toast.error("Error while Logging in User!")
      console.log("Login Error:", error)
    }
  }

   return (
    <div className='min-h-screen flex items-center justify-center px-4 py-12 '>
      <div className='w-full max-w-md'>
        <div className='text-center mb-8'>
          <h2 className='font-bold text-4xl bg-linear-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-3'>Welcome Back</h2>
          <p className='text-gray-600 text-lg'>Sign in to your account</p>
        </div>

        <div className='bg-white rounded-2xl shadow-xl border-2 border-amber-200 p-8 hover:shadow-2xl transition-all duration-300'>
          <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
            
            <div>
              <label htmlFor="email" className=' text-sm font-semibold text-gray-800 mb-2 flex items-center gap-2'>
                <Mail size={16} className="text-amber-600" />
                Email
              </label>
              <input 
                type="email" 
                id="email"
                className='w-full px-4 py-3 rounded-xl border-2 border-amber-200 bg-amber-50/30 focus:border-amber-500   outline-none transition-all shadow-sm hover:shadow-md'
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
              <label htmlFor="password" className=' text-sm font-semibold text-gray-800 mb-2 flex items-center gap-2'>
                <Lock size={16} className="text-amber-600" />
                Password
              </label>
              <input 
                type="password" 
                id="password"
                className='w-full px-4 py-3 rounded-xl border-2 border-amber-200 bg-amber-50/30 focus:border-amber-500  outline-none transition-all shadow-sm hover:shadow-md'
                placeholder="Enter your password"
                {...register('password')}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1.5 flex items-center gap-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button 
              type='submit'
              disabled={isSubmitting}
              className='w-full mt-6 px-6 py-3.5 flex items-center justify-center gap-2 text-center bg-linear-to-r from-amber-500 to-orange-500 text-white font-semibold text-base rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] border-2 border-amber-400'>
              {isSubmitting ? (
                "Signing in..."
              ) : (
                <>
                  <LogIn size={20} />
                  Sign In
                </>
              )}
            </button>
          </form>

          <div className='mt-6 text-center pt-6 border-t border-amber-200'>
            <p className='text-gray-600 text-sm'>Don't have an account? <Link to={'/register'} className='text-amber-600 font-semibold hover:text-amber-700 hover:underline transition-colors'>Register</Link></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login