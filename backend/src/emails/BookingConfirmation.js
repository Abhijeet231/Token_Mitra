import React from "react";
import { Html, Heading, Text } from "@react-email/components";

export default function BookingConfirmationEmail({
  patientName,
  doctorName,
  appointmentDate,
  slotTime,
  tokenNumber,
}) {
  return React.createElement(
    Html,
    null,
    React.createElement(Heading, null, "Appointment Confirmed"),
    React.createElement(Text, null, `Hello ${patientName},`),
    React.createElement(
      Text,
      null,
      `Your appointment with Dr. ${doctorName} is confirmed.`
    ),
    React.createElement(
      Text,
      null,
      `Date: ${appointmentDate}`
    ),
    React.createElement(
      Text,
      null,
      `Time: ${slotTime}`
    ),
    React.createElement(
      Text,
      null,
      `Token Number: ${tokenNumber}`
    )
  );
}



