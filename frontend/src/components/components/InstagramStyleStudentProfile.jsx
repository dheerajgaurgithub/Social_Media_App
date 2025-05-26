import React from 'react';
import './InstagramStyleStudentProfile.css'; // Importing CSS for styling

const InstagramStyleStudentProfile = ({ student }) => {
    return (
        <div className="instagram-profile">
            <div className="profile-header">
                <img src={student.profilePicture} alt={`${student.name}'s profile`} className="profile-picture" />
                <h2 className="student-name">{student.name}</h2>
                <p className="student-bio">{student.bio}</p>
            </div>
            <div className="profile-posts">
                {student.posts.map((post, index) => (
                    <div key={index} className="post">
                        <img src={post.image} alt={`Post ${index + 1}`} className="post-image" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default InstagramStyleStudentProfile;
