import React from "react";
import { Gift } from "lucide-react";

function ChapterTopicList({ course }) {
  const courseLayout = course?.courseJson?.course;

  return (
    <div>
      <h2 className="ml-5 p-5 font-bold text-3xl mt-10">Chapters & Topics</h2>
      <div className="flex flex-col items-center justify-center mt-10">
        {Array.isArray(courseLayout?.chapters) &&
          courseLayout.chapters.map((chapter, chapterIndex) => (
            <div key={chapterIndex} className="flex flex-col items-center mb-10">
              {/* Chapter Card */}
              <div className="p-4 border shadow rounded-xl bg-primary text-black text-center">
                <h2>Chapter {chapterIndex + 1}</h2>
                <h2 className="font-bold text-lg">{chapter.chapterName}</h2>
                <h2 className="text-xs flex justify-between gap-16 mt-2">
                  <span>Duration: {chapter?.duration}</span>
                  <span>No. Of Topics: {chapter?.topics?.length}</span>
                </h2>
              </div>

              {/* Topics List */}
              <div>
                {Array.isArray(chapter?.topics) &&
                  chapter.topics.map((topic, topicIndex) => (
                    <div
                      className="flex flex-col items-center"
                      key={topicIndex}
                    >
                      <div className="h-10 bg-gray-300 w-1"></div>

                      <div className="flex items-center gap-5">
                        <span
                          className={`${
                            topicIndex % 2 === 0 ? "text-transparent" : ""
                          } max-w-xs`}
                        >
                          {topic}
                        </span>

                        <h2 className="text-center rounded-full bg-gray-300 px-6 text-gray-500 p-4">
                          {topicIndex + 1}
                        </h2>

                        <span
                          className={`${
                            topicIndex % 2 !== 0 ? "text-transparent" : ""
                          } max-w-xs`}
                        >
                          {topic}
                        </span>
                      </div>

                      {/* End Gift Icon */}
                      {topicIndex === chapter.topics.length - 1 && (
                        <>
                          <div className="h-10 bg-gray-300 w-1"></div>
                          <Gift className="rounded-full bg-gray-300 h-14 w-14 text-gray-500 p-4" />
                          <div className="h-10 bg-gray-300 w-1"></div>
                        </>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          ))}

        {/* Finish Box */}
        <div className="p-4 border shadow rounded-xl bg-green-600 text-white mt-5">
          <h2>Finish</h2>
        </div>
      </div>
    </div>
  );
}

export default ChapterTopicList;
