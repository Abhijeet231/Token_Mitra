import React from 'react'
import DocDashProfile from './DocDashProfile'
import AvailabilityForm from './AvailabilityForm'
import AvailableSlots from './AvailableSlots'

const DoctorDashboard = () => {
  return (
    <div className="w-full p-4 bg-blue-50-50">

      <div className="flex justify-between gap-6">
        {/* Doctor Profile */}
        <div className="w-1/3">
          <DocDashProfile/>
        </div>

        {/* Availability Section */}
        <div className="w-2/3">
          <AvailabilityForm />
        </div>
      </div>
      

      {/* Appointment List */}
      <div className="mt-8">
        {/* Upcoming appointments */}
        <AvailableSlots/>
      </div>

    </div>
  )
}

export default DoctorDashboard
