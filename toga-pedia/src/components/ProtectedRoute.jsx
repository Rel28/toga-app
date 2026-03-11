import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
    const isLoggedIn = localStorage.getItem('adminLoggedIn') === 'true';
    if (!isLoggedIn) {
    return <Navigate to="/admin/login" />;
  }
  return isLoggedIn ? children : <Navigate to="/admin/login" />;
}

export default ProtectedRoute