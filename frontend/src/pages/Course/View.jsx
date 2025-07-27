import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../../config/axiosConfig";
import ChapterListSidebar from "./ChapterListSidebar";
import ChapterContent from "./ChapterContent";
import { toast } from "react-hot-toast";

function View() {
  const { id } = useParams();
  const [courseInfo, setCourseInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    GetEnrolledCourseById();
  }, []);

  const GetEnrolledCourseById = async () => {
    setLoading(true);
    try {
      const result = await axios.get(`/api/enroll?courseId=${id}`);
      setCourseInfo(result.data);
      toast.success("Course content loaded");
    } catch (error) {
      toast.error("Failed to fetch course content");
      console.error("Error fetching enrolled course:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <span className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
  <div className="flex h-screen overflow-hidden">
    {courseInfo && (
      <>
        <ChapterListSidebar courseInfo={courseInfo} />
        <div className="flex-1 min-w-0 overflow-y-auto">
          <ChapterContent courseInfo={courseInfo} refreshData={GetEnrolledCourseById} />
        </div>
      </>
    )}
  </div>
);
}

export default View;
