import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv"
import userRoutes from "./routes/user.js"
import ticketRoutes from "./routes/ticket.js"
import {serve} from "inngest/express"
import {inngest} from "./inngest/client.js"
import { onUserSignUp } from "./inngest/functions/onsign-up.js";
import { onTicketCreated } from "./inngest/functions/on-ticket-create.js";

dotenv.config();
const PORT = process.env.PORT || 3000
const app = express();


app.use(cors());
app.use(express.json());
app.use("/api/auth",userRoutes)
app.use("/api/tickets",ticketRoutes)
app.use("/api/inngest",serve({
    client:inngest,
    functions:[onUserSignUp,onTicketCreated]
}));

mongoose
.connect(process.env.MONGO_URI)
.then(() => {
    console.log("✅ MONGODB Connected ");
    app.listen(PORT,() =>{
        console.log("🚀Server is running at PORT",PORT);
        
    });
})
.catch((err) => console.error("❌ MongoDB error:", err));