
import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

const LoginForm = React.lazy(() => import('../pages/authentication/LoginForm'));
const RegistrationForm = React.lazy(() => import('../pages/authentication/RegistrationForm'));
const Layout = React.lazy(() => import('../pages/layout/LayOut'));
const Dashboard = React.lazy(() => import('../pages/dashboard/DashBoard'));


const AppRoutes = () => (
  
  <Suspense fallback={<div>Loading...</div>}>
    <Routes>
      <Route 
        path="/" 
        element={
          <ProtectedRoute>
            <Layout>
            <Dashboard />
            </Layout>
          </ProtectedRoute>
        } 
      />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegistrationForm />} />

      <Route path="*" element={<Navigate replace to="/" />} /> 
    </Routes>
  </Suspense>  
);

export default AppRoutes;
