import express from "express";
const router = express.Router();
import { getCourses } from "./../controller/courseController.js"
import {auth} from "./../middleware/auth.js" 

// ✅ GET /api/courses
router.get("/", auth, getCourses);

export default router;
