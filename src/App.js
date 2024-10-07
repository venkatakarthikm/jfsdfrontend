import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import UserDashboard from './components/UserDashboard';
import AdminDashboard from './components/AdminDashboard';
import Signup from './components/Signup';
import Login from './components/Login';
import Navbar from './components/Navbar'; // Import Navbar component from a separate file
import Home from './components/Home'; // Import Home component
import './App.css'; // Import your CSS styles

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Load user from localStorage on initial render if available
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setCurrentUser(storedUser);
    }
  }, []);

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('user');
  };

  return (
    <Router>
      <div className="app-container">
        <h1 className="main-title">Sustainable Development Education</h1>
        <Navbar currentUser={currentUser} handleLogout={handleLogout} />
        <Routes>
          {/* Public Routes */}
          <Route
            path="/login"
            element={
              currentUser ? (
                <Navigate to={currentUser.role === 'ADMIN' ? '/admindashboard' : '/userdashboard'} />
              ) : (
                <Login setCurrentUser={setCurrentUser} />
              )
            }
          />
          <Route path="/signup" element={<Signup />} />

          {/* Admin Route */}
          <Route
            path="/admindashboard"
            element={<AdminDashboard />}
          />

          {/* User Route */}
          <Route
            path="/userdashboard"
            element={
              <UserDashboard currentUser={currentUser} />}
          />

          {/* Other Routes accessible from Dashboard */}
          <Route path="/home" element={<Home />} />
          <Route path="/lessons" element={<UserDashboard currentUser={currentUser} />} /> {/* Can reuse UserDashboard */}
          <Route path="/projects" element={<div>Projects Page</div>} /> {/* Placeholder for Projects page */}
          <Route path="/profile" element={<div>Profile Page</div>} /> {/* Placeholder for Profile page */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
