import React from 'react'
import { MessageSquareMore} from "lucide-react"
import { toast } from 'react-toastify'

const DoctorDetailCard = ({doctor}) => {

  const handleChatButton = () => {
    toast.info("Chat Feature Is Not Live Yet!")
  }

  return (
  
         <div className="w-full flex justify-center  mt-6
         ">
        <div className="w-[80%] md:w-[80%] border border-amber-200/60 hover:shadow-2xl hover:border-amber-300 transition-all duration-300 hover:translate-y-1 rounded-2xl drop-shadow-lg p-6 flex flex-col md:flex-row gap-6 shadow-sm ">
          {/* Doctor Image */}
          <div className="shrink-0">
            <img
              src={doctor?.profileImage?.url}
              alt="Doctor Profile"
              className="w-32 h-32 md:w-40 md:h-40 object-cover rounded-xl "
            />
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