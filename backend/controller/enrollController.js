const EnrollCourse = require("../models/EnrollCourse");
const Course = require("../models/Course");

// ✅ POST - Enroll in a course
exports.enrollCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    const userId = req.user.id;

    // Check if already enrolled
    const existing = await EnrollCourse.findOne({ course: courseId, user: userId });
    if (existing) {
      return res.json({ resp: "Already Enrolled" });
    }

    const enrollment = await EnrollCourse.create({
      course: courseId,
      user: userId,
    });

    res.status(201).json(enrollment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ GET - Fetch enrolled courses OR single enrolled course
exports.getEnrolledCourses = async (req, res) => {
  try {
    const userId = req.user.id;
    const courseId = req.query.courseId;

    if (courseId) {
      // Single course enrollment details with course info (JOIN equivalent)
      const enrolled = await EnrollCourse.findOne({ course: courseId, user: userId })
        .populate("course");

      if (!enrolled) return res.status(404).json({ message: "Not enrolled" });

      return res.json(enrolled);
    }

    // All enrolled courses (ordered by latest)
    const enrolledCourses = await EnrollCourse.find({ user: userId })
      .populate("course")
      .sort({ createdAt: -1 });

    res.json(enrolledCourses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ PUT - Update completed chapters
exports.updateCompletedChapters = async (req, res) => {
  try {
    const { completedChapter, courseId } = req.body;
    const userId = req.user.id;

    const updated = await EnrollCourse.findOneAndUpdate(
      { course: courseId, user: userId },
      { completedChapters: completedChapter },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Enrollment not found" });

    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
