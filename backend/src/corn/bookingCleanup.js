import cron from "node-cron";
import Booking from "../models/booking.model.js";


cron.schedule( "0 * * * *", async () => {
    console.log("Running booking cleanup...");

    const now = new Date();

    const bookings = await Booking.find({status:"pending"}).populate("availabilityId");

    for(const booking of bookings){
        const {appointmentDate, slotTime, availabilityId} = booking;

        // skip if slot is missing 
        if(!availabilityId) continue;

        //formating combined date and slot time 
        const slotDateStr = appointmentDate.toISOString().split("T")[0];
        const appointmentDateTime = new Date(`${slotDateStr} ${slotTime}`);

        // if appointment time is in the past > mark as cancelled 
        if(appointmentDateTime < now) {
            booking.status = "cancelled";
            await booking.save();
            console.log(`Booking ${booking._id} marked as Cancelled!`)
        }
    }
         
});

    
