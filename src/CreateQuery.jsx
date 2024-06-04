import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Home.css'
import { useState } from 'react';
import React, { useRef } from 'react';
import { useEffect } from 'react';
import emailjs from '@emailjs/browser';

function Home() {
    const navigate = useNavigate();
    const location = useLocation();
    const isAuthenticated = localStorage.getItem('jwt') ? true : false;
    const [subcategoryOptions, setSubcategoryOptions] = useState([]);
    const [img, setImg] = useState();
    const [postImg, setPostImg] = useState('');

    const userId = localStorage.getItem('userId');
    const role = localStorage.getItem('role');
    const [userName, setUserName] = useState('');
    const [userMail, setUserMail] = useState('');
    const [queryNumber, setQueryNumber] = useState('');
    const [queryTitle, setQueryTitle] = useState('');
    const [formErrors, setFormErrors] = useState({});


    const validateForm = () => {
        const errors = {};

        if (!values.category) {
            errors.category = 'Category is required';
        }
        if (!values.subcategory) {
            errors.subcategory = 'Subcategory is required';
        }
        if (!values.language) {
            errors.language = 'Language is required';
        }
        if (!values.queryTitle) {
            errors.queryTitle = 'Query Title is required';
        }
        if (!values.queryDesc) {
            errors.queryDesc = 'Query Description is required';
        }
        if (!values.timeFrom) {
            errors.timeFrom = 'Available From time is required';
        }
        if (!values.timeTo) {
            errors.timeTo = 'Available To time is required';
        }
        return errors;
    };

    const back = () => {
        navigate('/');
    }


    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    const handleFileInputChange = async (event) => {
        const file = event.target.files[0];
        const base64 = await convertToBase64(file);
        setImg(file);
        setPostImg(base64);
    };

    useEffect(() => {
        if (!localStorage.getItem('jwt')) {
            navigate('/IntroPage');
        }
    }, [navigate]);


    // to create Query
    const [values, setValues] = useState({
        category: '',
        subcategory: '',
        language: '',
        title: '',
        desc: '',
        timeFrom: '',
        timeTo: '',
        attachment: '',
        status: '',
        assignedTo: '',
        created: '',
        updated: '',
    });

    const handleChange = (field) => (event) => {
        const { value } = event.target;
        setValues({
            ...values,
            [field]: value,
        });
    };

    const postQuery = async (e) => {
        event.preventDefault();
        const errors = {};
        const category = document.getElementById('category').value;
        const subcategory = document.getElementById('subcategorySelect').value;
        const language = document.getElementById('language').value;
        const queryTitle = document.getElementById('queryTitle').value;
        const queryDesc = document.getElementById('queryDesc').value;
        const timeFrom = document.getElementById('avalFrom').value;
        const timeTo = document.getElementById('avalTo').value;


        if (!category) errors.category = "Category is required.";
        if (!subcategory) errors.subcategory = "Subcategory is required.";
        if (!language) errors.language = "Preferred language is required.";
        if (!queryTitle) errors.queryTitle = "Query title is required.";
        if (!queryDesc) errors.queryDesc = "Query description is required.";
        if (!timeFrom) errors.timeFrom = "Available time from is required.";
        if (!timeTo) errors.timeTo = "Available time to is required.";
        setFormErrors(errors);


        if (Object.keys(errors).length > 0) {
            return alert('Please fill all the required fields.');
        }

        const currentDate = new Date();
        const [hoursFrom, minutesFrom] = timeFrom.split(':');
        const [hoursTo, minutesTo] = timeTo.split(':');
        currentDate.setHours(parseInt(hoursFrom, 10), parseInt(minutesFrom, 10), 0, 0);

        const query = {
            category: document.getElementById('category').value,
            subcategory: document.getElementById('subcategorySelect').value,
            language: document.getElementById('language').value,
            title: document.getElementById('queryTitle').value,
            desc: document.getElementById('queryDesc').value,
            timeFrom: currentDate.toISOString(),
            timeTo: currentDate.toISOString(),
            attachment: postImg,
            userId: userId,
            status: "pending",
            assignedTo: "",
        };
        fetch('https://zenclass-ticketing-system-for-query.onrender.com/api/createQuery', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(query),
        }).then(response => response.json())
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error });
                } else {
                    setUserName(data.userName);
                    setUserMail(data.userEmail);
                    setQueryNumber(data.resQuery.queryNumber);
                    setQueryTitle(data.resQuery.title);
                    try {
                        let templateParams = {
                            userName: data.userName,
                            queryNumber: data.resQuery.queryNumber,
                            queryTitle: data.resQuery.title,
                            userEmail: data.userEmail,
                        };

                        emailjs.send('service_hhv6shd', 'template_wulhwvk', templateParams, {
                            publicKey: 'K8VsMKVO-imbFjfI6',
                        }).then(
                            (response) => {
                                alert('Your query has been raised.');
                                document.getElementById('category').value = '';
                                document.getElementById('subcategorySelect').value = '';
                                document.getElementById('language').value = '';
                                document.getElementById('queryTitle').value = '';
                                document.getElementById('queryDesc').value = '';
                                document.getElementById('avalFrom').value = '';
                                document.getElementById('avalTo').value = '';
                                document.getElementById('attachment').value = '';
                                document.getElementById('previewImg').src = '';
                                navigate(`/queries/:userId`);
                                console.log('SUCCESS!', response.status, response.text);
                            },
                            (error) => {
                                console.log('FAILED...', error);
                            },
                        );
                    } catch (error) {
                        console.error('Error fetching queries:', error);
                        navigate('/error', { state: { errorMessage: 'Failed to create query. Please try again later.' } });
                    }
                    setValues({ ...values, error: "", open: true })
                }
            });
    };

    const updateSubcategoryOptions = () => {
        const selectedCategory = document.getElementById('category').value;
        let options;
        switch (selectedCategory) {
            case 'Zen Class Doubt':
                options = ['Task', 'Webcode', 'ClassTopic', 'Webkata', 'Codekata', 'Assessment'];
                break;
            case 'Placement Related':
                options = ['Company Info', 'Completion Certificate', 'Portfolio'];
                break;
            case 'Coordination Related':
                options = ['Session Timing', 'Session Joining Link', 'Session Feedback', 'Completion Certificate', 'Payment'];
                break;
            case 'Pre-Bootcamp Related':
                options = ['Session', 'Payment', 'Codekata', 'Webkata', 'Task', 'Other'];
                break;
            default:
                options = [];
                break;
        }
        setSubcategoryOptions(options);
    };
    useEffect(() => {
        updateSubcategoryOptions();
    }, []);

    const styles = {
        preview: {
            marginTop: 50,
            display: "flex",
            flexDirection: "column",
        },
        image: { maxWidth: "100%", maxHeight: 320 },
        delete: {
            cursor: "pointer",
            padding: 15,
            background: "red",
            color: "white",
            border: "none",
        },
    };

    return (
        <>

            <div className="home">
                <div className="d-flex flex-column flex-shrink-1 p-2 text-white" id='sidebar'>
                    <ul className="nav nav-pills flex-column mb-auto mt-5 justify-items-center">
                        <li className="nav-item navcontents">
                            <Link to={`/`} className="nav-link p-1 navanchor">
                                <div className="text navtext" title='Dashboard'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-house" viewBox="0 0 16 16" title="Dashboard">
                                        <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z" />
                                    </svg>
                                </div>
                            </Link>
                        </li>
                        {role === 'student' ? (
                            <li className="nav-item navcontents">
                                <Link to={`/CreateQuery/${userId}`} className="nav-link p-1 navanchor" >
                                    <div className="text navtext" title='Create Query'>
                                        <svg aria-label="Create Query" xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-patch-plus-fill" viewBox="0 0 16 16">
                                            <path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01zM8.5 6v1.5H10a.5.5 0 0 1 0 1H8.5V10a.5.5 0 0 1-1 0V8.5H6a.5.5 0 0 1 0-1h1.5V6a.5.5 0 0 1 1 0" />
                                        </svg>
                                    </div>
                                </Link>

                            </li>

                        ) : (
                            <></>
                        )}
                        {role == 'admin' ? (
                            <li className='nav-items navcontents'>
                                <Link to={`/queries/${userId}`} className="nav-link p-1 navanchor">
                                    <div className="text navtext" title='All Queries'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-card-text" viewBox="0 0 16 16">
                                            <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2z" />
                                            <path d="M3 5.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5M3 8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 8m0 2.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5" />
                                        </svg>
                                    </div>
                                </Link>
                            </li>

                        ) : (
                            <li className="nav-item navcontents">
                                <Link to={`/queries/${userId}`} className="nav-link p-1 navanchor">
                                    <div className="text navtext" title='My Queries'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-card-text" viewBox="0 0 16 16">
                                            <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2z" />
                                            <path d="M3 5.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5M3 8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 8m0 2.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5" />
                                        </svg>
                                    </div>
                                </Link>
                            </li>
                        )}
                        {role === 'admin' ? (
                            <li className='nav-items navcontents'>
                                <Link to={'/assignedQueries'} className="nav-link p-1 navanchor">
                                    <div className="text navtext" title='Assigned Queries'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-file-check" viewBox="0 0 16 16">
                                            <path d="M10.854 6.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 8.793l2.646-2.647a.5.5 0 0 1 .708 0" />
                                            <path d="M4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm0 1h8a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1" />
                                        </svg>
                                    </div>
                                </Link>
                            </li>

                        ) : (
                            <></>
                        )}
                    </ul>
                </div>

                <div className="container text-center" id='createquery'>
                    <div className="row" id='createquerydet'>
                        <form className="form d-flex justify-content-center flex-column mt-2" id='createqueryCard'>

                            <span id='Heading'> Topic</span>
                            <div className="input-container">
                                <p className="form-title-det">Category</p>
                                <select required id="category" name='category' onChange={updateSubcategoryOptions} defaultValue="" >
                                    <option value="" disabled >---Select Category---</option>
                                    <option value="Zen Class Doubt">Zen Class Doubt</option>
                                    <option value="Placement Related">Placement Related</option>
                                    <option value="Coordination Related">Coordination Related</option>
                                    <option value="Pre-Bootcamp Related">Pre-Bootcamp Related</option>
                                </select>
                                {formErrors.category && <div className="text-danger">{formErrors.category}</div>}

                                {!subcategoryOptions ? (
                                    <>

                                    </>
                                ) : (
                                    <>  <p className="form-title-det">SubCategory</p>
                                        <select id="subcategorySelect" required >
                                            {subcategoryOptions.map((option, index) => (
                                                <option key={index} value={option}>{option}</option>
                                            ))}
                                        </select>
                                        {formErrors.subcategory && <div className="text-danger">{formErrors.subcategory}</div>}
                                    </>

                                )}


                                <p className="form-title-det" >Prefered Voice Communication Language</p>
                                <select required id='language' defaultValue="">
                                    <option value="" disabled >---Select Language---</option>
                                    <option value="tamil">Tamil</option>
                                    <option value="english">English</option>
                                    <option value="hindi">Hindi</option>

                                </select>
                                {formErrors.language && <div className="text-danger">{formErrors.language}</div>}

                            </div>
                            <hr />


                            <span id='Heading'> Details</span>
                            <div className="input-container">
                                <p className="form-title-det" >Query Title</p>
                                <input type="text" name='queryTitle' id='queryTitle' placeholder='Enter query title' required />
                                {formErrors.queryTitle && <div className="text-danger">{formErrors.queryTitle}</div>}

                                <p className="form-title-det" >Query Description</p>
                                <input type="text" name='queryDesc' id='queryDesc' placeholder='Enter query description' required />
                                {formErrors.queryDesc && <div className="text-danger">{formErrors.queryDesc}</div>}
                            </div>
                            <hr />

                            <span id='Heading'> Your available Time ? ( Ours : 9:00 AM - 7:00 PM )</span>
                            <div className="input-container">
                                <p className="form-title-det" >From</p>
                                <input type="time" max="19:00" name='avalFrom' id='avalFrom' required />
                                {formErrors.timeFrom && <div className="text-danger">{formErrors.timeFrom}</div>}

                                <p className="form-title-det" >To</p>
                                <input type="time" max="19:00" name='avalTo' id='avalTo' required />
                                {formErrors.timeTo && <div className="text-danger">{formErrors.timeTo}</div>}


                                <input type="hidden" name='status' id='status' value="pending" />
                                <input type="hidden" name='userId' id='userId' value={userId} />

                            </div>
                            <hr />

                            <span id='Heading'> Attachments (Optional)</span>
                            <div className='d-flex space-y-6'>
                                <input type="file" accept=".jpeg, .png, .jpg" multiple id='attachment' className='space-y-6'
                                    onChange={handleFileInputChange}
                                />
                            </div>
                            <br />

                            {img && <img id='previewImg' style={{ height: '100px', width: '100px' }} src={URL.createObjectURL(img)} alt="Attachment" />}

                            <div className='flex' id='submitBtn'>
                                <button className="btn btn-danger" onClick={back}>Cancel</button>
                                <button className="btn btn-primary" onClick={postQuery}>Create</button>
                            </div>


                        </form>
                    </div>
                </div >
            </div >
        </>
    );
}

export default Home;
