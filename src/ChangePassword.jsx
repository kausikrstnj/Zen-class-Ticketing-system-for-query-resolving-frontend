import React, { useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './EditProfile.css'

function ChangePassword() {
    const { userId } = useParams();
    const navigate = useNavigate();
    const form = useRef();
    const [error, setError] = useState('');
    const [formErrors, setFormErrors] = useState({});

    const checkPassword = async () => {
        event.preventDefault();
        const errors = {};

        // const password1 = form.current.elements.password1.value;
        // const password2 = form.current.elements.password2.value;
        const password1 = document.getElementById('password1').value;
        const password2 = document.getElementById('password2').value;


        if (password1 == '') errors.password1 = "Password should not be empty.";
        if (password1.length < 6) errors.password1 = "Password must be at least 6 characters long.";
        if (password2 == '') errors.password2 = "Password should not be empty.";
        if (password2 !== password1) errors.password2 = "Passwords should match.";


        setFormErrors(errors);
        if (Object.keys(errors).length > 0) {
            return alert('Please fill all the required fields.');
        }
        updatePassword();

        // if (password1 !== password2 || password1 === '' || password2 === '') {
        //     setError('Enter valid password');
        //     return;
        // } else {
        //     updatePassword();
        // }
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
            <div className="forgotPassContainer">
                <div className="forgotPasslogo-container">
                    Update Password
                </div>

                <form className="forgotPassform" ref={form}>
                    <div className="forgotPassform-group">
                        <label htmlFor="password1">New Password:</label><br />
                        <input type="password" id="password1" name="password1" placeholder="Password" required />
                        {formErrors.password1 && <div className="text-danger">{formErrors.password1}</div>}
                    </div>
                    <br />
                    <div className="forgotPassform-group">
                        <label htmlFor="email_confirmation">Re-Enter New Password:</label><br />
                        <input type="password" id="password2" name="password2" placeholder="Password" required />
                        {formErrors.password2 && <div className="text-danger">{formErrors.password2}</div>}
                    </div>

                    <button className="forgotPassform-submit-btn" type="submit" onClick={() => checkPassword()}>Update Password</button>
                </form>
                <br />
            </div>
        </div>
    )
}

export default ChangePassword