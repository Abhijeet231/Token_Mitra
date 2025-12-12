import React from "react";

export default function BookingConfirmationEmail({ 
  patientName, 
  doctorName, 
  appointmentDate, 
  slotTime, 
  tokenNumber 
}) {
  return (
    <div style={{ 
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      maxWidth: "600px",
      margin: "0 auto",
      backgroundColor: "#ffffff",
      padding: "40px 20px"
    }}>
      {/* Header */}
      <div style={{
        backgroundColor: "#4F46E5",
        padding: "30px",
        borderRadius: "8px 8px 0 0",
        textAlign: "center"
      }}>
        <h2 style={{
          color: "#ffffff",
          margin: "0",
          fontSize: "24px",
          fontWeight: "600"
        }}>
          ✓ Appointment Confirmed
        </h2>
      </div>

      {/* Content */}
      <div style={{
        backgroundColor: "#F9FAFB",
        padding: "30px",
        borderLeft: "1px solid #E5E7EB",
        borderRight: "1px solid #E5E7EB"
      }}>
        <p style={{
          fontSize: "16px",
          color: "#374151",
          marginTop: "0"
        }}>
          Hello <strong>{patientName}</strong>,
        </p>
        
        <p style={{
          fontSize: "16px",
          color: "#374151",
          lineHeight: "1.6"
        }}>
          Your appointment with <strong style={{ color: "#4F46E5" }}>Dr. {doctorName}</strong> has been successfully booked.
        </p>

        {/* Appointment Details Card */}
        <div style={{
          backgroundColor: "#ffffff",
          border: "2px solid #4F46E5",
          borderRadius: "8px",
          padding: "20px",
          marginTop: "20px",
          marginBottom: "20px"
        }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <tbody>
              <tr>
                <td style={{
                  padding: "10px 0",
                  fontSize: "14px",
                  color: "#6B7280",
                  fontWeight: "600"
                }}>
                  📅 Date:
                </td>
                <td style={{
                  padding: "10px 0",
                  fontSize: "16px",
                  color: "#111827",
                  fontWeight: "500",
                  textAlign: "right"
                }}>
                  {appointmentDate}
                </td>
              </tr>
              <tr>
                <td style={{
                  padding: "10px 0",
                  fontSize: "14px",
                  color: "#6B7280",
                  fontWeight: "600",
                  borderTop: "1px solid #E5E7EB"
                }}>
                  ⏰ Time:
                </td>
                <td style={{
                  padding: "10px 0",
                  fontSize: "16px",
                  color: "#111827",
                  fontWeight: "500",
                  textAlign: "right",
                  borderTop: "1px solid #E5E7EB"
                }}>
                  {slotTime}
                </td>
              </tr>
              <tr>
                <td style={{
                  padding: "10px 0",
                  fontSize: "14px",
                  color: "#6B7280",
                  fontWeight: "600",
                  borderTop: "1px solid #E5E7EB"
                }}>
                  🎫 Token Number:
                </td>
                <td style={{
                  padding: "10px 0",
                  fontSize: "20px",
                  color: "#4F46E5",
                  fontWeight: "700",
                  textAlign: "right",
                  borderTop: "1px solid #E5E7EB"
                }}>
                  #{tokenNumber}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Important Notice */}
        <div style={{
          backgroundColor: "#FEF3C7",
          border: "1px solid #F59E0B",
          borderRadius: "6px",
          padding: "15px",
          marginTop: "20px"
        }}>
          <p style={{
            margin: "0",
            fontSize: "14px",
            color: "#92400E",
            lineHeight: "1.5"
          }}>
            ⚠️ <strong>Please arrive at least 10 minutes early</strong> for your appointment.
          </p>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        backgroundColor: "#F3F4F6",
        padding: "20px 30px",
        borderRadius: "0 0 8px 8px",
        borderLeft: "1px solid #E5E7EB",
        borderRight: "1px solid #E5E7EB",
        borderBottom: "1px solid #E5E7EB",
        textAlign: "center"
      }}>
        <p style={{
          margin: "0",
          fontSize: "14px",
          color: "#6B7280",
          lineHeight: "1.6"
        }}>
          Thank you for choosing us!<br/>
          <strong style={{ color: "#4F46E5" }}>TokenMitra Team</strong>
        </p>
      </div>
    </div>
  );
}




// export default function BookingConfirmationEmail({ patientName, doctorName, appointmentDate, slotTime, tokenNumber }) {
//   return (
//     <div style={{ fontFamily: "Arial", padding: "20px" }}>
//       <h2>Your Appointment is Confirmed</h2>
//       <p>Hello {patientName},</p>

//       <p>Your appointment with <strong>Dr. {doctorName}</strong> is booked.</p>

//       <p>
//         <strong>Date:</strong> {appointmentDate} <br/>
//         <strong>Time:</strong> {slotTime} <br/>
//         <strong>Token Number:</strong> {tokenNumber}
//       </p>

//       <p>Please arrive at least 10 minutes early.</p>

//       <p>Thank you,<br/>TokenMitra Team</p>
//     </div>
//   );
// }



