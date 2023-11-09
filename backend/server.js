import  path from "path";
import  express  from "express";
import dotenv from 'dotenv'
dotenv.config();
import cookieParser from "cookie-parser";
import { notFound,errorHandler } from "./middleware/errorMiddleware.js";

import connectDB from "./config/db.js";

import cors from 'cors'

 
const port = process.env.PORT || 5000;
import userRoutes from './routes/userRoutes.js'

import adminRoutes from './routes/adminRoutes.js'

import residencyRoutes from './routes/residencyRoutes.js'

import  morgan from "morgan";

import { Server } from "socket.io";

import connectDB from "./config/db.js";
const app = express();

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));

app.use(morgan('tiny'));

app.use(express.static('backend/public'))

app.use(cookieParser());

app.use(express.json());
        
app.use(express.urlencoded({extended:true}))

app.use('/api/users',userRoutes);

app.use('/api/admin',adminRoutes);

app.use('/api/residency',residencyRoutes)

if(process.env.NODE_ENV === 'production'){
    const __dirname = path.resolve();
    app.use(express.static(path.join(__dirname, 'frontend/dist')));

    app.get('*',(req,res) => res.sendFile(path.resolve(__dirname, 'frontend', 'dist','index.html')));
}else{
    app.get('/',(req,res)=>res.send('server is ready'));
}

app.use(errorHandler);

app.use(notFound);

connectDB()
  .then(() => {
    try {
      app.listen(port, () => {
        console.log(`The server is running at port number ${port} `);
      });
    } catch (err) {
      console.log("Cannot Connect to the server", err);
    }
  })
  .catch((err) => {
    console.log("Invalid Database Connection !!", err);
  });

  // Socket.io initialisation //

 const io=new Server(server,{
    pingTimeout:60000,
    cors: {
      origin: "*",
    },
 });
 

io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);

  socket.on("joinRoom", (roomId) => {
    console.log({roomId});
    socket.join(roomId);
  });

  socket.on("sendMessage", (roomId, message) => {
    console.log({message});
    console.log({roomId});
    io.to(roomId).emit("message", message);
  });

 socket.on("disconnect", () => {
    console.log("We are disconnected");
  });
});

 