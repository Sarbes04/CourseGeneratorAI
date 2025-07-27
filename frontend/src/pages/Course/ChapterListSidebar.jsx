import React, { useState, useContext } from 'react';
import { SelectedChapterIndexContext } from '../../context/SelectedChapterIndexContext';
import { CheckCircle, ChevronDown } from 'lucide-react';

function ChapterListSidebar({ courseInfo }) {
  const course = courseInfo?.course;
  const enrollCourse = courseInfo?.enrollCourse;
  const courseContent = course?.courseContent;

  const { setSelectedChapterIndex } = useContext(SelectedChapterIndexContext);
  const completedChapter = enrollCourse?.completedChapters ?? [];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
    setSelectedChapterIndex(index);
  };

  return (
    <div className="w-80 min-w-[20rem] bg-gray-100 h-screen p-5 overflow-y-auto border-r">
      <h2 className="my-3 font-bold text-xl">
        Chapters ({courseContent?.length || 0})
      </h2>

      {courseContent?.map((chapter, index) => {
        const isOpen = openIndex === index;
        const isCompleted = completedChapter.includes(index);

        return (
          <div
            key={index}
            className={`rounded border mb-2 transition-colors duration-200 ${
              isCompleted ? 'bg-green-50 text-green-800' : 'bg-white'
            }`}
          >
            {/* Chapter Header */}
            <div
              onClick={() => toggleAccordion(index)}
              className="cursor-pointer px-4 py-3 font-medium flex justify-between items-center"
            >
              <span>
                {index + 1}. {chapter?.courseData?.chapterName}
              </span>

              <div className="flex items-center gap-1">
                {isCompleted && <CheckCircle size={18} className="text-green-600" />}
                <ChevronDown
                  size={18}
                  className={`transition-transform duration-300 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </div>
            </div>

            {/* Chapter Topics Accordion */}
            <div
              className={`overflow-hidden transition-all duration-300 ${
                isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              } px-6`}
            >
              {chapter?.courseData?.topics.map((topic, topicIndex) => (
                <div
                  key={topicIndex}
                  className={`p-2 rounded my-1 ${
                    isCompleted ? 'bg-green-100 text-green-800' : 'bg-gray-50'
                  }`}
                >
                  {topic?.topic}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ChapterListSidebar;
