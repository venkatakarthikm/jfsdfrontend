import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const VideoPlayer = () => {
    const { id } = useParams();
    const videoUrl = `http://localhost:8080/videos/${id}`; // Update to your video endpoint

    useEffect(() => {
        // Track video access
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            axios.post(`http://localhost:8080/track-video`, { userId: user.user_id, videoId: id });
        }
    }, [id]);

    return (
        <div className="video-player">
            <h2>Video Title</h2>
            <video controls autoPlay>
                <source src={videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    );
};

export default VideoPlayer;
