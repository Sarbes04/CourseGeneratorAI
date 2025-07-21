import Course from "./../models/Course.js";
import dotenv from "dotenv";
import axios from "axios";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

export const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const PROMPT = `Generate Learning Course based on the following details. Include:
- Course Name, Description, Category, Level
- Course Banner Image Prompt: (Create a modern, flat-style 2D digital illustration representing user topic. Include UI/UX elements such as mockup screens, text blocks, icons, buttons, and creative workspace tools. Add symbolic elements related to user Course, like sticky notes, design components, and visual aids. Use a vibrant color palette (blues, purples, oranges) with a clean, professional look. The illustration should feel creative, tech-savvy, and educational, ideal for visualizing concepts in user Course)
- Number of chapters, each with name, duration, and topics.

Return a JSON object in this schema:

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

User Input:
`;

export const generateCourseLayout = async (req, res) => {
  try {
    const { courseId, ...formData } = req.body;
    const userId = req.user.id;

    const userCourses = await Course.find({ user: userId });

    // Optional limit logic
    // if (!req.user.isPremium && userCourses.length >= 1) {
    //   return res.status(403).json({ resp: "limit exceed" });
    // }

    const model = "gemini-2.5-pro";
    const tools = [{ googleSearch: {} }];
    const config = {
      thinkingConfig: { thinkingBudget: -1 },
      tools,
      responseMimeType: "text/plain",
    };

    const contents = [
      {
        role: "user",
        parts: [
          {
            text: PROMPT + JSON.stringify(formData),
          },
        ],
      },
    ];

    const response = await ai.models.generateContent({
      model,
      config,
      contents,
    });

    const rawText = response?.candidates?.[0]?.content?.parts?.[0]?.text || "";
    const rawJson = rawText.replace("```json", "").replace("```", "").trim();
    const JSONResp = JSON.parse(rawJson);

    const imagePrompt = JSONResp.course?.bannerImagePrompt;
    const bannerImageUrl = await generateImage(imagePrompt);

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
    res.status(500).json({
      message: "Server error",
      error: error.message,
      stack: error.stack,
    });
  }
};

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

    return response.data.image;
  } catch (err) {
    console.error("❌ Error generating image:", err.message);
    return "";
  }
};
