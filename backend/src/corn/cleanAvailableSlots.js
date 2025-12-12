import cron from "node-cron";
import DocAvailability from "../models/docAvailability.model.js";

cron.schedule("0 * * * *", async() => {
    //runs every hour
    console.log("Running availability cleanup jobs..")

    const now = new Date();

    const expiredSlots = await DocAvailability.updateMany(
        {date: {$lt: now}, isActive: true},
        {$set: {isActive: false}}
    );

    console.log("Expired Slots deactivated:", expiredSlots.modifiedCount);
});

