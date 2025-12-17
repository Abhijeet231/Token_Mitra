import { loginSchema } from "@/validations/login.schema";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";



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

     navigate('/patient')

    } catch (error) {
      toast.error("Error while Logging in User!")
      console.log("Login Error:", error)
    }
  }


   return (
    <div className='min-h-screen flex items-center justify-center bg-linear-to-br from-green-50 via-emerald-50 to-lime-50 px-4 py-12'>
      <div className='w-full max-w-md'>
        <div className='text-center mb-8'>
          <h2 className='font-bold text-3xl text-gray-900 mb-2'>Welcome Back</h2>
          <p className='text-gray-600'>Sign in to your account</p>
        </div>

        <div className='bg-white rounded-2xl shadow-lg border border-green-100 p-8'>
          <form className='space-y-5' onSubmit={handleSubmit(onSubmit)}>
            
            <div>
              <label htmlFor="email" className='block text-sm font-medium text-gray-700 mb-2'>Email</label>
              <input 
                type="email" 
                id="email"
                className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:ring-opacity-20 outline-none transition'
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1.5">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="password" className='block text-sm font-medium text-gray-700 mb-2'>Password</label>
              <input 
                type="password" 
                id="password"
                className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:ring-opacity-20 outline-none transition'
                {...register('password')}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1.5">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button 
              type='submit'
              disabled={isSubmitting}
              className='w-full mt-6 px-6 py-3 text-center bg-linear-to-r from-emerald-600 to-green-600 text-white font-medium rounded-lg hover:from-emerald-700 hover:to-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg'>
              {isSubmitting ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className='mt-6 text-center'>
            <p className='text-gray-600 text-sm'>Don't have an account? <Link to={'/register'} className='text-green-600 font-medium hover:text-green-700 hover:underline'>Register</Link></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login