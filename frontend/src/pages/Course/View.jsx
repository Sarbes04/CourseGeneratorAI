import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../config/axiosConfig'; // Adjust if needed
import ChapterListSidebar from './ChapterListSidebar';
import ChapterContent from './ChapterContent';

function View() {
  const { id } = useParams();

  const [courseInfo, setCourseInfo] = useState(null);
  console.log(id,"in view course route");
  useEffect(() => {
    GetEnrolledCourseById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const GetEnrolledCourseById = async () => {
    try {
      const result = await axios.get(`/api/enroll?courseId=${id}`);
      setCourseInfo(result.data);
    } catch (error) {
      console.error('Error fetching enrolled course:', error);
    }
  };
  console.log(courseInfo,"courseInfo");

  return (
    <div>
{/*       <AppHeader hideSidebar={true} />*/}      
      <div className="flex gap-10">
        {courseInfo && (
          <>
            <ChapterListSidebar courseInfo={courseInfo} />
            <ChapterContent
              courseInfo={courseInfo}
              refreshData={()=>GetEnrolledCourseById()}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default View;
