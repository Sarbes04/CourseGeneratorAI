import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";
import { Loader2Icon, Sparkle } from "lucide-react";

function AddNewCourseDialog({ children }) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false); // ✅ For dialog toggle
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
      const result = await axios.post("/api/generate-course-layout", {
        ...formData,
        courseId: courseId,
      });

      if (result.data.resp === "limit exceed") {
        toast.warning("Please subscribe to plan!");
        navigate("/workspace/billing");
        return;
      }

      toast.success("Course Generated!");
      navigate("/workspace/edit-course/" + result.data?.courseId);
    } catch (e) {
      toast.error("Something went wrong!");
      console.error(e);
    } finally {
      setLoading(false);
      setOpen(false); // ✅ Close modal after generate
    }
  };

  return (
    <>
      {/* ✅ Trigger Button */}
      <div onClick={() => setOpen(true)}>{children}</div>

      {/* ✅ Custom Modal */}
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
            <h2 className="text-xl font-bold mb-4">
              Create New Course Using AI
            </h2>

            <div className="flex flex-col gap-3">
              <div>
                <label className="text-sm font-medium">Course Name</label>
                <input
                  type="text"
                  className="w-full border rounded p-2"
                  placeholder="Course Name"
                  onChange={(e) =>
                    onHandleInputChange("name", e.target.value)
                  }
                />
              </div>

              <div>
                <label className="text-sm font-medium">
                  Course Description (optional)
                </label>
                <textarea
                  className="w-full border rounded p-2"
                  placeholder="Course Description"
                  onChange={(e) =>
                    onHandleInputChange("description", e.target.value)
                  }
                />
              </div>

              <div>
                <label className="text-sm font-medium">No. of Chapters</label>
                <input
                  type="number"
                  className="w-full border rounded p-2"
                  placeholder="No of chapters"
                  onChange={(e) =>
                    onHandleInputChange("noOfChapters", e.target.value)
                  }
                />
              </div>

              <div className="flex gap-2 items-center">
                <label className="text-sm font-medium">Include Video</label>
                <input
                  type="checkbox"
                  checked={formData.includeVideo}
                  onChange={() =>
                    onHandleInputChange(
                      "includeVideo",
                      !formData.includeVideo
                    )
                  }
                />
              </div>

              <div>
                <label className="text-sm font-medium">Difficulty Level</label>
                <select
                  className="w-full border rounded p-2"
                  onChange={(e) =>
                    onHandleInputChange("level", e.target.value)
                  }
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
                  onChange={(e) =>
                    onHandleInputChange("category", e.target.value)
                  }
                />
              </div>

              <div className="flex gap-3 mt-5">
                <button
                  className="flex-1 bg-gray-300 py-2 rounded hover:bg-gray-400"
                  onClick={() => setOpen(false)}
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 flex items-center justify-center gap-2"
                  onClick={onGenerate}
                  disabled={loading}
                >
                  {loading ? (
                    <Loader2Icon className="animate-spin" />
                  ) : (
                    <Sparkle />
                  )}
                  Generate
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AddNewCourseDialog;
