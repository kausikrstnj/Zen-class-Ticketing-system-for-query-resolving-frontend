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
    const [formErrors, setFormErrors] = useState({});

    const editAccount = async (userId) => {
        event.preventDefault();
        const errors = {};
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const phoneInput = document.getElementById('phn');

        if (!nameInput.value) errors.nameInput = "Name is required.";
        if (!emailInput.value) errors.emailInput = "Email is required.";
        if (!phoneInput.value) errors.phoneInput = "Phone is required.";

        console.log('errors.length:', errors.length);

        setFormErrors(errors);

        if (Object.keys(errors).length > 0) {
            return alert('Please fill all the required fields.');
        }

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
                        {formErrors.nameInput && <div className="text-danger">{formErrors.nameInput}</div>}
                    </div>
                    <div className="form-group mt-3">
                        <label htmlFor="email" className='form-label'>Email</label>
                        <input className='form-control' required placeholder="Enter your email" name="email" id="email" type="text" />
                        {formErrors.emailInput && <div className="text-danger">{formErrors.emailInput}</div>}
                    </div>
                    <div className="form-group mt-3">
                        <label htmlFor="phn" className='form-label'>Phone</label>
                        <input className='form-control' required name="phn" placeholder="Enter phone" id="phn" type="text" maxLength={10} />
                        {formErrors.phoneInput && <div className="text-danger">{formErrors.phoneInput}</div>}
                    </div>

                    <button type="submit" className="form-submit-btn mt-5" onClick={() => editAccount(userId)}>Save changes</button>
                </form>
            </div>
        </div >
    )
}

export default EditProfile