const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

// Load .env variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Middlewares
app.use(cors());
app.use(express.json({ limit: "10mb" })); // For large base64 images

// ✅ MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Routes
const authRoutes = require("./routes/authRoutes");
const courseRoutes = require("./routes/courseRoutes");
const enrollRoutes = require("./routes/enrollRoutes");
const generateCourseRoutes = require("./routes/generateCourseRoutes");
const generateCourseLayoutRoutes = require("./routes/generateCourseLayoutRoutes");

app.use("/api/auth", authRoutes); // /signup, /login
app.use("/api/courses", courseRoutes); // GET all courses, single course
app.use("/api/enroll", enrollRoutes); // enroll course, get enrolled, update progress
app.use("/api/generate-course", generateCourseRoutes); // AI course generation
app.use("/api/generate-course-layout", generateCourseLayoutRoutes); // AI layout + video generation

// ✅ Default Route
app.get("/", (req, res) => {
  res.send("✅ Education Platform API running...");
});

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
