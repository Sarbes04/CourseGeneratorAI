import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../config/axiosConfig";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-hot-toast";
import { Loader2Icon, Sparkle, X } from "lucide-react";

function AddNewCourseDialog({ isOpen, onClose }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    includeVideo: false,
    noOfChapters: 1,
    category: "",
    level: "",
  });

  const navigate = useNavigate();

  const onHandleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const onGenerate = async () => {
    const courseId = uuidv4();
    setLoading(true);
    try {
      const result = await axios.post("/api/generate-course-layout/generate", {
        ...formData,
        courseId,
      });

      if (result.data.resp === "limit exceed") {
        toast("Please subscribe to plan!", { icon: "⚠️" });
        navigate("/workspace/billing");
        return;
      }

      toast.success("Course Generated!");
      setFormData({
        name: "",
        description: "",
        includeVideo: false,
        noOfChapters: 1,
        category: "",
        level: "",
      });

      navigate("/workspace/edit-course/" + result.data?.courseId);
    } catch (e) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-gray-900 bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-[9999]"
      onClick={() => !loading && onClose()}
    >
      <div
        className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => !loading && onClose()}
          className="absolute top-3 right-3 p-1 bg-gray-100 rounded hover:bg-gray-200"
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Sparkle className="text-blue-600" />
          Create New Course Using AI
        </h2>

        <div className="flex flex-col gap-3">
          <div>
            <label className="text-sm font-medium">Course Name</label>
            <input
              type="text"
              className="w-full border rounded p-2"
              placeholder="Course Name"
              value={formData.name}
              onChange={(e) => onHandleInputChange("name", e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-medium">Course Description (optional)</label>
            <textarea
              className="w-full border rounded p-2"
              placeholder="Course Description"
              value={formData.description}
              onChange={(e) => onHandleInputChange("description", e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-medium">No. of Chapters</label>
            <input
              type="number"
              className="w-full border rounded p-2"
              placeholder="No of chapters"
              value={formData.noOfChapters}
              onChange={(e) => onHandleInputChange("noOfChapters", e.target.value)}
            />
          </div>

          <div className="flex gap-2 items-center">
            <label className="text-sm font-medium">Include Video</label>
            <input
              type="checkbox"
              checked={formData.includeVideo}
              onChange={() =>
                onHandleInputChange("includeVideo", !formData.includeVideo)
              }
            />
          </div>

          <div>
            <label className="text-sm font-medium">Difficulty Level</label>
            <select
              className="w-full border rounded p-2"
              value={formData.level}
              onChange={(e) => onHandleInputChange("level", e.target.value)}
            >
              <option value="">Select Level</option>
              <option value="beginner">Beginner</option>
              <option value="moderate">Moderate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium">Category</label>
            <input
              type="text"
              className="w-full border rounded p-2"
              placeholder="Category (Separated by comma)"
              value={formData.category}
              onChange={(e) => onHandleInputChange("category", e.target.value)}
            />
          </div>

          <div className="flex gap-3 mt-5">
            <button
              className="flex-1 bg-gray-300 py-2 rounded hover:bg-gray-400 disabled:opacity-70"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 flex items-center justify-center gap-2 disabled:opacity-70"
              onClick={onGenerate}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2Icon className="animate-spin h-5 w-5" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkle />
                  Generate
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddNewCourseDialog;
