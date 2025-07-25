import React, { useEffect, useState, useContext } from "react";
import axios from "../../config/axiosConfig"; // ✅ Use configured axios
import EnrolledCourseCard from "../../components/shared/EnrollCourseCard";
import { UserDetailContext } from "../../context/UserDetailContext";

function EnrollCourseList() {
  const [enrolledCourseList, setEnrolledCourseList] = useState([]);
  const { user } = useContext(UserDetailContext);

  useEffect(() => {
    if (user) {
      GetEnrolledCourse();
    }
  }, [user]);

  const GetEnrolledCourse = async () => {
    try {
      const result = await axios.get("/api/enroll-course", {
        params: { userId: user._id }, // ✅ userId automatically sent
      });
      setEnrolledCourseList(result.data);
    } catch (error) {
      console.error("Error fetching enrolled courses:", error);
    }
  };

  if (!enrolledCourseList || enrolledCourseList.length === 0) {
    return null; // ✅ Don't render if no courses
  }

  return (
    <div className="mt-3">
      <h2 className="font-bold text-xl">Continue Learning your courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5 mt-4">
        {enrolledCourseList.map((course) => (
          <EnrolledCourseCard
            enrollCourse={course?.enrollCourse}
            course={course?.courses}
            key={course?._id || course?.courses?._id} // ✅ Better unique key
          />
        ))}
      </div>
    </div>
  );
}

export default EnrollCourseList;
