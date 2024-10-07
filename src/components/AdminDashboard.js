import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
    return (
        <div className="admin-dashboard">
            <h2>Admin Dashboard</h2>
            <Link to="/admin/lessons">Manage Lessons</Link>
            <Link to="/admin/resources">Manage Resources</Link>
        </div>
    );
};

export default AdminDashboard;
