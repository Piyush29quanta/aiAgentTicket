import express from "express";
import { getUsers, login, logout, signup, updateUser } from "../controllers/user.js";
import {authenticated} from "../middleware/auth.js"

const router = express.Router();

router.post("/update-user",authenticated,updateUser)
router.get("/users",authenticated,getUsers)

router.post("/signup",signup)
router.post("/signup",login)
router.post("/signup",logout)

export default router;