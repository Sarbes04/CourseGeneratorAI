import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserDetailContext } from "../../context/UserDetailContext";

function AppHeader({ hideSidebar = false }) {
  const { user, setUser } = useContext(UserDetailContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/sign-in");
  };

  return (
    <header className="p-4 flex justify-between items-center shadow-sm bg-white">
      {/* Left Side - App Name or SidebarTrigger */}
      <div className="flex items-center gap-4">
        {!hideSidebar && (
          <button
            onClick={() => alert("Sidebar logic here!")}
            className="p-2 bg-gray-200 rounded"
          >
            ☰
          </button>
        )}
        <Link to="/" className="text-lg font-bold text-blue-600">
          MyLearningApp
        </Link>
      </div>

      {/* Right Side - Conditional Navigation */}
      <nav className="flex gap-4 items-center">
        {user ? (
          <>
            <Link to="/profile" className="hover:underline">
              Profile
            </Link>
            <Link to="/workspace" className="hover:underline">
              Dashboard
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/sign-in" className="hover:underline">
              Sign In
            </Link>
            <Link to="/sign-up" className="hover:underline">
              Sign Up
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default AppHeader;
