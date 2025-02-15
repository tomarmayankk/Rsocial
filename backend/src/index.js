import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js'
import postRoutes from './routes/post.routes.js'
import userRoutes from './routes/user.routes.js'
import cookieParser from "cookie-parser";
import {connectDB} from './lib/db.js'
dotenv.config();

const app = express();
app.use(cors({
    origin: 'http://localhost:5173',
    credentials:true
})); 


app.use(express.json({ limit: "10mb" })); 
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser()); //cookie parser
const PORT = process.env.PORT || 5000;


app.use("/api/auth", authRoutes);   
app.use("/api/post", postRoutes);   
app.use("/api/user", userRoutes);   

app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`);
    connectDB();
})
