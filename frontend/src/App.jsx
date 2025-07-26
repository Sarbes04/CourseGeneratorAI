import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { UserDetailContext } from "./context/UserDetailContext";

// Components
import AppHeader from "./components/shared/AppHeader";

// Pages
import HomePage from "./pages/Home/HomePage";
import SignInPage from "./pages/Auth/SignInPage";
import SignUpPage from "./pages/Auth/SignUpPage";
import ViewCoursePage from "./pages/Course/ViewCoursePage";
import EditCoursePage from "./pages/Course/EditCoursePage";
import MyLearningPage from "./pages/Course/MyLearningPage";
import ExplorePage from "./pages/Explore/ExplorePage";
import ProfilePage from "./pages/Profile/ProfilePage";
import BillingPage from "./pages/Billing/BillingPage";
import WorkspacePage from "./pages/Workspace/WorkspacePage";
import View from "./pages/Course/View";

function App() {
  const { user } = useContext(UserDetailContext);

  // ✅ Redirect non-logged-in users from protected pages
  const ProtectedRoute = ({ children }) => {
    if (!user) {
      return <Navigate to="/sign-in" replace />;
    }
    return children;
  };

  // ✅ Redirect logged-in users away from sign-in/up
  const PublicOnlyRoute = ({ children }) => {
    if (user) {
      return <Navigate to="/" replace />;
    }
    return children;
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Show AppHeader only when user is logged in */}
      {user && <AppHeader />}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route
          path="/sign-in"
          element={
            <PublicOnlyRoute>
              <SignInPage />
            </PublicOnlyRoute>
          }
        />
        <Route
          path="/sign-up"
          element={
            <PublicOnlyRoute>
              <SignUpPage />
            </PublicOnlyRoute>
          }
        />

        {/* Protected Course Routes */}
        <Route
          path="/course/:id"
          element={
            <ProtectedRoute>
              <ViewCoursePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/course/:id/edit"
          element={
            <ProtectedRoute>
              <EditCoursePage />
            </ProtectedRoute>
          }
        />

        {/* Workspace and Sidebar Pages */}
        <Route
          path="/workspace"
          element={
            <ProtectedRoute>
              <WorkspacePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/workspace/edit-course/:id"
          element={
            <ProtectedRoute>
              <EditCoursePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/workspace/view-course/:id"
          element={
            <ProtectedRoute>
              <ViewCoursePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/workspace/view/:id"
          element={
            <ProtectedRoute>
              <View />
            </ProtectedRoute>
          }
        />
        <Route
          path="/workspace/my-learning"
          element={
            <ProtectedRoute>
              <MyLearningPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/workspace/explore"
          element={
            <ProtectedRoute>
              <ExplorePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/workspace/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/workspace/billing"
          element={
            <ProtectedRoute>
              <BillingPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
