import React from 'react'
import { Link, useNavigate, useLocation, useParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import './EditProfile.css'
import "bootstrap/dist/css/bootstrap.min.css";

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
                <form className="container">
                    <div className="form-group mt-3">
                        <label htmlFor="name" className='form-label'>Name</label>
                        <input className='form-control' required placeholder="Enter your name" name="name" id="name" type="text" />
                    </div>
                    <div className="form-group mt-3">
                        <label htmlFor="email" className='form-label'>Email</label>
                        <input className='form-control' required placeholder="Enter your email" name="email" id="email" type="text" />
                    </div>
                    <div className="form-group mt-3">
                        <label htmlFor="phn" className='form-label'>Phone</label>
                        <input className='form-control' required name="phn" placeholder="Enter phone" id="phn" type="text" maxLength={10} />
                    </div>

                    <button type="submit" className="form-submit-btn mt-5" onClick={() => editAccount(userId)}>Save changes</button>
                </form>
            </div>
        </div >
    )
}

export default EditProfile