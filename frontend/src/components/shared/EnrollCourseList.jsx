import React, { useEffect, useState } from "react";
import axios from "../../config/axiosConfig";
import EnrolledCourseCard from "../../components/shared/EnrollCourseCard";

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
      const result = await axios.get("/api/enroll"); // ✅ Token automatically attached
      setEnrolledCourseList(result.data);
    } catch (error) {
      console.error("Error fetching enrolled courses:", error);
      setError("Failed to load enrolled courses.");
    } finally {
      setLoading(false);
    }
  };
  console.log(enrolledCourseList,"enrolledCourseList");
  if (loading) {
    return <p className="text-center mt-4">Loading enrolled courses...</p>;
  }

  if (error) {
    return <p className="text-red-500 text-center mt-4">{error}</p>;
  }

  if (!enrolledCourseList || enrolledCourseList.length === 0) {
    return null; // ✅ Nothing to show
  }
  console.log(enrolledCourseList);

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
