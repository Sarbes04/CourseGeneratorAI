import Course from "./../models/Course.js"
// ✅ GET Courses
export const getCourses = async (req, res) => {
  try {
    console.log(req);
    const courseId = req.query.courseId;
    const userId = req.user.id;
    console.log(courseId); // coming from JWT middleware

    // 1️⃣ Show only courses with generated content
    if (courseId == 0) {
      const courses = await Course.find({ }); 
      return res.json(courses);
    }

    // 2️⃣ Get a specific course by courseId (cid)
    if (courseId) {
      const course = await Course.findOne({ cid: courseId });
      if (!course) return res.status(404).json({ message: "Course not found" });
      return res.json(course);
    }

    // 3️⃣ Get all courses created by the logged-in user
    const myCourses = await Course.find({ user: userId }).sort({ createdAt: -1 });
    return res.json(myCourses);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
