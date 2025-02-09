import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js'
import cookieParser from "cookie-parser";
import {connectDB} from './lib/db.js'

const app = express();
app.use(cors({
    origin: 'http://localhost:5173',
    credentials:true
})); 

dotenv.config();
app.use(express.json());
app.use(cookieParser()); //cookie parser
const PORT = process.env.PORT || 5000;


app.use("/api/auth", authRoutes);   

app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`);
    connectDB();
})
