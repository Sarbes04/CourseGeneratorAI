import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../config/axiosConfig";
import EnrolledCourseInfo from "./EnrolledCourseInfo";
import ChapterTopicList from "./ChapterTopicList";
import { toast } from "react-hot-toast";

function ViewCoursePage() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [course, setCourse] = useState(null);

  const fetchCourse = async () => {
    if (!id) return;
    setLoading(true);
    try {
      const res = await axiosInstance.get(`/api/enroll?courseId=${id}`);
      setCourse(res.data);
      toast.success("Course data loaded");
    } catch (err) {
      toast.error("Error fetching course");
      console.error("Error fetching course:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourse();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <span className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!course) {
    return <div className="p-5 text-center text-red-500">No course found.</div>;
  }

  return (
    <div className="p-5">
      <EnrolledCourseInfo course={course} viewCourse />
      <ChapterTopicList course={course?.course} />
    </div>
  );
}

export default ViewCoursePage;
