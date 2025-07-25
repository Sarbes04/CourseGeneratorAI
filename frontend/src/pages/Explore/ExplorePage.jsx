import React, { useState, useEffect, useContext } from "react";
import axios from "../../config/axiosConfig"; // ✅ Using your axios setup
import { Search } from "lucide-react";
import { UserDetailContext } from "../../context/UserDetailContext";
import CourseCard from "../../components/shared/CourseCard";

function ExplorePage() {
  const [courseList, setCourseList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const { user } = useContext(UserDetailContext);

  useEffect(() => {
    if (user) {
      GetCourseList();
    }
  }, [user]);

  const GetCourseList = async () => {
    setLoading(true);
    try {
      const result = await axios.get("/api/courses?courseId=0");
      setCourseList(result.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Filter courses by search term
  const filteredCourses = courseList.filter((course) =>
    course.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="mt-10 p-4">
      <h2 className="font-bold text-3xl mb-6">Explore More Courses</h2>

      {/* ✅ Search Bar */}
      <div className="flex gap-2 max-w-md">
        <input
          type="text"
          placeholder="Search"
          className="flex-1 border rounded p-2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          onClick={GetCourseList}
          className="flex items-center gap-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          <Search size={18} /> Search
        </button>
      </div>

      {/* ✅ Course List */}
      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5">
        {loading
          ? [0, 1, 2, 3].map((index) => (
              <div
                key={index}
                className="w-full h-[240px] bg-gray-200 animate-pulse rounded"
              />
            ))
          : filteredCourses.map((course) => (
              <CourseCard course={course} key={course?._id} />
            ))}
      </div>
    </div>
  );
}

export default ExplorePage;
