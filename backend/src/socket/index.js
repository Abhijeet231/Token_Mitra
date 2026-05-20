import { Server } from "socket.io";
import { verifyAccessToken } from "../utils/jwt.utils";

const socketInstance = (server) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.CORS_ORIGIN,
      credentials: true,
    },
  });

  // Online users map
  const onlineUsers = new Map();

  // Auth Middleware
  io.use((socket, next) => {
    try {
      const token = socket.handshake.auth.token;
      if (!token) return next(new Error("Unauthorized"));

      const decoded = verifyAccessToken(token);
      socket.data.user = decoded;
      next();
    } catch (error) {
      next(new Error("Unauthorized"));
    }
  });

// connection
  io.on("connection", (socket) => {
    console.log("User Connected:", socket.id, "| User:", socket.data.user.id);

    const userId = socket.data.user.id; // Get authenticated user ID
    if(!onlineUsers.has(userId)){
        onlineUsers.set(userId, new Set());
    }
    onlineUsers.get(userId).add(socket.id);
  });
 

  return io;
};

export default socketInstance;
