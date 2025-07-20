const mongoose = require("mongoose");

const enrollCourseSchema = new mongoose.Schema(
  {
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    completedChapters: { type: Object, default: {} },
  },
  { timestamps: true }
);

module.exports = mongoose.model("EnrollCourse", enrollCourseSchema);
