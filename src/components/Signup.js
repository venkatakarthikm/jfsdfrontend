import React, { useState } from 'react';
import axios from 'axios';
import './Signup.css'; // Import the CSS file for styling

const Signup = ({ setCurrentUser }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('USER');
    const [error, setError] = useState('');

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/auth/signup', { name, email, password, role });
            if (response.data.includes("successfully")) {
                const user = { email, role };
                localStorage.setItem('user', JSON.stringify(user));
                setCurrentUser(user);
            } else {
                setError(response.data);
            }
        } catch (error) {
            setError('Signup failed. Please try again.');
        }
    };

    return (
        <div className="signup-container">
            <form onSubmit={handleSignup} className="signup-form">
                <h2>Create Your Account</h2>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" required />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email Address" required />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="USER">User</option>
                    <option value="ADMIN">Admin</option>
                </select>
                <button type="submit">Sign Up</button>
                {error && <p className="error-message">{error}</p>}
            </form>
        </div>
    );
};

export default Signup;
