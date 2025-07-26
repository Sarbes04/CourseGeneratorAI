import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../config/axiosConfig";
import EnrolledCourseInfo from "./EnrolledCourseInfo";
import ChapterTopicList from "./ChapterTopicList";

function ViewCoursePage() {
  const { id } = useParams(); // ✅ Always "id" now
  const [loading, setLoading] = useState(false);
  const [course, setCourse] = useState(null);

  console.log("✅ Course ID from URL:", id);
  console.log("📦 Current Course State:", course);

  const fetchCourse = async () => {
    if (!id) return; // ✅ safety check
    setLoading(true);
    try {
      const res = await axiosInstance.get(`/api/enroll?courseId=${id}`);
      setCourse(res.data);
    } catch (err) {
      console.error("❌ Error fetching course:", err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCourse();
  }, [id]);
  console.log(course, "enrolledcourse Fetched")
  if (loading) return <div className="p-5 text-center">Loading...</div>;

  if (!course) {
    return <div className="p-5 text-center text-red-500">No course found.</div>;
  }

  return (
    <div>
      <EnrolledCourseInfo course={course} viewCourse={true}/>
      <ChapterTopicList course={course?.course} />
    </div>
  );
}

export default ViewCoursePage;
