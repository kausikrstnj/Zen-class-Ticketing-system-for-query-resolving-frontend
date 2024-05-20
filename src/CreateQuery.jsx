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

    const createQuery = () => {
        navigate('/CreateQuery');
    }

    const back = () => {
        navigate('/');
    }

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

    const postQuery = async (e) => {
        event.preventDefault();
        const currentDate = new Date();
        const timeFrom = document.getElementById('avalFrom').value;
        const timeTo = document.getElementById('avalTo').value;
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
                <div className="d-flex flex-column flex-shrink-1 p-2 text-bg-dark" id='sidebar'>
                    <ul className="nav nav-pills flex-column mb-auto">
                        <li className="nav-item">
                            <Link to={`/`} className="nav-link text-white">
                                <span className="text"></span>
                            </Link>
                        </li>
                        <hr />
                        {role === 'student' ? (
                            <li>
                                <Link to={`/CreateQuery/${userId}`} className="nav-link text-white" onClick={createQuery}>
                                    <span className="icon"><i className="bi bi-plus-square-fill"></i></span> {/* Example icon */}
                                    <span className="text">Create Query</span>
                                </Link>
                                <hr />
                            </li>
                        ) : (
                            <></>
                        )}
                        <li>
                            <Link to={`/queries/${userId}`} className="nav-link text-white">
                                <span className="icon">My Queries</span>

                            </Link>
                        </li>
                        <hr />

                        {role === 'admin' ? (<li>
                            <Link to={'/assignedQueries'} className="nav-link text-white">

                                <span className="text">Queries Assigned</span>
                            </Link>
                            <hr />
                        </li>

                        ) : (
                            <></>
                        )}


                    </ul>
                </div>


                <div className="container text-center" id='createquery'>
                    <button type="button" className="btn btn-warning" onClick={back}>Back</button>
                    <div className="row" id='createquerydet'>
                        <form className="form d-flex justify-content-center flex-column mt-2">
                            <h2 className="fw-bold text-body-emphasis form-title">Topic</h2>
                            <div className="input-container">

                                <p className="form-title-det">Category</p>
                                <select required id="category" name='category' onChange={updateSubcategoryOptions} defaultValue="" >
                                    <option value="" disabled >---Select Category---</option>
                                    <option value="Zen Class Doubt">Zen Class Doubt</option>
                                    <option value="Placement Related">Placement Related</option>
                                    <option value="Coordination Related">Coordination Related</option>
                                    <option value="Pre-Bootcamp Related">Pre-Bootcamp Related</option>
                                </select>

                                {!subcategoryOptions ? (
                                    <>

                                    </>
                                ) : (
                                    <>  <p className="form-title-det">SubCategory</p>
                                        <select id="subcategorySelect" required >
                                            {subcategoryOptions.map((option, index) => (
                                                <option key={index} value={option}>{option}</option>
                                            ))}
                                        </select> </>
                                )}


                                <p className="form-title-det" >Prefered Voice Communication Language</p>
                                <select required id='language' defaultValue="">
                                    <option value="" disabled >---Select Language---</option>
                                    <option value="tamil">Tamil</option>
                                    <option value="english">English</option>
                                    <option value="hindi">Hindi</option>

                                </select>
                            </div>
                            <hr />


                            <h2 className="fw-bold text-body-emphasis form-title">Details</h2>
                            <div className="input-container">
                                <p className="form-title-det" >Query Title</p>
                                <input type="text" name='queryTitle' id='queryTitle' placeholder='Enter query title' required />
                                <p className="form-title-det" >Query Description</p>
                                <input type="text" name='queryDesc' id='queryDesc' placeholder='Enter query description' required />

                            </div>

                            <hr />
                            <h2 className="fw-bold text-body-emphasis form-title">Your available Time ? ( Ours : 9:00 AM - 7:00 PM )</h2>
                            <div className="input-container">
                                <p className="form-title-det" >From</p>
                                <input type="time" max="19:00" name='avalFrom' id='avalFrom' required />
                                <p className="form-title-det" >To</p>
                                <input type="time" max="19:00" name='avalTo' id='avalTo' required />

                                <input type="hidden" name='status' id='status' value="pending" />
                                <input type="hidden" name='userId' id='userId' value={userId} />

                            </div>

                            <hr />

                            <h2 className="fw-bold text-body-emphasis form-title">Attachments (Optional)</h2>
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
