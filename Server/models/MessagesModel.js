import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Users",
        required:true,
    },
    recipient:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Users",
        required:false,
    },
    messageType:{
        type:String,
        enum:["text", "file"],
        required: true,
    },
    fileUrl: {
        type: String,
        required: function () {
            return this.messageType === "file";
        },
        default: null, 
    },
    content: {
        type: String,
        required: function () {
            return this.messageType === "text";
        },
        default: "", 
    },
   
    timestamp:{
        type:Date,
        default:Date.now,
    },
});


messageSchema.pre("save", function (next) {
    if (this.messageType === "text" && !this.content) {
        return next(new Error("Text messages must have content."));
    }
    if (this.messageType === "file" && !this.fileUrl) {
        return next(new Error("File messages must have a fileUrl."));
    }
    next();
});


const Message = mongoose.model("Messages", messageSchema);

export default Message;