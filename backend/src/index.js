import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js'
import {connectDB} from './lib/db.js'

const app = express();

dotenv.config();
app.use(express.json());
const PORT = process.env.PORT || 5000;

app.use("/api/auth", authRoutes);   

app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`);
    connectDB();
})
