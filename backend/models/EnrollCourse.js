import mongoose from "mongoose";

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

export default mongoose.model("EnrollCourse", enrollCourseSchema);
