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
      <div className="min-h-[200px] flex items-center justify-center text-amber-700 font-medium">
        Loading profile...
      </div>
    )
  }

  return (
    <div className="w-full rounded-xl  border border-amber-50 p-4 shadow-lg">
        
      {/* Profile Info */}
      <div className="flex gap-4 items-center">
        <img
          src={doctor?.profileImage?.url}
          alt="Doctor Profile"
          className="h-20 w-20 rounded-full object-cover "
        />

        <div className="flex flex-col">
          <h2
  onClick={() => navigate("/doctors/profile")}
  className="flex items-center gap-2 cursor-pointer
             text-lg font-semibold text-gray-950 mb-1
             hover:text-amber-700 transition"
>
  <UserCircle className="w-6 h-6 text-amber-600" />
  {doctor?.userId?.fullName}
</h2>


          <p className="text-sm text-black">
            {doctor?.specialization}
          </p>

          <p className="text-sm text-black">
            {doctor?.userId?.email}
          </p>
        </div>
         
      </div>

      {/* Actions */}
      <div className="flex justify-center gap-4 mt-4">
        <Link
          to="/doctor/profile/edit"
          className="px-4 py-1.5 rounded-md text-sm font-medium 
                     bg-amber-500 text-white
                     hover:bg-amber-600 transition"
        >
          Edit Profile
        </Link>

        <button
          className="px-4 py-1.5 rounded-md text-sm font-medium
                     border border-amber-400 text-amber-700
                     hover:bg-amber-100 transition"
        >
          Delete Profile
        </button>

        
      </div>
    </div>
  )
}

export default DocDashProfile
