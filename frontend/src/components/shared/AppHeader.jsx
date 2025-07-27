// AppHeader.js
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserDetailContext } from "../../context/UserDetailContext";
import AppSidebar from "./AppSidebar";
import { toast } from "react-hot-toast";

function AppHeader({ hideSidebar = false }) {
  const { user, setUser } = useContext(UserDetailContext);
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser(null);
      toast.success("Logged out successfully");
      navigate("/sign-in");
    } catch (error) {
      toast.error("Logout failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <header className="p-4 flex justify-between items-center shadow-sm bg-white relative">
        <div className="flex items-center gap-4">
          {!hideSidebar && (
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 bg-gray-200 rounded"
            >
              ☰
            </button>
          )}
          <Link to={'/'}><img src="/Logo.png" alt="logo" className="w-10" /></Link>
          <Link to="/" className="text-lg font-bold text-blue-600">
            MyLearningApp
          </Link>
        </div>

        <nav className="flex gap-4 items-center">
          {user ? (
            <>
              <Link to="/workspace/profile" className="hover:underline">
                Profile
              </Link>
              <Link to="/workspace" className="hover:underline">
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                disabled={loading}
                className={`px-3 py-1 rounded text-white transition ${
                  loading
                    ? "bg-red-400 cursor-not-allowed"
                    : "bg-red-500 hover:bg-red-600"
                }`}
              >
                {loading ? (
                  <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  "Logout"
                )}
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

      <AppSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  );
}

export default AppHeader;
