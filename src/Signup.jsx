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
                            <form  ref={form} >
                                <div className="form-floating mb-2">
                                    <input type="text" className="form-control signinp" id="name" name='name' placeholder="" value={values.name} onChange={handleChange('name')} required />
                                    <label htmlFor="floatingInput" className='formlabel' >Username</label>
                                </div>
                                <div className="form-floating mb-2">
                                    <input type="tel" className="form-control signinp" id="phn" name='phn' placeholder="Phone" value={values.phn} onChange={handleChange('phn')} required />
                                    <label htmlFor="floatingInput" className='formlabel'>Phone number</label>
                                </div>
                                <div className="form-floating mb-2">
                                    <input type="email" className="form-control signinp" id="email" name='email' placeholder="Email" value={values.email} onChange={handleChange('email')} required />
                                    <label htmlFor="floatingInput" className='formlabel'>Email address</label>
                                </div>
                                <div className="form-floating mb-2">
                                    <input type="password" className="form-control signinp" id="password" placeholder="Password" value={values.password} onChange={handleChange('password')} required />
                                    <label htmlFor="floatingPassword" className='formlabel'>Password</label>
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
