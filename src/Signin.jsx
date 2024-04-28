import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import './IntroPage.css'


function Signin() {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        email: '',
        password: '',
        error: ''
    });

    const clickSubmit = () => {
        const user = {
            email: values.email || undefined,
            password: values.password || undefined
        };

        fetch('https://zenclass-ticketing-system-for-query.onrender.com/auth/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error });
                } else {
                    localStorage.setItem('jwt', JSON.stringify(data));
                    localStorage.setItem('userId', data.userId);

                    const jwtString = localStorage.getItem('jwt');
                    const jwt = JSON.parse(jwtString);
                    localStorage.setItem('role', jwt.role);
                    if (jwt.msg == 'Email or password is incorrect.') {
                        alert('Email or password is incorrect.');
                    } else {
                        navigate('/');
                    }
                }
            });
    };

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
    };

    return (
        <div className="modal modal-sheet position-static d-block bg-body-white p-2 py-md-2" role="dialog" id="modalSignin">
            <div className="modal-dialog" role="document">
                <div className="modal-content rounded-4 shadow">
                    <div className="modal-header p-4 pb-3 border-bottom-0">
                        <h1 className="fw-bold mb-0 fs-2">Sign in</h1>
                    </div>

                    <div className="modal-body p-4 pt-0">
                        <form className="">

                            <div className="form-floating mb-2">
                                <input type="email" className="form-control" id="email" placeholder="Email" value={values.email} onChange={handleChange('email')} required />
                                <label htmlFor="floatingInput">Email address</label>
                            </div>
                            <div className="form-floating mb-2">
                                <input type="password" className="form-control" id="password" placeholder="Password" value={values.password} onChange={handleChange('password')} required />
                                <label htmlFor="floatingPassword">Password</label>
                                <br />
                                <Link className="forgot-password-link link" to={`/forgotPassword`} >Forgot Password</Link>
                            </div>
                            <br />
                            <Button variant="primary" onClick={clickSubmit}>Sign in</Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signin;
