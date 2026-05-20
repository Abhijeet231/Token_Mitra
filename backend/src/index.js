import http from "node:http";
import { Server } from "socket.io";
import connectDB from "./db/index.js";
import "./corn/cleanAvailableSlots.js";
import "./corn/bookingCleanup.js";
import app from "./app.js";

const main = async () => {
  try {
    const PORT = process.env.PORT || 3000;
    await connectDB();

    const server = http.createServer(app);
    

    server.listen(PORT, () => {
      console.log(`Server is running on ${PORT}`);
    });
  } catch (error) {
    console.error("Error while starting server:", error);
    process.exit(1);
  }
};

main();
