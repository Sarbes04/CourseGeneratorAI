import express from "express";
const router = express.Router();
import {
  enrollCourse,
  getEnrolledCourses,
  updateCompletedChapters,
} from "./../controller/enrollController.js";
import {auth} from "./../middleware/auth.js";

//Enroll in a course
router.post("/", auth, enrollCourse);

//  Get enrolled courses or a single enrolled course
router.get("/", auth, getEnrolledCourses);

// Update completed chapters
router.put("/", auth, updateCompletedChapters);

export default router;
