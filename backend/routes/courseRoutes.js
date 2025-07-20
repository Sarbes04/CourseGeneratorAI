const express = require("express");
const router = express.Router();
const { getCourses } = require("../controllers/courseController");
const auth = require("../middleware/auth");

// ✅ GET /api/courses
router.get("/", auth, getCourses);

module.exports = router;
