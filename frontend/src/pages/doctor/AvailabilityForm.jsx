import React, { useState } from 'react'
import Calendar from './Calendar'
import { toast } from 'react-toastify'
import { createAvailability } from '@/services/docAvailability'

const AvailabilityForm = () => {
  const [selectedDate, setSelectedDate] = useState(null)
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [maxPatients, setMaxPatients] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!selectedDate) {
      toast.error('Please select a date')
      return
    }

    if (!startTime || !endTime) {
      toast.error('Start time and end time are required')
      return
    }

    const payload = {
      date: selectedDate.toISOString(), 
      startTime,
      endTime,
      maxPatients: maxPatients ? Number(maxPatients) : undefined,
    }

    console.log('Availability Payload:', payload)

    try {
      setLoading(true)
      await createAvailability(payload)
      toast.success('Availability added successfully')
    } catch (error) {
      toast.error('Failed to add availability')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full rounded-xl border border-amber-200  p-5 sm:p-6 lg:p-8 shadow-lg">
      <h3 className="text-lg sm:text-xl font-bold text-stone-900 mb-4 sm:mb-6">
        Create Availability
      </h3>

      <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-6 lg:gap-4">
        {/* Calendar */}
        <div className="w-full lg:w-1/2">
          <Calendar
            selectedDate={selectedDate}
            onDateSelect={setSelectedDate}
          />

          {selectedDate && (
            <p className="mt-3 text-sm sm:text-base text-amber-700 bg-white/60 backdrop-blur-sm px-3 py-2 rounded-lg">
              Selected date:{' '}
              <span className="font-semibold text-amber-900">
                {selectedDate.toDateString()}
              </span>
            </p>
          )}
        </div>

        {/* Inputs */}
        <div className="w-full lg:w-1/2 flex flex-col gap-4 sm:gap-5">
          {/* Start Time */}
          <div>
            <label className="block text-sm sm:text-base font-semibold text-stone-900 mb-2">
              Start Time
            </label>
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full rounded-lg border-2 border-amber-200 bg-white px-3 sm:px-4 py-2 sm:py-3 text-stone-900
                       focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all shadow-sm"  
            />
          </div>

          {/* End Time */}
          <div>
            <label className="block text-sm sm:text-base font-semibold text-stone-900 mb-2">
              End Time
            </label>
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="w-full rounded-lg border-2 border-amber-200 bg-white px-3 sm:px-4 py-2 sm:py-3 text-stone-900
                         focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all shadow-sm"
            />
          </div>

          {/* Max Patients */}
          <div>
            <label className="block text-sm sm:text-base font-semibold text-stone-900 mb-2">
              Max Patients (optional)
            </label>
            <input
              type="number"
              min="0"
              value={maxPatients}
              onChange={(e) => setMaxPatients(e.target.value)}
              className="w-full rounded-lg border-2 border-amber-200 bg-white px-3 sm:px-4 py-2 sm:py-3 text-stone-900
                         focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all shadow-sm"
              placeholder="e.g. 10"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="mt-2 rounded-lg bg-linear-to-r from-amber-500 to-orange-500 px-4 sm:px-6 py-2.5 sm:py-3
                       text-white font-semibold text-sm sm:text-base
                       hover:from-amber-600 hover:to-orange-600 transition-all shadow-md hover:shadow-lg cursor-pointer
                       disabled:opacity-60 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
          >
            {loading ? 'Saving...' : 'Save Availability'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default AvailabilityForm