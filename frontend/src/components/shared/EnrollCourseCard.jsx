import React from "react";
import { Link } from "react-router-dom";
import { PlayCircle } from "lucide-react";

function EnrollCourseCard({ course, enrollCourse, enrollId }) {
  const courseJson = course?.courseJson?.course;

  const CalculatePerProgress = () => {
    return (
      ((enrollCourse?.completedChapters?.length ?? 0) /
        (course?.courseContent?.length || 1)) *
      100
    ).toFixed(0);
  };

  return (
    <div className="shadow rounded-xl bg-white">
      <img
        src={course?.bannerImageUrl}
        alt={course?.courseJson?.course?.name}
        className="w-full aspect-video rounded-t-xl object-cover"
      />

      <div className="p-3 flex flex-col gap-3">
        <h2 className="font-bold text-lg line-clamp-1">{course?.courseJson?.course?.name}</h2>
        <p className="line-clamp-3 text-gray-400 text-sm">
          {courseJson?.description}
        </p>

        <div className="w-full">
          <h2 className="flex justify-between text-sm text-blue-600">
            Progress <span>{CalculatePerProgress()}%</span>
          </h2>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
            <div
              className="bg-blue-600 h-2 rounded-full"
              style={{ width: `${CalculatePerProgress()}%` }}
            ></div>
          </div>
        </div>

        <Link to={`/workspace/view-course/${enrollId}`}>
          <button className="w-full mt-3 flex items-center justify-center gap-2 bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700">
            <PlayCircle className="w-4 h-4" />
            Continue Learning
          </button>
        </Link>
      </div>
    </div>
  );
}

export default EnrollCourseCard;
