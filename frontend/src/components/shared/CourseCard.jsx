import React, { useState } from "react";
import { Book, LoaderCircle, PlayCircle, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "../../config/axiosConfig";
import { toast } from "react-hot-toast";

function CourseCard({ course }) {
  const courseJson = course?.courseJson?.course;
  const [loading, setLoading] = useState(false);

  const onEnrollCourse = async () => {
    setLoading(true);
    try {
      const result = await axios.post("/api/enroll", {
        courseId: course?._id,
      });
      if (result.data.resp) {
        toast("Already enrolled in this course", { icon: "⚠️" });
      } else {
        toast.success("Enrolled successfully!");
      }
    } catch (e) {
      toast.error("Failed to enroll in course");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="shadow rounded-xl">
      <img
        src={course?.bannerImageUrl}
        alt={course?.name}
        className="w-full aspect-video rounded-t-xl object-cover"
      />

      <div className="p-3 flex flex-col gap-3">
        <h2 className="font-bold text-lg line-clamp-1">{courseJson?.name}</h2>
        <p className="line-clamp-3 text-gray-400 text-sm">
          {courseJson?.description}
        </p>

        <div className="flex justify-between items-center">
          <h2 className="flex items-center text-sm gap-2">
            <Book className="text-primary h-5 w-5" />
            {courseJson?.noOfChapters} Chapters
          </h2>

          {course?.courseContent?.length ? (
            <button
              onClick={onEnrollCourse}
              disabled={loading}
              className={`flex items-center gap-1 bg-blue-600 text-white px-3 py-1 rounded text-sm transition hover:bg-blue-700 ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {loading ? (
                <LoaderCircle className="animate-spin w-4 h-4" />
              ) : (
                <PlayCircle className="w-4 h-4" />
              )}
              Enroll Course
            </button>
          ) : (
            <Link to={`/workspace/edit-course/${course?.cid}`}>
              <button className="flex items-center gap-1 border border-gray-300 px-3 py-1 rounded text-sm hover:bg-gray-100">
                <Settings className="w-4 h-4" />
                Generate Course
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default CourseCard;
