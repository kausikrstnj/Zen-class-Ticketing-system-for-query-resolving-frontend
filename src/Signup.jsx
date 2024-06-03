import React, { useState, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './IntroPage.css'
import emailjs from '@emailjs/browser';


function Signup() {
    const navigate = useNavigate();
    const location = useLocation();
    const form = useRef();
    const [formErrors, setFormErrors] = useState({});

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
        fetch('https://zenclass-ticketing-system-for-query.onrender.com/api/users', {
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

        const errors = {};
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const phoneInput = document.getElementById('phn');
        const passwordInput = document.getElementById('password');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!nameInput.value) errors.nameInput = "Name is required.";
        if (!emailInput.value) {
            errors.emailInput = "Email is required.";
        } else if (!emailRegex.test(emailInput.value)) {
            errors.emailInput = "Invalid email format.";
        }
        if (!phoneInput.value) errors.phoneInput = "Phone is required.";
        if (!passwordInput.value) {
            errors.passwordInput = "Password is required.";
        } else if (passwordInput.value.length < 6) {
            errors.passwordInput = "Password must be at least 6 characters long.";
        }


        setFormErrors(errors);
        if (Object.keys(errors).length > 0) {
            return alert('Please fill all the required fields.');
        }

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
                    <div className="modal-content rounded-3 shadow signupbox">
                        <div className="modal-header p-4 pb-3 border-bottom-0 text-white">
                            <h1 className="fw-bold mb-0 fs-2">Sign up for free</h1>
                        </div>

                        <div className="modal-body p-4 pt-0">
                            <form ref={form} >
                                <div className="form-floating mb-2">
                                    <input type="text" className="form-control signinp" id="name" name='name' placeholder="" value={values.name} onChange={handleChange('name')} required />
                                    <label htmlFor="floatingInput" className='formlabel' >Username</label>
                                    {formErrors.nameInput && <div className="text-danger">{formErrors.nameInput}</div>}
                                </div>
                                <div className="form-floating mb-2">
                                    <input type="tel" className="form-control signinp" id="phn" name='phn' placeholder="Phone" value={values.phn} onChange={handleChange('phn')} required />
                                    <label htmlFor="floatingInput" className='formlabel'>Phone number</label>
                                    {formErrors.phoneInput && <div className="text-danger">{formErrors.phoneInput}</div>}
                                </div>
                                <div className="form-floating mb-2">
                                    <input type="email" className="form-control signinp" id="email" name='email' placeholder="Email" value={values.email} onChange={handleChange('email')} required />
                                    <label htmlFor="floatingInput" className='formlabel'>Email address</label>
                                    {formErrors.emailInput && <div className="text-danger">{formErrors.emailInput}</div>}
                                </div>
                                <div className="form-floating mb-2">
                                    <input type="password" className="form-control signinp" id="password" placeholder="Password" value={values.password} onChange={handleChange('password')} required />
                                    <label htmlFor="floatingPassword" className='formlabel'>Password</label>
                                    {formErrors.passwordInput && <div className="text-danger">{formErrors.passwordInput}</div>}
                                </div>
                                <button className="w-100 mb-1 btn btn-lg rounded-3 signbtn" type="submit" onClick={sendEmail}>Sign up</button>
                            </form>
                        </div>

                        <div className="signup-link text-light p-4 w-100">
                            <h1 className='fs-3' >Already have an account?</h1>
                            <button className='btn btn-lg mb-3 w-100 signbtn' >
                                <Link className="text-decoration-none text-light" to={`/signin`}>Sign in</Link>
                            </button>
                        </div>
                    </div>
                </div>
            </div>



        </>
    );
}

export default Signup;
