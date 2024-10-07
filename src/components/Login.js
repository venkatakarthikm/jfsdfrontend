import React, { useState } from 'react';
import axios from 'axios';
import './Login.css'; // Assuming you have the provided CSS for styling
import UserDashboard from './UserDashboard';

const Login = ({ setCurrentUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/auth/login', { email, password });
      
      // Check if the response contains a success message
      if (response.data.startsWith("Login successful")) {
        // Extract user details from the response
        const userInfo = response.data.split("! Welcome, ")[1]; // Get everything after "Welcome, "
        const userParts = userInfo.split(" "); // Split by space
  
        // Adjust this if your response format changes
        const userName = userParts[0]; // Assuming name is first
        const userEmail = userParts[1]; // Assuming email is second
        const userRole = userParts[2]; // Assuming role is third
  
        // Create user object
        const user = {
          name: userName,
          email: userEmail,
          role: userRole,
        };
  
        // Store user details in local storage and update state
        localStorage.setItem('user', JSON.stringify(user));
        setCurrentUser(user);
        setUserData(user);
        setUserLoggedIn(true);
      } else {
        setError(response.data || 'Invalid credentials!');
      }
    } catch (error) {
      setError('Login failed. Please check your credentials.');
    }
  };

  if (userLoggedIn) {
    return <UserDashboard />;
  }

  return (
    <div className="login-form-container">
      <form onSubmit={handleLogin}>
        <h3>Login</h3>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        <button type="submit">Login</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default Login;
