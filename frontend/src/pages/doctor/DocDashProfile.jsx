import React from 'react'
import { useEffect, useState } from 'react'
import { getLoggedInDoctor } from '@/services/doctor.service'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import { UserCircle } from 'lucide-react'

const DocDashProfile = () => {
  const navigate = useNavigate()

  const [doctor, setDoctor] = useState(null)
  const [loading, SetLoading] = useState(true)

  useEffect(() => {
    const fetchDocData = async () => {
      try {
        const res = await getLoggedInDoctor()
        setDoctor(res?.data?.data)
      } catch (error) {
        toast.error('Error while Fetching Doctor Details')
        console.log('Doc Detail fetching error:', error)
      } finally {
        SetLoading(false)
      }
    }

    fetchDocData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-50 flex items-center justify-center text-amber-700 font-medium">
        Loading profile...
      </div>
    )
  }

  return (
    <div className="w-full max-w-full rounded-xl border-2 border-amber-200  p-4 sm:p-5 lg:p-6 shadow-lg overflow-hidden">
        
      {/* Profile Info */}
      <div className="flex flex-col items-center gap-3 mb-4 sm:mb-6">
        <img
          src={doctor?.profileImage?.url}
          alt="Doctor Profile"
          className="h-20 w-20 lg:h-24 lg:w-24 rounded-full object-cover border-4 border-amber-200 shadow-md shrink-0"
        />

        <div className="flex flex-col text-center w-full">
          <h2
            onClick={() => navigate("/doctors/profile")}
            className="flex items-center justify-center gap-2 cursor-pointer
             text-lg lg:text-xl font-bold text-stone-900 mb-1 sm:mb-2
             hover:text-amber-600 transition-colors"
          >
            <UserCircle className="w-5 h-5 lg:w-6 lg:h-6 text-amber-600 shrink-0" />
            <span className="truncate">{doctor?.userId?.fullName}</span>
          </h2>

          <p className="text-sm lg:text-base text-amber-700 font-semibold mb-1 truncate px-2">
            {doctor?.specialization}
          </p>

          <p className="text-xs sm:text-sm text-stone-600 truncate px-2">
            {doctor?.userId?.email}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-2 sm:gap-3 pt-3 sm:pt-4 border-t border-amber-200">
   <Link
  to="/doctor/profile/edit"
  className="w-full px-4 lg:px-5 py-2 rounded-lg text-sm font-semibold text-center
             bg-emerald-50 text-emerald-700 border border-emerald-400
             hover:bg-emerald-100 hover:border-emerald-500
             transition-all duration-200
             shadow-sm hover:shadow-md
             focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:ring-offset-2"
>
  Edit Profile
</Link>



       <button
  className="w-full px-4 lg:px-5 py-2 rounded-lg text-sm font-semibold text-center
             bg-amber-50 text-amber-700 border border-amber-400
             hover:bg-amber-100 hover:border-amber-500
             transition-all duration-200 cursor-pointer
             shadow-sm hover:shadow-md
             focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-offset-2"
>
  Delete Profile
</button>

      </div>
    </div>
  )
}

export default DocDashProfile