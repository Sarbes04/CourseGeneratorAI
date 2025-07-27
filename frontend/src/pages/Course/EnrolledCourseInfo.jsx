import React, { useState } from "react";
import {
  Clock,
  PlayCircle,
  TrendingUp,
  Book,
  Settings,
  Loader2Icon,
} from "lucide-react";
import { toast } from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import axiosInstance from "../../config/axiosConfig";

function EnrolledCourseInfo({ course, viewCourse = true }) {
  const courseLayout = course?.course?.courseJson?.course;
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const GenerateCourseContent = async () => {
    setLoading(true);
    try {
      await axiosInstance.post("/api/generate-course/generate", {
        courseJson: courseLayout,
        courseTitle: course?.name,
        courseId: course?.cid,
      });
      toast.success("Course Generated successfully");
      navigate("/workspace");
    } catch (e) {
      console.error(e);
      toast.error("Server Side Error, Try Again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-row-reverse md:flex gap-5 justify-between p-5 rounded-2xl shadow">
      <div className="flex flex-col gap-3">
        <h2 className="font-bold text-3xl">{courseLayout?.name}</h2>
        <p className="line-clamp-2 text-gray-500">{courseLayout?.description}</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="flex gap-5 items-center p-3 rounded-lg shadow">
            <Clock className="text-blue-500" />
            <section>
              <h2 className="font-bold">Duration</h2>
              <h2>2 Hours</h2>
            </section>
          </div>
          <div className="flex gap-5 items-center p-3 rounded-lg shadow">
            <Book className="text-green-500" />
            <section>
              <h2 className="font-bold">Chapters</h2>
              <h2>{course?.noOfChapters}</h2>
            </section>
          </div>
          <div className="flex gap-5 items-center p-3 rounded-lg shadow">
            <TrendingUp className="text-red-500" />
            <section>
              <h2 className="font-bold">Difficulty Level</h2>
              <h2>{course?.level}</h2>
            </section>
          </div>
        </div>

        {!viewCourse ? (
          <button
            onClick={GenerateCourseContent}
            disabled={loading}
            className={`max-w-lg flex items-center gap-2 justify-center px-4 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700 transition ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? <Loader2Icon className="animate-spin" /> : <Settings />}
            {loading ? "Generating..." : "Generate Content"}
          </button>
        ) : (
          <Link to={`/workspace/view/${course?._id}`}>
            <button className="w-full flex items-center gap-2 justify-center px-4 py-2 rounded-md text-white bg-green-600 hover:bg-green-700 transition">
              <PlayCircle />
              Continue Learning
            </button>
          </Link>
        )}
      </div>
      {course?.course?.bannerImageUrl && (
        <img
          src={course?.course?.bannerImageUrl}
          alt="Banner"
          className="w-full mt-5 md:mt-0 object-cover h-[240px] rounded-2xl"
        />
      )}
    </div>
  );
}

export default EnrolledCourseInfo;
