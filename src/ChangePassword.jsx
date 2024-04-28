import React, { useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './EditProfile.css'

function ChangePassword() {
    const { userId } = useParams();
    const navigate = useNavigate();
    const form = useRef();
    const [error, setError] = useState('');

    const checkPassword = async () => {
        event.preventDefault();
        const password1 = form.current.elements.password1.value;
        const password2 = form.current.elements.password2.value;

        if (password1 !== password2 || password1 === '' || password2 === '') {
            setError('Enter valid password');
            return;
        } else {
            updatePassword();
        }
    }

    const updatePassword = async (e) => {
        const user = {
            password: document.getElementById('password1').value,
        };
        await fetch(`https://zenclass-ticketing-system-for-query.onrender.com/api/changePassword/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        }).then(response => response.json())
            .then(data => {
                if (data.error) {
                    console.log('Error- ', data.error);
                } else {
                    alert("Password updated successfully. Please login again to see changes.");
                    navigate("/signin");
                }
            });

    };

    return (
        <div className="container" id='forgot-password-container'>
            <div className="form-container">
                <div className="logo-container">
                    Update Password
                </div>

                <form className="form" ref={form}>
                    <div className="form-group">
                        <label htmlFor="password1">New Password:</label><br />
                        <input type="password" id="password1" name="password1" placeholder="Password" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email_confirmation">Re-Enter New Password:</label><br />
                        <input type="password" id="password2" name="password2" placeholder="Password" required />
                    </div>
                    {error && <div className="error" style={{ color: 'red' }}>Passwords does not match</div>}
                    <button className="form-submit-btn" type="submit" onClick={() => checkPassword()}>Update Password</button>
                </form>
                <br />
            </div>
        </div>
    )
}

export default ChangePassword