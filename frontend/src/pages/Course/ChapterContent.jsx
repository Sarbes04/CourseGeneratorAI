import React, { useContext, useState } from 'react';
import { SelectedChapterIndexContext } from '../../context/SelectedChapterIndexContext';
import YouTube from 'react-youtube';
import { useParams } from 'react-router-dom';
import axios from '../../config/axiosConfig';
import { toast } from 'sonner';

function ChapterContent({ courseInfo, refreshData }) {
  const { id } = useParams();
  const { course} = courseInfo ?? {};
  const courseContent = course?.courseContent ?? [];

  const { selectedChapterIndex } = useContext(SelectedChapterIndexContext);
  const videoData = courseContent?.[selectedChapterIndex]?.youtubeVideo;
  const topics = courseContent?.[selectedChapterIndex]?.courseData?.topics;

  const completedChapters = courseInfo?.completedChapters ?? [];
  const [loading, setLoading] = useState(false);

  let isCompleted = completedChapters.includes(selectedChapterIndex);

  const markChapterCompleted = async () => {
    setLoading(true);
    const updated = [...completedChapters, selectedChapterIndex];
    try {
      await axios.put('/api/enroll', {
        courseId:id,
        completedChapter: updated,
      });
      refreshData();
      toast.success('Chapter marked as completed!');
    } catch (err) {
      toast.error('Failed to update chapter.');
    }
    setLoading(false);
  };

  const markInCompleteChapter = async () => {
    setLoading(true);
    const updated = completedChapters.filter((item) => item !== selectedChapterIndex);
    try {
      await axios.put('/api/enroll', {
        courseId:id,
        completedChapter: updated,
      });
      refreshData();
      toast.success('Chapter marked as incomplete!');
    } catch (err) {
      toast.error('Failed to update chapter.');
    }
    setLoading(false);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">
          {selectedChapterIndex + 1}. {courseContent?.[selectedChapterIndex]?.courseData?.chapterName}
        </h2>
        <button
          disabled={loading}
          onClick={isCompleted ? markInCompleteChapter : markChapterCompleted}
          className={`px-4 py-2 text-sm rounded-md font-medium flex items-center gap-2 transition-all duration-200 ${
            isCompleted
              ? 'border border-gray-500 text-gray-700 hover:bg-gray-200'
              : 'bg-green-600 text-white hover:bg-green-700'
          } ${loading && 'opacity-50 pointer-events-none'}`}
        >
          {loading ? (
            <span className="animate-spin border-2 border-t-transparent border-white rounded-full w-4 h-4" />
          ) : (
            <span>{isCompleted ? '✖' : '✔'}</span>
          )}
          {isCompleted ? 'Mark Incomplete' : 'Mark as Completed'}
        </button>
      </div>

      <h2 className="text-lg font-semibold mb-3">Related Videos 🎥</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {videoData?.slice(0, 2).map((video, index) => (
          <YouTube
            key={index}
            videoId={video?.videoId}
            opts={{
              height: '250',
              width: '100%',
            }}
          />
        ))}
      </div>

      <div className="mt-8 space-y-8">
        {topics?.map((topic, index) => (
          <div key={index} className="p-6 bg-gray-100 rounded-2xl shadow-sm">
            <h3 className="text-xl font-bold text-blue-600 mb-4">
              {index + 1}. {topic?.topic}
            </h3>
            <div
              className="text-base leading-relaxed"
              dangerouslySetInnerHTML={{ __html: topic?.content }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChapterContent;
