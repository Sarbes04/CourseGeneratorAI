import express from "express";
const router = express.Router();
import {
  enrollCourse,
  getEnrolledCourses,
  updateCompletedChapters,
} from "./../controller/enrollController.js";
import {auth} from "./../middleware/auth.js";

// ✅ POST - Enroll in a course
router.post("/", auth, enrollCourse);

// ✅ GET - Get enrolled courses or a single enrolled course
router.get("/", auth, getEnrolledCourses);

// ✅ PUT - Update completed chapters
router.put("/", auth, updateCompletedChapters);

export default router;
