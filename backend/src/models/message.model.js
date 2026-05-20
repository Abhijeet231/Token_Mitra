import mongoose, { Schema } from "mongoose";

const messageSchema = new Schema(
  {
    conversationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conversation",
      required: true,
    },
    senderId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
      minlength: [1, "Text should be at least 1 character long!"],
    },
    images: [
      {
        url: { type: String, required: true },
        public_id: { type: String, required: true },
      },
    ],
    seenBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: [],
      },
    ],
  },
  { timestamps: true },
);

// Indexing for sorting chats
messageSchema.index({ conversationId: 1, createdAt: -1 });

// Message Verification
messageSchema.pre("save", function () {
  if (!this.text && (!this.images || this.images.length === 0)) {
    return next(new Error("Message must contain text or at least one image."));
  }
});

const Message = mongoose.model("Message", messageSchema);

export default Message;
