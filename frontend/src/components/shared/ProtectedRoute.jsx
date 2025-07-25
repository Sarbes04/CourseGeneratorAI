import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserDetailContext } from "../../context/UserDetailContext";

function ProtectedRoute({ children }) {
  const { user, loading } = useContext(UserDetailContext);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600 text-lg">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/sign-in" replace />;
  }

  return children;
}

export default ProtectedRoute;
