import express from "express"
import { authenticated } from "../middleware/auth"
import { createTicket, getTicket, getTickets } from "../controllers/ticket"

const router = express.Router()

router.get("/",authenticated,getTickets)
router.get("/:id",authenticated,getTicket)
router.post("/",authenticated,createTicket)

export default router