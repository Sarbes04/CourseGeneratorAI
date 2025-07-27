import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../config/axiosConfig";
import CourseInfo from "./CourseInfo";
import ChapterTopicList from "./ChapterTopicList";
import { toast } from "react-hot-toast";

function EditCoursePage({ viewCourse = false }) {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [course, setCourse] = useState(null);

  const fetchCourse = async () => {
    console.log("in EditCourePage.jsx",id);
    if (!id) return;
    setLoading(true);
    try {
      const res = await axiosInstance.get(`/api/courses?courseId=${id}`);
      setCourse(res.data);
    } catch (err) {
      toast.error("Error fetching course");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourse();
  }, [id]);

  if (loading)
    return (
      <div className="p-5 text-center text-blue-600 flex justify-center items-center gap-2">
        <svg
          className="animate-spin h-5 w-5 text-blue-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
          ></path>
        </svg>
        Loading course...
      </div>
    );

  if (!course) {
    return <div className="p-5 text-center text-red-500">No course found.</div>;
  }

  return (
    <div>
      <CourseInfo course={course} />
      <ChapterTopicList course={course} />
    </div>
  );
}

export default EditCoursePage;
