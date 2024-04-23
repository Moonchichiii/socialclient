import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useCurrentUser } from './contexts/CurrentUserContext';
import ProtectedRoute from './routes/ProtectedRoute';
import { MutatingDots } from 'react-loader-spinner';

const LoginForm = React.lazy(() => import('./pages/authentication/LoginForm'));
const RegistrationForm = React.lazy(() => import('./pages/authentication/RegistrationForm'));
const Layout = React.lazy(() => import('./pages/layout/LayOut'));
const Dashboard = React.lazy(() => import('./pages/dashboard/DashBoard'));

const App = () => {
  const { currentUser } = useCurrentUser();

  return (
    <Suspense fallback={
      <MutatingDots
        visible={true}
        height="100"
        width="100"
        color="#F9B233"
        secondaryColor="#F9B233"
        radius="12.5"
        ariaLabel="mutating-dots-loading"
        wrapperStyle={{}}
        wrapperClass="d-flex justify-content-center align-items-center h-100"
      />
    }>
      <Routes>
        {currentUser ? (
          <>
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="*" element={<Navigate replace to="/dashboard" />} />
          </>
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
