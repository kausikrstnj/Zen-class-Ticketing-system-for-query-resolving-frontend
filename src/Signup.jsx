import React, { useState, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './IntroPage.css'
import emailjs from '@emailjs/browser';


function Signup() {
    const navigate = useNavigate();
    const location = useLocation();
    const form = useRef();

    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        open: false,
    });

    const clickSubmit = () => {
        const user = {
            name: values.name || undefined,
            email: values.email || undefined,
            password: values.password || undefined,
            role: "student",
            phn: values.phn || undefined,
        };
        fetch('http://localhost:3000/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        }).then(response => response.json())
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error });
                } else {
                    navigate("/signin");
                    setValues({ ...values, error: "", open: true });
                }
            });
    };

    //To send email.
    const sendEmail = (e) => {
        e.preventDefault();
        emailjs
            .sendForm('service_hhv6shd', 'template_0q6iyrd', form.current, {
                publicKey: 'K8VsMKVO-imbFjfI6',
            })
            .then(
                () => {
                    console.log('SUCCESS!');
                },
                (error) => {
                    console.log('FAILED...', error.text);
                },
            );
        clickSubmit();
    };

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
    };

    return (
        <>
            <div className="modal modal-sheet position-static d-block bg-body-white p-2 py-md-2" role="dialog" id="modalSignin">
                <div className="modal-dialog" role="document">
                    <div className="modal-content rounded-4 shadow">
                        <div className="modal-header p-4 pb-3 border-bottom-0">
                            <h1 className="fw-bold mb-0 fs-2">Sign up for free</h1>
                        </div>

                        <div className="modal-body p-4 pt-0">
                            <form className="" ref={form} >
                                <div className="form-floating mb-2">
                                    <input type="text" className="form-control" id="name" name='name' placeholder="Name" value={values.name} onChange={handleChange('name')} required />
                                    <label htmlFor="floatingInput">Username</label>
                                </div>
                                <div className="form-floating mb-2">
                                    <input type="number" className="form-control" id="phn" name='phn' placeholder="Phone" value={values.phn} onChange={handleChange('phn')} required />
                                    <label htmlFor="floatingInput">Phone number</label>
                                </div>
                                <div className="form-floating mb-2">
                                    <input type="email" className="form-control" id="email" name='email' placeholder="Email" value={values.email} onChange={handleChange('email')} required />
                                    <label htmlFor="floatingInput">Email address</label>
                                </div>
                                <div className="form-floating mb-2">
                                    <input type="password" className="form-control" id="password" placeholder="Password" value={values.password} onChange={handleChange('password')} required />
                                    <label htmlFor="floatingPassword">Password</label>
                                </div>
                                <button className="w-100 mb-2 btn btn-lg rounded-3 btn-primary" type="submit" onClick={sendEmail}>Sign up</button>
                            </form>
                        </div>
                        <p className="signup-link">
                            Already have an account?
                            <a className="signup-link link" href="/signin"> Sign in</a>
                        </p>
                        {/* <div className="modal-footer">
                            <p className="text-center mb-0">Already have an account? <a href="/signin">Sign in</a></p>
                        </div> */}
                    </div>
                </div>
            </div>



        </>
    );
}

export default Signup;
