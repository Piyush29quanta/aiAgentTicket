import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv"

dotenv.config();
const PORT = process.env.PORT || 3000
const app = express();


app.use(cors());
app.use(express.json());

mongoose
.connect(process.env.MONGO_URI)
.then(() => {
    console.log("✅ MONGODB Connected ");
    app.listen(PORT,() =>{
        console.log("🚀Server is running at PORT",PORT);
        
    });
})
.catch((err) => console.error("❌ MongoDB error:", err));