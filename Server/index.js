import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"
import mongoose from "mongoose"
import authRoutes from "./routes/AuthRoutes.js"
import contactsRoutes from "./routes/ContactRoutes.js"
import setupSocket from "./socket.js"
import messagesRoutes from "./routes/MessagesRoutes.js"
import channelRoutes from "./routes/ChannelRoutes.js"


dotenv.config();

const app = express();
const port = process.env.PORT || 3001;
const databaseURL= process.env.DATABASE_URL;

app.use(
    cors({
    origin:[process.env.ORIGIN],
    methods:["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,

})
);

app.use("/uploads/profiles",express.static("uploads/profiles"));
app.use("/uploads/files", express.static("uploads/files"));

app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoutes );
app.use("/api/contacts", contactsRoutes);
app.use("/api/messages", messagesRoutes);
app.use("/api/channel", channelRoutes);


const server = app.listen(port,()=>{
    console.log(`server is running at http://localhost:${port}`);
});

setupSocket(server)


mongoose.connect(mongodb+srv://plaraoffcl:zL6GG2H3FXI5qsQD@growmore.kffrb.mongodb.net/GrowMore?retryWrites=true&w=majority&appName=GrowMore).then(()=>console.log('DB Connection Successfull.'))
.catch(err=>console.log(err.message));
api.get("/",(req,res)=>{
    res,json("Hello")
})


