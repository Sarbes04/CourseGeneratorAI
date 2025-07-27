import React, { useState, useEffect, useContext } from "react";
import axios from "../../config/axiosConfig";
import { Search } from "lucide-react";
import { UserDetailContext } from "../../context/UserDetailContext";
import CourseCard from "../../components/shared/CourseCard";
import { toast } from "react-hot-toast";

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
      toast.success("Courses loaded");
    } catch (error) {
      toast.error("Failed to fetch courses");
    } finally {
      setLoading(false);
    }
  };

  const filteredCourses = courseList.filter((course) =>
    course.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="mt-10 p-4">
      <h2 className="font-bold text-3xl mb-6">Explore More Courses</h2>

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
          disabled={loading}
          className={`flex items-center gap-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 ${
            loading ? "opacity-75 cursor-not-allowed" : ""
          }`}
        >
          {loading ? (
            <svg
              className="animate-spin h-5 w-5 text-white"
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
          ) : (
            <Search size={18} />
          )}
          {loading ? "Loading..." : "Search"}
        </button>
      </div>

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
