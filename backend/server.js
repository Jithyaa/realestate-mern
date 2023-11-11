import  path from "path";
import  express  from "express";
import dotenv from 'dotenv'
dotenv.config();
import cookieParser from "cookie-parser";
import { notFound,errorHandler } from "./middleware/errorMiddleware.js";

import connectDB from "./config/db.js";

import cors from 'cors'
import http from "http";
 
const port = process.env.PORT || 7000;
import userRoutes from './routes/userRoutes.js'

import adminRoutes from './routes/adminRoutes.js'

import residencyRoutes from './routes/residencyRoutes.js'

import  morgan from "morgan";

import { Server } from "socket.io";

 
const app = express();

const server = http.createServer(app);
app.use(cors({
  origin: "http://13.127.252.69:5000",
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

if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  const basePath = path.dirname(__dirname);
  app.use(express.static(path.join(basePath, "frontend/dist")));

  app.get("*", function (req, res) {
    const indexPath = path.join(basePath, "frontend/dist/index.html");

    res.sendFile(indexPath, function (err) {
      if (err) {
        console.error("Error sending index.html:", err);
        res.status(500).send(err);
      } else {
        console.log("Index.html send successfully");
      } 
    });  
  });
  
}else{
  console.log("Great")
}

app.use(errorHandler);

app.use(notFound);

connectDB()
  .then(() => {
    try {
      server.listen(port, () => {
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

 