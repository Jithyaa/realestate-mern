import  path from "path";
import  express  from "express";
import dotenv from 'dotenv'
dotenv.config();
import cookieParser from "cookie-parser";
import { notFound,errorHandler } from "./middleware/errorMiddleware.js";

import connectDB from "./config/db.js";

import cors from 'cors'

connectDB();

const port = process.env.PORT || 5000;
import userRoutes from './routes/userRoutes.js'

import adminRoutes from './routes/adminRoutes.js'

import residencyRoutes from './routes/residencyRoutes.js'

import  morgan from "morgan";

const app = express();

app.use(cors({orgin:"http://localhost:3000",credentials:true}))

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



app.listen(port,()=>console.log(`server started on port ${port}`));