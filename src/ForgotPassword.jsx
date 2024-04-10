import React, { useState, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import './EditProfile.css'

function ForgotPassword() {
    const navigate = useNavigate();
    const location = useLocation();
    const form = useRef();
    const [userId, setUserId] = useState('');


    //To generate random 4 digit number.
    function generateRandomNumber() {
        return Math.floor(1000 + Math.random() * 9000);
    }

    //To send email.
    const sendEmail = async () => {
        event.preventDefault();
        let templateParams = {
            randomNumber: generateRandomNumber(),
            mailId: document.getElementById('email').value,
        };
        try {
            const response = await fetch(`http://localhost:3000/api/resetToken`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(templateParams)
            })
            const data = await response.json();
            emailjs.send('service_44f2qb4', 'template_gihdrwi', templateParams, {
                publicKey: 'USN66qmbEOQ3Y9Yjl',
            }).then(
                (response) => {
                    console.log('Forgot pss/userId-- ', data.userId);
                    navigate(`/otp/${data.userId}`);
                    console.log('SUCCESS!', response.status, response.text);
                },
                (error) => {
                    console.log('FAILED...', error);
                },
            );
        } catch (error) {
            console.error('Error fetching queries:', error);
        }


    };


    return (
        <div className="container" id='forgot-password-container'>
            <div className="form-container">
                <div className="logo-container">
                    Forgot Password
                </div>

                <form className="form" ref={form}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="text" id="email" name="email" placeholder="Enter your email" required="" />
                    </div>

                    <button className="form-submit-btn" type="submit" onClick={() => sendEmail()}>Send Email</button>
                </form>
                <br />
            </div>
        </div>
    )
}

export default ForgotPassword