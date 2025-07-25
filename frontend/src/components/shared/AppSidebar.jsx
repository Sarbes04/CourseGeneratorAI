import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  PencilRuler,
  Book,
  Compass,
  Wallet,
  User,
  X,
} from "lucide-react";
import AddNewCourseDialog from "./AddNewCourseDialog.jsx";

const SideBarOptions = [
  { title: "Dashboard", icon: LayoutDashboard, path: "/workspace" },
  { title: "My Learning", icon: Book, path: "/workspace/my-learning" },
  { title: "Explore Courses", icon: Compass, path: "/workspace/explore" },
  { title: "AI Tools", icon: PencilRuler, path: "/workspace/ai-tools" },
  { title: "Billing", icon: Wallet, path: "/workspace/billing" },
  { title: "Profile", icon: User, path: "/workspace/profile" },
];

function AppSidebar({ isOpen, onClose }) {
  const location = useLocation();
  const currentPath = location.pathname;
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-white bg-opacity-40 backdrop-blur-sm z-40"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-screen w-64 bg-white shadow-md flex flex-col z-50 transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="p-4 border-b flex justify-between items-center">
          <img src="/logo.svg" alt="logo" className="w-32" />
          <button
            onClick={onClose}
            className="p-1 rounded bg-gray-100 hover:bg-gray-200"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-4 border-b">
          <button
            onClick={() => setOpenDialog(true)}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Create New Course
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {SideBarOptions.map((item, index) => {
            const Icon = item.icon;
            const isActive = currentPath.includes(item.path);

            return (
              <Link
                key={index}
                to={item.path}
                className={`flex items-center gap-3 p-3 rounded text-gray-700 hover:bg-gray-100 ${
                  isActive ? "text-indigo-600 font-semibold bg-gray-100" : ""
                }`}
                onClick={onClose}
              >
                <Icon size={20} />
                <span className="text-[15px]">{item.title}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* ✅ Global Full-Screen Dialog */}
      <AddNewCourseDialog
        isOpen={openDialog}
        onClose={() => setOpenDialog(false)}
      />
    </>
  );
}

export default AppSidebar;
