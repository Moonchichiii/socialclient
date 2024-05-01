import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./pages/layout/LayOut";
import { useCurrentUser } from "./contexts/CurrentUserContext";
import ProtectedRoute from "./routes/ProtectedRoute";
import LoadingSpinner from "./components/LoadingSpinner";


// Lazy loaded components
const LoginForm = React.lazy(() => import("./pages/authentication/LoginForm"));
const RegistrationForm = React.lazy(() =>
  import("./pages/authentication/RegistrationForm")
);
const Dashboard = React.lazy(() => import("./pages/dashboard/DashBoard"));

// Sub routes of layout ( rendered in the layout outlet )
const ProfilePage = React.lazy(() => import("./pages/profile/ProfilePage"));
const FeedPage = React.lazy(() => import("./pages/feed/FeedPage"));
const LikedPage = React.lazy(() => import("./pages/Liked/LikedPage"));
const PostPage = React.lazy(() => import("./pages/post/PostPage"));

const App = () => {
  const { currentUser, isLoading } = useCurrentUser();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    
    <Suspense fallback={<LoadingSpinner />}>
  <Routes>
    {currentUser ? (
      <Route path="/" element={<Layout />}>
        <Route index element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="dashboard/profile" element={<ProfilePage />} />
        <Route path="dashboard/feed" element={<FeedPage />} />
        <Route path="dashboard/liked" element={<LikedPage />} />
        <Route path="dashboard/post" element={<PostPage />} />
        <Route path="*" element={<Navigate replace to="/dashboard" />} />
      </Route>
    ) : (
      <> 
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="*" element={<Navigate replace to="/login" />} />      
      </>
    )}
  </Routes>
</Suspense>
  );
};

export default App;
