import React, { useEffect, useState } from "react";
import axios from "../../config/axiosConfig";
import EnrolledCourseCard from "../../components/shared/EnrollCourseCard";
import { toast } from "react-hot-toast";

function EnrollCourseList() {
  const [enrolledCourseList, setEnrolledCourseList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    GetEnrolledCourse();
  }, []);

  const GetEnrolledCourse = async () => {
    setLoading(true);
    setError("");
    try {
      const result = await axios.get("/api/enroll");
      setEnrolledCourseList(result.data);
    } catch (error) {
      console.error("Error fetching enrolled courses:", error);
      toast.error("Failed to load enrolled courses.");
      setError("Failed to load enrolled courses.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center mt-6">
        <span className="w-6 h-6 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></span>
        <span className="ml-2 text-blue-600 font-medium">Loading enrolled courses...</span>
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500 text-center mt-4">{error}</p>;
  }

  if (!enrolledCourseList || enrolledCourseList.length === 0) {
    return null;
  }

  return (
    <div className="mt-3">
      <h2 className="font-bold text-xl">Continue Learning your courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5 mt-4">
        {enrolledCourseList.map((item) => (
          <EnrolledCourseCard
            key={item?.course?.cid || item?.courses?._id}
            enrollId={item?._id}
            enrollCourse={item}
            course={item.course}
          />
        ))}
      </div>
    </div>
  );
}

export default EnrollCourseList;
