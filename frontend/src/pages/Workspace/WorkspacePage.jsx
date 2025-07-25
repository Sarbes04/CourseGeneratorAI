import React from "react";
import WelcomeBanner from "../../components/shared/WelcomeBanner";
import EnrollCourseList from "../../components/shared/EnrollCourseList";
import CourseList from "../../components/shared/CourseList";

function WorkspacePage() {
  return (
    <div className="p-4 space-y-6">
      <WelcomeBanner />
      <EnrollCourseList />
      <CourseList />
    </div>
  );
}

export default WorkspacePage;
