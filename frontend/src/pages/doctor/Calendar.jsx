import React from 'react'
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css'

const Calendar = ({ selectedDate, onDateSelect }) => {
  return (
    <DayPicker
      mode="single"
      selected={selectedDate}
      onSelect={onDateSelect}
      disabled={{ before: new Date() }}
    />
  )
}

export default Calendar
