import mongoose ,{Schema} from "mongoose";

const messageSchema = new Schema ({
    senderId: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    receiverId: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    messageText: {
        type: String,
        required: [true, "Message required!"],
    },
    isSeen: {
        type: Boolean,
    }
}, {timestamps: true});

const Message = mongoose.Model('Message', messageSchema);

export default Message;