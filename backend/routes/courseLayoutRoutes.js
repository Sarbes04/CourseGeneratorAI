const express = require("express");
const router = express.Router();
const { generateCourseLayout } = require("../controllers/courseLayoutController");
const auth = require("../middleware/auth");

// ✅ POST - Generate course layout
router.post("/generate", auth, generateCourseLayout);

module.exports = router;
