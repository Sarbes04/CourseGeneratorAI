import React, { useContext } from "react";
import WelcomeBanner from "../../components/shared/WelcomeBanner";
import EnrollCourseList from "../../components/shared/EnrollCourseList";
import CourseList from "../../components/shared/CourseList";
import { UserDetailContext } from "../../context/UserDetailContext";
import { Link } from "react-router-dom";





function HomePage() {
const { user } = useContext(UserDetailContext);

  return (
    <div className="p-5 space-y-6">
      {/* Always visible */}
      <WelcomeBanner />

      {user ? (
        <>
          {/* Show only if logged in */}
          <EnrollCourseList />
          <CourseList />
        </>
      ) : (
        <div className="p-5 text-center bg-yellow-100 border border-yellow-300 rounded">
          <h2 className="font-bold text-lg">Please log in to see courses!</h2>
          <p className="text-sm text-gray-700">
            Go to <Link to="/sign-in" className="text-blue-600 underline">Sign In</Link> to start learning.
          </p>
        </div>
      )}
    </div>
  );
}

export default HomePage;
