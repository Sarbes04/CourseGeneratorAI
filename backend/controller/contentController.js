import { ai } from "./courseLayoutController.js";
import Course from "./../models/Course.js";
import axios from "axios";

const PROMPT = `
Depends on Chapter name and Topic Generate content for each topic in HTML 

and give response in JSON format. 

Schema:{
  chapterName: <>,
  {
    topic: <>,
    content: <>
  }
}

: User Input:
`;

export const generateCourseContent = async (req, res) => {
  try {
    const {courseJson,courseTitle,courseId}=await req.body;
    console.log(courseJson,courseTitle,courseId)
    const promises = courseJson?.chapters?.map(async(chapter)=>{
        const tools = [
            {
            googleSearch: {
            }
            },
        ];
        const config = {
            thinkingConfig: {
            thinkingBudget: -1,
            },
            tools,
            responseMimeType: 'text/plain',
        };  
        const model = 'gemini-2.5-pro';
        const contents = [
            {
            role: 'user',
            parts: [
                {
                text: PROMPT + JSON.stringify(chapter),
                },
            ],
            },
        ];

        const response = await ai.models.generateContent({
            model,
            config,
            contents,
        });
        //console.log(response.candidates[0].content.parts[0].text);
        const RawResp = response?.candidates[0]?.content?.parts[0]?.text || "";
        const RawJson = RawResp
        .replace(/^```json\s*/i, '')
        .replace(/```$/, '')
        .trim();

        let JSONResp;
        try {
        JSONResp = JSON.parse(RawJson);
        } catch (err) {
        console.error("❌ JSON parse error:", err);
        console.error("🚫 Raw content:", RawJson);
        JSONResp = null;
        }


      const youtubeVideos = await getYouTubeVideos(chapter.chapterName);

      return {
        youtubeVideo: youtubeVideos,
        courseData: JSONResp,
      };
    });

    const CourseContent = await Promise.all(promises);

    await Course.findOneAndUpdate(
      { cid: courseId },
      { courseContent: CourseContent }
    );

    res.json({
      courseName: courseTitle,
      CourseContent,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to generate course content" });
  }
};

const getYouTubeVideos = async (topic) => {
  const params = {
    part: "snippet",
    q: topic,
    maxResults: 4,
    type: "video",
    key: process.env.YOUTUBE_API_KEY,
  };

  try {
    const resp = await axios.get("https://www.googleapis.com/youtube/v3/search", {
      params,
    });

    return resp.data.items.map((item) => ({
      videoId: item.id?.videoId,
      title: item.snippet?.title,
    }));
  } catch (err) {
    console.error("YouTube API Error:", err);
    return [];
  }
};
