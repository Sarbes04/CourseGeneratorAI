const axios = require("axios");
const Course = require("../models/Course");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// 🔥 Prompt Template
const PROMPT = `
Depends on Chapter name and Topic Generate content for each topic in HTML 

and give response in JSON format. 

Schema: {

chapterName:<>, 

{ topic:<>, content:<> } 

}

: User Input:
`;

exports.generateCourseContent = async (req, res) => {
  try {
    const { courseJson, courseTitle, courseId } = req.body;

    const promises = courseJson?.chapters?.map(async (chapter) => {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      const result = await model.generateContent(PROMPT + JSON.stringify(chapter));
      const raw = result?.response?.text();

      // Parse Gemini Response
      const RawJson = raw
        .replace(/^```json\s*/i, "")
        .replace(/```$/, "")
        .trim();

      let JSONResp = null;
      try {
        JSONResp = JSON.parse(RawJson);
      } catch (err) {
        console.error("❌ JSON parse error:", err);
        console.error("🚫 Raw content:", RawJson);
      }

      // Get YouTube Videos for the chapter
      const youtubeVideos = await getYouTubeVideos(chapter.chapterName);

      return {
        youtubeVideo: youtubeVideos,
        courseData: JSONResp,
      };
    });

    const CourseContent = await Promise.all(promises);

    // Update course in MongoDB
    await Course.findOneAndUpdate({ cid: courseId }, {
      courseContent: CourseContent,
    });

    res.json({
      courseName: courseTitle,
      CourseContent,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to generate course content" });
  }
};

// 🔍 Get YouTube Videos
const getYouTubeVideos = async (topic) => {
  const params = {
    part: "snippet",
    q: topic,
    maxResults: 4,
    type: "video",
    key: process.env.YOUTUBE_API_KEY,
  };

  const resp = await axios.get("https://www.googleapis.com/youtube/v3/search", { params });
  return resp.data.items.map((item) => ({
    videoId: item.id.videoId,
    title: item.snippet.title,
  }));
};
