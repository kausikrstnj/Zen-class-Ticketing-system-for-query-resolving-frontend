import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './EditProfile.css'

function OTP() {
    const navigate = useNavigate();
    const { userId } = useParams();
    const isAuthenticated = localStorage.getItem('jwt') ? true : false;
    const [error, setError] = useState('');
    useEffect(() => {
    },);
    const verifyEmail = async () => {
        event.preventDefault();
        const input1Value = document.getElementById('input1').value;
        const input2Value = document.getElementById('input2').value;
        const input3Value = document.getElementById('input3').value;
        const input4Value = document.getElementById('input4').value;
        const data = {
            code: input1Value + input2Value + input3Value + input4Value
        }

        try {
            const response = await axios.post(`https://zenclass-ticketing-system-for-query.onrender.com/api/verifyEmail/${userId}`, data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const result = await JSON.stringify(response);
            navigate(`/changePassword/${userId}`);
        } catch (error) {
            setError('Enter valid code');
            //  console.error('Error fetching otp:', error);
        }
    }

    return (
        <div className="container" id='forgot-password-container'>
            <form className="otp-form">
                <div className="title">OTP</div>
                <div className="title">Verification Code
                </div>
                <p className="message">We have sent a verification code to your Email </p>
                <div className="inputs">
                    <input id="input1" type="text" maxLength="1" required />
                    <input id="input2" type="text" maxLength="1" required />
                    <input id="input3" type="text" maxLength="1" required />
                    <input id="input4" type="text" maxLength="1" required />
                </div>
                <br />
                {error && <div className="error" style={{ color: 'red', fontFamily: 'sans-serif' }}>Enter valid code</div>}
                <button className="action" onClick={() => verifyEmail()}>verify me</button>
            </form>
        </div>
    )
}

export default OTP