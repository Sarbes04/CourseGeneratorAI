const Course = require("../models/Course");
const axios = require("axios");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const PROMPT = `Genrate Learning Course depends on following details. In which Make sure to add Course Name, Description, Course Banner Image Prompt (Create a modern, flat-style 2D digital illustration representing user Topic. Include UI/UX elements such as mockup screens, text blocks, icons, buttons, and creative workspace tools. Add symbolic elements related to user Course, like sticky notes, design components, and visual aids. Use a vibrant color palette (blues, purples, oranges) with a clean, professional look. The illustration should feel creative, tech-savvy, and educational, ideal for visualizing concepts in user Course) for Course Banner in 3d format Chapter Name, Topic under each chapters, Duration for each chapters etc, in JSON format only.

Schema:
{
  "course": {
    "name": "string",
    "description": "string",
    "category": "string",
    "level": "string",
    "includeVideo": "boolean",
    "noOfChapters": "number",
    "bannerImagePrompt": "string",
    "chapters": [
      {
        "chapterName": "string",
        "duration": "string",
        "topics": ["string"]
      }
    ]
  }
}

, User Input:
`;

exports.generateCourseLayout = async (req, res) => {
  try {
    const { courseId, ...formData } = req.body;
    const userId = req.user.id; // From JWT auth

    // ✅ Check free-plan course creation limit (1 course max for non-premium)
    const userCourses = await Course.find({ user: userId });
    if (!req.user.isPremium && userCourses.length >= 1) {
      return res.status(403).json({ resp: "limit exceed" });
    }

    // ✅ Call Gemini to generate course layout
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(PROMPT + JSON.stringify(formData));
    const raw = result?.response?.text();

    const RawJson = raw.replace("```json", "").replace("```", "").trim();
    const JSONResp = JSON.parse(RawJson);

    const imagePrompt = JSONResp.course?.bannerImagePrompt;

    // ✅ Generate banner image
    const bannerImageUrl = await generateImage(imagePrompt);

    // ✅ Save to DB
    const newCourse = await Course.create({
      ...formData,
      courseJson: JSONResp,
      user: userId,
      cid: courseId,
      bannerImageUrl,
    });

    res.status(201).json({ courseId: newCourse.cid });
  } catch (error) {
    console.error("❌ Error generating course layout:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Helper - Generate Banner Image using Aigurulab API
const generateImage = async (imagePrompt) => {
  try {
    const BASE_URL = "https://aigurulab.tech";
    const response = await axios.post(
      `${BASE_URL}/api/generate-image`,
      {
        width: 1024,
        height: 1024,
        input: imagePrompt,
        model: "flux",
        aspectRatio: "16:9",
      },
      {
        headers: {
          "x-api-key": process.env.AI_GURU_LAB_API,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.image; // Base64 Image
  } catch (err) {
    console.error("❌ Error generating image:", err);
    return "";
  }
};
