import React, { useState, useRef, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './IntroPage.css'

function AddUser() {
    const form = useRef();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!localStorage.getItem('jwt')) {
            navigate('/IntroPage');
        }
    }, [navigate]);

    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        open: false,
    });

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
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

    const clickSubmit = () => {
        const user = {
            name: values.name || undefined,
            email: values.email || undefined,
            password: values.password || undefined,
            role: "mentor",
            phn: values.phn || undefined,
        };
        console.log('SignUp/user - ', user);

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
                    alert('Mentor created successfully!');
                    navigate('/users');
                    setValues({ ...values, error: "", open: true });
                }
            });

    };

    return (

        <div className="container" id='addUserContainer'>
            <h2>Add User</h2>
            <p>User's default role will be mentor</p>
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
                <button className=" mb-2 btn btn-lg rounded-3 btn-primary" type="submit" onClick={sendEmail}>Add User</button>
            </form>
        </div>

    )
}

export default AddUser