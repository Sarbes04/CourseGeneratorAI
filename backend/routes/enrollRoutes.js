const express = require("express");
const router = express.Router();
const {
  enrollCourse,
  getEnrolledCourses,
  updateCompletedChapters,
} = require("../controllers/enrollController");
const auth = require("../middleware/auth");

// ✅ POST - Enroll in a course
router.post("/", auth, enrollCourse);

// ✅ GET - Get enrolled courses or a single enrolled course
router.get("/", auth, getEnrolledCourses);

// ✅ PUT - Update completed chapters
router.put("/", auth, updateCompletedChapters);

module.exports = router;
