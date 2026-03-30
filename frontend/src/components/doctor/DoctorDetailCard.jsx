import React from 'react'
import { MessageSquareMore } from "lucide-react"
import { toast } from 'react-toastify'

const DoctorPlaceholder = ({ className }) => (
  <div className={`flex flex-col items-center justify-center bg-linear-to-br from-amber-50 to-orange-100 rounded-xl ${className}`}>
    <div className="w-16 h-16 rounded-full bg-amber-200/60 flex items-center justify-center">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" className="w-12 h-12" fill="none">
        {/* Body / coat */}
        <ellipse cx="40" cy="72" rx="26" ry="14" fill="#f59e0b" opacity="0.25" />
        <rect x="22" y="46" width="36" height="28" rx="10" fill="#fff7ed" />
        <rect x="22" y="46" width="36" height="28" rx="10" fill="#f59e0b" opacity="0.15" />
        {/* Coat lapels */}
        <path d="M40 52 L33 46 L33 62" stroke="#f59e0b" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M40 52 L47 46 L47 62" stroke="#f59e0b" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {/* Stethoscope */}
        <path d="M33 56 Q30 62 34 65 Q38 68 40 65 Q42 62 40 59" stroke="#ea580c" strokeWidth="1.8" fill="none" strokeLinecap="round" />
        <circle cx="40" cy="58.5" r="2" fill="#ea580c" />
        {/* Head */}
        <circle cx="40" cy="32" r="14" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
        {/* Face */}
        <circle cx="36" cy="30" r="1.2" fill="#d97706" />
        <circle cx="44" cy="30" r="1.2" fill="#d97706" />
        <path d="M36 36 Q40 39 44 36" stroke="#d97706" strokeWidth="1.2" fill="none" strokeLinecap="round" />
        {/* Hair */}
        <path d="M26 30 Q27 18 40 18 Q53 18 54 30" fill="#d97706" opacity="0.5" />
        {/* Cross on coat */}
        <rect x="38.5" y="54" width="3" height="8" rx="1" fill="#ea580c" opacity="0.6" />
        <rect x="36" y="56.5" width="8" height="3" rx="1" fill="#ea580c" opacity="0.6" />
      </svg>
    </div>
    <p className="mt-2 text-xs font-medium text-amber-500/80 tracking-wide uppercase">No Photo</p>
  </div>
)

const DoctorDetailCard = ({ doctor }) => {
  const hasImage = doctor?.profileImage?.url

  const handleChatButton = () => {
    toast.info("Chat Feature Is Not Live Yet!")
  }

  return (
    <div className="w-full flex justify-center mt-6">
      <div className="w-[80%] md:w-[80%] border border-amber-200/60 hover:shadow-2xl hover:border-amber-300 transition-all duration-300 hover:translate-y-1 rounded-2xl drop-shadow-lg p-6 flex flex-col md:flex-row gap-6 shadow-sm">
        {/* Doctor Image */}
        <div className="shrink-0">
          {hasImage ? (
            <img
              src={doctor.profileImage.url}
              alt="Doctor Profile"
              className="w-32 h-32 md:w-40 md:h-40 object-cover rounded-xl"
            />
          ) : (
            <DoctorPlaceholder className="w-32 h-32 md:w-40 md:h-40" />
          )}
        </div>

        {/* Doctor Info */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Dr. {doctor?.userId?.fullName}
            </h2>

            <p className="text-sm text-amber-600 font-medium mt-1">
              {doctor?.specialization}
            </p>

            <hr className="my-3 border-gray-200" />

            <p className="text-sm text-gray-700">
              <span className="font-semibold">Experience:</span>{" "}
              {doctor?.experience} Years
            </p>

            <p className="text-sm text-gray-700 mt-1">
              <span className="font-semibold">Qualification:</span>{" "}
              {doctor?.qualification}
            </p>
          </div>

          {/* Action Button */}
          <div className="mt-4 md:mt-0 flex md:justify-end">
            <button
              onClick={handleChatButton}
              className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 cursor-pointer
                   text-white font-semibold px-5 py-2 rounded-lg 
                   transition-all shadow-sm hover:shadow-md"
            >
              <MessageSquareMore size={18} />
              Chat with Doctor
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DoctorDetailCard