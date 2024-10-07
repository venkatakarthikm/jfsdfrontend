import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LessonManager = () => {
    const [lessons, setLessons] = useState([]);
    const [newLesson, setNewLesson] = useState({ title: '', content: '' });

    useEffect(() => {
        const fetchLessons = async () => {
            const response = await axios.get('http://localhost:8080/admin/lessons');
            setLessons(response.data);
        };
        fetchLessons();
    }, []);

    const handleAddLesson = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:8080/admin/lessons', { ...newLesson, dateCreated: new Date() });
        setNewLesson({ title: '', content: '' });
        // Refresh lessons
        const response = await axios.get('http://localhost:8080/admin/lessons');
        setLessons(response.data);
    };

    return (
        <div>
            <h2>Manage Lessons</h2>
            <form onSubmit={handleAddLesson}>
                <input type="text" value={newLesson.title} onChange={(e) => setNewLesson({ ...newLesson, title: e.target.value })} placeholder="Lesson Title" required />
                <textarea value={newLesson.content} onChange={(e) => setNewLesson({ ...newLesson, content: e.target.value })} placeholder="Lesson Content" required />
                <button type="submit">Add Lesson</button>
            </form>
            <ul>
                {lessons.map((lesson) => (
                    <li key={lesson.lessonId}>{lesson.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default LessonManager;
