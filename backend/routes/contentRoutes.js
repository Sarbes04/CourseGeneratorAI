const express = require("express");
const router = express.Router();
const { generateCourseContent } = require("../controllers/contentController");
const auth = require("../middleware/auth");

// ✅ POST /api/content/generate
router.post("/generate", auth, generateCourseContent);

module.exports = router;
