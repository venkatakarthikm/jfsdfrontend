import React from 'react';

// Sample URLs for Coursera sustainable development courses
const courses = [
    "https://www.coursera.org/learn/sustainable-development",
    "https://www.coursera.org/learn/global-sustainability",
    "https://www.coursera.org/learn/green-business-strategy",
    "https://www.coursera.org/learn/sustainability-climate-change",
    "https://www.coursera.org/learn/environmental-sustainability",
    "https://www.coursera.org/learn/sustainable-cities",
];

const Navbar = () => {
    // Function to redirect to a random Coursera course
    const redirectToRandomCourse = () => {
        const randomIndex = Math.floor(Math.random() * courses.length);
        window.location.href = courses[randomIndex];
    };

    // CSS Styles defined as JavaScript objects
    const navbarStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#4caf50',
        padding: '10px 20px',
        color: 'white',
        fontFamily: 'Arial, sans-serif',
    };

    const logoStyle = {
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#ffffff',
        textDecoration: 'none',
    };

    const linksStyle = {
        listStyle: 'none',
        display: 'flex',
        gap: '15px',
    };

    const linkStyle = {
        color: '#ffffff',
        textDecoration: 'none',
        fontSize: '16px',
    };

    const buttonStyle = {
        backgroundColor: '#ffffff',
        color: '#4caf50',
        border: 'none',
        borderRadius: '5px',
        padding: '8px 12px',
        cursor: 'pointer',
        fontSize: '16px',
        transition: 'background-color 0.3s, color 0.3s',
    };

    const buttonHoverStyle = {
        backgroundColor: '#45a049',
        color: '#ffffff',
    };

    return (
        <nav style={navbarStyle}>
            <h1 style={logoStyle}>Sustainable Learning Platform</h1>
            <ul style={linksStyle}>
                <li><a href="/login" style={linkStyle}>Login</a></li>
                <li><a href="/signup" style={linkStyle}>Register</a></li>
                <li><a href="/contact" style={linkStyle}>Contact</a></li>
                <li>
                    <button
                        onClick={redirectToRandomCourse}
                        style={buttonStyle}
                        onMouseOver={(e) => e.target.style = buttonHoverStyle}
                        onMouseOut={(e) => e.target.style = buttonStyle}
                    >
                        Random SDG Course
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;

