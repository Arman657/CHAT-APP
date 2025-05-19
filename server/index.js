import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import authRoutes from './routes/AuthRoutes.js';
import contactsRoutes from './routes/ContactsRoutes.js';
import setupSocket from './socket.js';
import messagesRoutes from './routes/MessagesRoutes.js';
import channelRoutes from './routes/ChannelRoutes.js';
import path from 'path';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;
const databaseURL = process.env.DATABASE_URL;

app.use(cors({
    origin:[process.env.ORIGIN],
    methods:["GET","PUT","POST","PATCH","DELETE"],
    credentials:true,
}));

app.use("/uploads/profiles",express.static("uploads/profiles"));
app.use("/uploads/files",express.static("uploads/files"));

app.use(cookieParser());
app.use(express.json());



app.use("/api/auth",authRoutes);
app.use("/api/contacts",contactsRoutes);
app.use("/api/messages",messagesRoutes);
app.use("/api/channel",channelRoutes);

const server = app.listen(port,()=>{
    console.log(`Server is listening on ${port}`);
})

setupSocket(server)


//---------------Deployment---------------

// const __dirname1 = path.resolve();
// if(process.env.NODE_ENV === 'production'){
//     app.use(express.static(path.join(__dirname1,'/client/dist')));

//     app.get('*/', (req, res) => {
//         res.sendFile(path.resolve(__dirname1, 'client', 'dist', 'index.html'));
//     });
// }else{
//     app.get("/",(req,res)=>{
//         res.send("API is Running Successfully")
//     })
// }

//---------------Deployment---------------

// mongoose.connect(databaseURL).then(()=>console.log('DB Connection Successfully'));
const connectDB = async() => {
    try {
        
        await mongoose.connect(databaseURL);
        console.log('DB Connected successfully');

    } catch (error) {
        console.log('Error Db',error);
    }
}

connectDB()




