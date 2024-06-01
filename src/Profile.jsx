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
            const response = await fetch(`https://zenclass-ticketing-system-for-query.onrender.com/api/users/profile/${userId}`);
            const userData = await response.json();
            setUserData(userData);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };
    const deleteAccount = (userId) => {

        fetch(`https://zenclass-ticketing-system-for-query.onrender.com/api/users/${userId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(response => response.json())
            .then(data => {
                if (data.error) {
                    console.log('Error deleting account');
                } else {
                    alert('Account has been deleted!');

                    if (role === 'student' || role === 'mentor') {
                        localStorage.removeItem('jwt');
                        navigate('/signup');
                    } else {
                        navigate('/users');
                    }

                }
            });
    };

    return (
        <div className='container' id='myProfileContainer'>
            {userData.length === 0 ? (
                <div id='myProfile'>
                    <div class="loader"></div>
                </div>

            ) : (
                userData.map(user => (
                    <div id='myProfile'>
                        <div className="form-container">
                            <div className="logo-container">
                                My Profile
                            </div>
                            <div className="line" ></div>
                            <form className="container">
                                <div className="form-group  w-100">
                                    <label htmlFor="name" className='form-label'>Name</label>
                                    <input className='form-control' readOnly name="name" id="name" value={user.name} />
                                </div>
                                <div className="form-group  mt-3 w-100">
                                    <label htmlFor="email" className='form-label'>Email</label>
                                    <input className='form-control' readOnly required name="email" id="email" value={user.email} />
                                </div>
                                <div className="form-group  mt-3 w-100">
                                    <label htmlFor="phn" className='form-label'>Role</label>
                                    <input className='form-control' readOnly required name="phn" id="phn" value={user.role} />
                                </div>
                                <div className="form-group mt-3 w-100">
                                    <label htmlFor="phn" className='form-label'>Phone</label>
                                    <input className='form-control' required readOnly name="phn" id="phn" value={user.phn} />
                                </div>
                                {role === 'mentor' || role === 'student' ? (
                                    <>
                                        <Link type="submit" className="form-submit-btn text-decoration-none  mt-4" to={`/user/edit/${userId}`}>Edit Account</Link>
                                        <button type="submit" className="form-submit-btn  mt-4" onClick={() => deleteAccount(user._id)}>Delete Account</button>
                                    </>

                                ) : (
                                    <button type="submit" className="form-submit-btn" onClick={() => deleteAccount(user._id)}>Delete Account</button>
                                )}
                            </form>
                        </div>
                    </div>
                )
                ))
            }
        </div >
    )
}

export default Profile