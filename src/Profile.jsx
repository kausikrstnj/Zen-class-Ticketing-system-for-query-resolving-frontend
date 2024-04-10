import React from 'react'
import { Link, useNavigate, useLocation, useParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import './EditProfile.css'

function Profile() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState('');
    const { userId } = useParams();
    const isAuthenticated = localStorage.getItem('jwt') ? true : false;
    const role = localStorage.getItem('role');

    useEffect(() => {
        fetchUserData(userId);
    }, [userId]);

    const fetchUserData = async (userId) => {
        try {
            const response = await fetch(`http://localhost:3000/api/users/profile/${userId}`);
            const userData = await response.json();
            setUserData(userData);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };
    const deleteAccount = (userId) => {

        fetch(`http://localhost:3000/api/users/${userId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(response => response.json())
            .then(data => {
                if (data.error) {
                    console.log('Error deleting account');
                } else {
                    console.log('Account deleted successfully');
                    alert('Account has been deleted!');
                    navigate('/users');
                }
            });
    };

    return (
        <div>
            {userData.length === 0 ? (
                <p>Loading user data...</p>

            ) : (
                userData.map(user => (
                    <div id='editProfile'>
                        <div className="form-container">
                            <div className="logo-container">
                                My Profile
                            </div>
                            <div className="line"></div>
                            <form className="form">
                                <div className="form-group">
                                    <label htmlFor="name">Name</label>
                                    <input readOnly name="name" id="name" value={user.name} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input readOnly required name="email" id="email" value={user.email} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="phn">Role</label>
                                    <input readOnly required name="phn" id="phn" value={user.role} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="phn">Phone</label>
                                    <input required readOnly name="phn" id="phn" value={user.phn} />
                                </div>
                                {role === 'mentor' || role === 'student' ? (
                                    <>
                                        <a type="submit" className="form-submit-btn" href={`/user/edit/${userId}`}>Edit Account</a>
                                        <a type="submit" className="form-submit-btn" onClick={() => deleteAccount(user._id)}>Delete Account</a>
                                    </>

                                ) : (
                                    <button type="submit" className="form-submit-btn" onClick={() => deleteAccount(user._id)}>Delete Account</button>
                                )}
                            </form>
                        </div>
                    </div >
                )
                ))
            }
        </div >
    )
}

export default Profile