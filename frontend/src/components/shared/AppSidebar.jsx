import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  PencilRuler,
  Book,
  Compass,
  Wallet,
  User,
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

function AppSidebar() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <aside className="w-64 h-screen bg-white shadow-md flex flex-col">
      {/* ✅ Logo */}
      <div className="p-4 border-b">
        <img src="/logo.svg" alt="logo" className="w-32" />
      </div>

      {/* ✅ Create New Course Button */}
      <div className="p-4 border-b">
        <AddNewCourseDialog>
          <button className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
            Create New Course
          </button>
        </AddNewCourseDialog>
      </div>

      {/* ✅ Sidebar Menu */}
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
            >
              <Icon size={20} />
              <span className="text-[15px]">{item.title}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

export default AppSidebar;
