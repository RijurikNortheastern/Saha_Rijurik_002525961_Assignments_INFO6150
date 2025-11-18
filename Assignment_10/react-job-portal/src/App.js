import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { store } from './store/store';

import Login from './components/Auth/Login';
import Layout from './components/Layout/Layout';
import ProtectedRoute from './components/Common/ProtectedRoute';

import Home from './pages/Home';
import About from './pages/About';
import CompanyShowcase from './pages/CompanyShowcase';
import Contact from './pages/Contact';

import AdminDashboard from './pages/admin/AdminDashboard';
import EmployeesPage from './pages/admin/EmployeesPage';
import AddJobPage from './pages/admin/AddJobPage';

import EmployeeDashboard from './pages/employee/EmployeeDashboard';
import EmployeeJobsPage from './pages/employee/EmployeeJobsPage';
import EmployeeProfile from './pages/employee/EmployeeProfile';

import JobListings from './pages/JobListings';

const theme = createTheme({
  palette: {
    primary: {
      main: '#667eea',
    },
    secondary: {
      main: '#764ba2',
    },
  },
});

function App() {
  // Clear session on app start (remove this in production)
  React.useEffect(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }, []);

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              }
            >
              <Route index element={<RoleBasedRedirect />} />
              
              <Route 
                path="admin" 
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <AdminDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="admin/employees" 
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <EmployeesPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="admin/add-job" 
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <AddJobPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="admin/jobs" 
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <EmployeeJobsPage />
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="employee" 
                element={
                  <ProtectedRoute allowedRoles={['employee']}>
                    <EmployeeDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="employee/jobs" 
                element={
                  <ProtectedRoute allowedRoles={['employee']}>
                    <EmployeeJobsPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="employee/profile" 
                element={
                  <ProtectedRoute allowedRoles={['employee']}>
                    <EmployeeProfile />
                  </ProtectedRoute>
                } 
              />
              
              <Route path="home" element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="companies" element={<CompanyShowcase />} />
              <Route path="contact" element={<Contact />} />
              <Route path="jobs" element={<JobListings />} />
            </Route>
            
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

function RoleBasedRedirect() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  
  if (user.type === 'admin') {
    return <Navigate to="/admin" replace />;
  } else if (user.type === 'employee') {
    return <Navigate to="/employee" replace />;
  } else {
    return <Navigate to="/home" replace />;
  }
}

export default App;