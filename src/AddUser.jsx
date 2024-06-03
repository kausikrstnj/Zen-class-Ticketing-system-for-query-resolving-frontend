import React, { useState, useRef, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './IntroPage.css'

function AddUser() {
    const form = useRef();
    const navigate = useNavigate();
    const location = useLocation();
    const [formValues, setFormValues] = useState({
        category: '',
        subcategory: '',
        language: '',
        queryTitle: '',
        queryDesc: '',
        timeFrom: '',
        timeTo: '',
        attachment: null,
    });

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
    const [errors, setErrors] = useState({
        name: '',
        phn: '',
        email: '',
        password: ''
    });

    const validateForm = () => {
        const newErrors = {
            name: validateField('name', values.name),
            phn: validateField('phn', values.phn),
            email: validateField('email', values.email),
            password: validateField('password', values.password)
        };
        setErrors(newErrors);

        return Object.values(newErrors).every(error => error === '');
    };

    const validateField = (field, value) => {
        let error = '';
        if (field === 'name' && value.trim() === '') {
            error = 'Name is required';
        } else if (field === 'phn' && !/^\d{10}$/.test(value)) {
            error = 'Phone number must be 10 digits';
        } else if (field === 'email' && !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) {
            error = 'Invalid email address';
        } else if (field === 'password' && value.length < 6) {
            error = 'Password must be at least 6 characters';
        }
        return error;
    };

    const handleChange = (field) => (event) => {
        const { value } = event.target;
        setValues({
            ...values,
            [field]: value
        });

        const error = validateField(field, value);
        setErrors({
            ...errors,
            [field]: error
        });
    };

    //To send email.
    // const sendEmail = (e) => {
    //     e.preventDefault();
    //     // Check if there are any errors
    //     emailjs
    //         .sendForm('service_hhv6shd', 'template_0q6iyrd', form.current, {
    //             publicKey: 'K8VsMKVO-imbFjfI6',
    //         })
    //         .then(
    //             () => {
    //                 console.log('SUCCESS!');
    //             },
    //             (error) => {
    //                 console.log('FAILED...', error.text);
    //             },
    //         );
    //     clickSubmit();
    // };

    const sendEmail = (e) => {
        e.preventDefault();
        if (validateForm()) {
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
                    }
                );
            clickSubmit();
        }
    };

    const clickSubmit = () => {
        const user = {
            name: values.name || undefined,
            email: values.email || undefined,
            password: values.password || undefined,
            role: "mentor",
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
                    alert('Mentor created successfully!');
                    navigate('/users');
                    setValues({ ...values, error: "", open: true });
                }
            });

    };

    return (
        <>
            <div className="container w-50  userpage p-4" >
                <div className='text-white'>
                    <h2>Add User</h2>
                    <p>User's default role will be mentor</p>
                </div>

                <form className="" ref={form} >
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="name" name='name' placeholder="Name" value={values.name} onChange={handleChange('name')} required />
                        <label htmlFor="floatingInput">Username</label>
                        {errors.name && <div className="text-danger">{errors.name}</div>}
                    </div>
                    <div className="form-floating mb-3">
                        <input type="tel" className="form-control" id="phn" name='phn' placeholder="Phone" value={values.phn} onChange={handleChange('phn')} required />
                        <label htmlFor="floatingInput">Phone number</label>
                        {errors.phn && <div className="text-danger">{errors.phn}</div>}
                    </div>
                    <div className="form-floating mb-3">
                        <input type="email" className="form-control" id="email" name='email' placeholder="Email" value={values.email} onChange={handleChange('email')} required />
                        <label htmlFor="floatingInput">Email address</label>
                        {errors.email && <div className="text-danger">{errors.email}</div>}
                    </div>
                    <div className="form-floating mb-3">
                        <input type="password" className="form-control" id="password" placeholder="Password" value={values.password} onChange={handleChange('password')} required />
                        <label htmlFor="floatingPassword">Password</label>
                        {errors.password && <div className="text-danger">{errors.password}</div>}
                    </div>
                    <button className="mt-2 mb-2 btn btn-lg rounded-3 btn-primary" type="submit" onClick={sendEmail}>Add User</button>
                </form>
            </div>
        </>


    )
}

export default AddUser