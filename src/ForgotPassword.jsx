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
            const response = await fetch(`https://zenclass-ticketing-system-for-query.onrender.com/api/resetToken`, {
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
            <div className="forgotPassContainer">
                <div className="forgotPasslogo-container">
                    Forgot Password
                </div>

                <form className="forgotPassform" ref={form}>
                    <div className="forgotPassform-group">
                        <label htmlFor="email">Email</label>
                        <input type="text" id="email" name="email" placeholder="Enter your email" required="" />
                    </div>

                    <button className="forgotPassform-submit-btn" type="submit" onClick={() => sendEmail()}>Send Email</button>
                </form>
                <br />
            </div>
        </div>

    )
}

export default ForgotPassword