import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const UserDashboard = ({ currentUser }) => {
  const [lessons, setLessons] = useState([]);
  const navigate = useNavigate(); // Hook to navigate between routes

  useEffect(() => {
    const fetchLessons = async () => {
      const response = await axios.get('http://localhost:8080/admin/lessons');
      setLessons(response.data);
    };
    fetchLessons();
  }, []);

  // Inline styles
  const styles = {
    dashboard: {
      padding: '20px',
      maxWidth: '800px',
      margin: '0 auto',
      fontFamily: 'Arial, sans-serif',
    },
    header: {
      color: '#2c3e50',
      marginBottom: '20px',
    },
    nav: {
      marginBottom: '20px',
    },
    navLinks: {
      listStyleType: 'none',
      padding: 0,
      display: 'flex',
      gap: '15px',
    },
    navLinkItem: {
      textDecoration: 'none',
      color: '#3498db',
      fontWeight: 'bold',
    },
    lessonsList: {
      listStyleType: 'none',
      padding: 0,
    },
    lessonItem: {
      marginBottom: '10px',
    },
    lessonLink: {
      marginLeft: '10px',
      textDecoration: 'none',
      color: '#2980b9',
    },
    logoutButton: {
      marginTop: '20px',
      padding: '10px 15px',
      backgroundColor: '#e74c3c',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '16px',
    },
  };

  const handleLogout = () => {
    localStorage.removeItem('user'); // Remove the token from local storage
    navigate('/login'); // Redirect to login page (or another page)
  };

  return (
    <div style={styles.dashboard}>
      <h2 style={styles.header}>Welcome, {currentUser?.email}</h2>
      <nav style={styles.nav}>
        <ul style={styles.navLinks}>
          <li><Link to="/home" style={styles.navLinkItem}>Home</Link></li>
          <li><Link to="/lessons" style={styles.navLinkItem}>Lessons</Link></li>
          <li><Link to="/projects" style={styles.navLinkItem}>Projects</Link></li>
          <li><Link to="/profile" style={styles.navLinkItem}>Profile</Link></li>
        </ul>
      </nav>
      <p>Your progress on lessons and projects will be displayed here.</p>
      <h3 style={styles.header}>Available Lessons</h3>
      <ul style={styles.lessonsList}>
        {lessons.map((lesson) => (
          <li key={lesson.lessonId} style={styles.lessonItem}>
            {lesson.title}
            <Link to={`/lessons/${lesson.lessonId}`} style={styles.lessonLink}>View Lesson</Link>
          </li>
        ))}
      </ul>
      <button style={styles.logoutButton} onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default UserDashboard;
