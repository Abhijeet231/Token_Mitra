import mongoose from "mongoose";


// Defining Conversation schema 
const conversationSchema = new mongoose.Schema({
    participants:[
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }
    ],
    lastMessage : {
        text: {type: String},
        senderId : {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        createdAt: {type: Date},
    },

}, {timestamps: true})


// Indexing
conversationSchema.index({participants: 1});

const Conversation = mongoose.model ("Conversation", conversationSchema);


export default Conversation;
