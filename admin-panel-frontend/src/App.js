import React from 'react';
<<<<<<< HEAD
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProductOverview from './pages/ProductOverview';
import ProductAttributes from './pages/ProductAttributes';
import Subscriptions from './pages/Subscriptions';
import ProtectedRoute from './components/ProtectedRoute';
=======
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
>>>>>>> f8c4a87f52c3fe8a95a2f15d4fd4c223c415ec39

function App() {
  return (
    <Router>
      <Routes>
<<<<<<< HEAD
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/products/overview" 
          element={
            <ProtectedRoute>
              <ProductOverview />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/products/attributes" 
          element={
            <ProtectedRoute>
              <ProductAttributes />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="admin/subscriptions" 
          element={
            <ProtectedRoute>
              <Subscriptions />
            </ProtectedRoute>
          } 
        />
        <Route path="*" element={<Navigate to="/login" />} />
=======
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} /> 
>>>>>>> f8c4a87f52c3fe8a95a2f15d4fd4c223c415ec39
      </Routes>
    </Router>
  );
}

export default App;
