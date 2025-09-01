import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { Container } from '@mui/material';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Registration from './pages/Registration';
import Login from './pages/Login';
import DashboardLayout from './layouts/DashBoardLayouts';
import Dashboard from './components/Dashboard';
import Registrations from './components/Registrations';
import { useSelector } from 'react-redux';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  return isAuthenticated ? children : <Navigate to="/login" />;
};

// Public Layout Component
const PublicLayout = () => {
  return (
    <>
      <Header />
      <Container maxWidth="lg" sx={{ py: 4, minHeight: 'calc(100vh - 200px)' }}>
        <Outlet />
      </Container>
      <Footer />
    </>
  );
};

function App() {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <div className="app-container">
      <Routes>
        {/* Public Routes with Layout */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path="registration" element={<Registration />} />
          <Route 
            path="login" 
            element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} 
          />
        </Route>
        
        {/* Protected Dashboard Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          {/* Dashboard nested routes */}
          <Route index element={<Dashboard />} />
          <Route path="registrations" element={<Registrations />} />
        </Route>
        
        {/* Catch-all route - redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;