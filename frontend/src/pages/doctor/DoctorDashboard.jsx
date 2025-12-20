import React from 'react'
import DocDashProfile from './DocDashProfile'

const DoctorDashboard = () => {
  return (
    <div>

      <div className='flex justify-around items-center'>
          {/* Doctor Profile*/}
          <div>
              <DocDashProfile/>
          </div>

          {/* Calander Component*/}
          <div>
            calander comp
          </div>
     </div>

      {/* Appointment lists*/}
      <div>

      </div>


    </div>
  )
}

export default DoctorDashboard