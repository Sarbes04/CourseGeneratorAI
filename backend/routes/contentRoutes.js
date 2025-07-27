import express from "express";
const router = express.Router();
import { generateCourseContent } from './../controller/contentController.js';
import {auth} from "./../middleware/auth.js"

//api/content/generate
router.post("/generate", auth, generateCourseContent);

export default router;
