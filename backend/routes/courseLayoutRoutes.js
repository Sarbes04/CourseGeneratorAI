import express from "express";
const router = express.Router();
import {generateCourseLayout} from './../controller/courseLayoutController.js';
import {auth} from './../middleware/auth.js'
// Generate course layout
router.post("/generate", auth, generateCourseLayout);

export default router;
