import express from "express";
const router = express.Router();
import { signup, login, updateProfile } from "./../controller/authController.js";
import { auth } from "../middleware/auth.js";

router.post("/signup", signup);
router.post("/login", login);
router.put("/update" ,auth,updateProfile)

export default router;
