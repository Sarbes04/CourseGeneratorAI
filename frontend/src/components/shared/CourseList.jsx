import React, { useEffect, useState, useContext } from "react";
import axios from "../../config/axiosConfig";
import CourseCard from "../../components/shared/CourseCard";
import { UserDetailContext } from "../../context/UserDetailContext";
import AddNewCourseDialog from "../../components/shared/AddNewCourseDialog";
import { toast } from "react-hot-toast";

function CourseList() {
  const [courseList, setCourseList] = useState([]);
  const { user } = useContext(UserDetailContext);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      GetCourseList();
    }
  }, [user]);

  const GetCourseList = async () => {
    setLoading(true);
    try {
      const result = await axios.get("/api/courses", {
        params: { userId: user._id },
      });
      setCourseList(result.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
      toast.error("Failed to load courses");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center mt-8 text-blue-600">
        <span className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mr-2" />
        <span className="font-medium">Loading courses...</span>
      </div>
    );
  }

  return (
    <div className="mt-10">
      <h2 className="font-bold text-xl">Course List</h2>

      {courseList.length === 0 ? (
        <div className="flex p-7 items-center justify-center flex-col border rounded-xl mt-2 bg-gray-100">
          <img
            src="/online-education-platform.png"
            alt="edu"
            className="w-20 h-20"
          />
          <h2 className="my-2 text-xl font-bold">
            Looks like you haven't created any courses yet
          </h2>

          <button
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={() => setOpenDialog(true)}
          >
            + Create your first course
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5 mt-4">
          {courseList.map((course) => (
            <CourseCard course={course} key={course?._id} />
          ))}
        </div>
      )}

      <AddNewCourseDialog
        isOpen={openDialog}
        onClose={() => setOpenDialog(false)}
      />
    </div>
  );
}

export default CourseList;
