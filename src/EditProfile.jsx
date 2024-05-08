import React from 'react'
import { Link, useNavigate, useLocation, useParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import './EditProfile.css'

function EditProfile() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState('');
    const { userId } = useParams();

    const editAccount = async (userId) => {
        event.preventDefault();
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const phoneInput = document.getElementById('phn');
        if (nameInput.value === '' || emailInput.value === '' || phoneInput.value === '') {
            alert('Please fill in all fields.');
            return;
        }
        document.getElementById('loader').style.display = 'block';
        // Data to be sent in the request
        const data = {
            name: nameInput.value,
            email: emailInput.value,
            phn: phoneInput.value,
        };
        fetch(`https://zenclass-ticketing-system-for-query.onrender.com/api/users/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then(response => response.json())
            .then(data => {
                document.getElementById('loader').style.display = 'none';
                if (data.error) {
                    console.log('Error editing account');
                } else {
                    alert('Profile successfully updated! Please login again to continue.');
                    navigate('/IntroPage');
                }
            });
    };

    return (
        <div id='editProfile'>

            <div className="form-container">
                <div className="logo-container">
                    Edit your profile
                </div>
                <div className="line"></div>
                <form className="form">
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input required placeholder="Enter your name" name="name" id="name" type="text" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input required placeholder="Enter your email" name="email" id="email" type="text" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phn">Phone</label>
                        <input required name="phn" placeholder="Enter phone" id="phn" type="text" maxLength={10} />
                    </div>

                    <button type="submit" className="form-submit-btn" onClick={() => editAccount(userId)}>Save changes</button>
                </form>
            </div>
        </div >
    )
}

export default EditProfile