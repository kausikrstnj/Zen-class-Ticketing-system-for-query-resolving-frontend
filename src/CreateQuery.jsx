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
                <div className="d-flex flex-column flex-shrink-1 p-2 text-hite" id='sidebar'>
                    <ul className="nav nav-pills flex-column mb-auto mt-5 justify-content-center">
                        <li className="nav-item navcontents">
                            <Link to={`/`} className="nav-link p-1 navanchor">
                                <div className="text navtext">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-house" viewBox="0 0 16 16">
                                        <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z" />
                                    </svg>
                                </div>
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
                        {role == 'admin' ? (
                            <li className='nav-items navcontents'>
                                <Link to={`/queries/${userId}`} className="nav-link p-1 navanchor">
                                    <div className="text navtext">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-person-raised-hand" viewBox="0 0 16 16">
                                            <path d="M6 6.207v9.043a.75.75 0 0 0 1.5 0V10.5a.5.5 0 0 1 1 0v4.75a.75.75 0 0 0 1.5 0v-8.5a.25.25 0 1 1 .5 0v2.5a.75.75 0 0 0 1.5 0V6.5a3 3 0 0 0-3-3H6.236a1 1 0 0 1-.447-.106l-.33-.165A.83.83 0 0 1 5 2.488V.75a.75.75 0 0 0-1.5 0v2.083c0 .715.404 1.37 1.044 1.689L5.5 5c.32.32.5.754.5 1.207" />
                                            <path d="M8 3a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3" />
                                        </svg>
                                    </div>
                                </Link>

                            </li>

                        ) : (
                            <li>
                                <Link to={`/queries/${userId}`} className="nav-link text-white">
                                    <span className="icon">My Queries</span>
                                </Link>
                                <hr />
                            </li>
                        )}
                        <hr />
                        {role === 'admin' ? (
                            <li className='nav-items navcontents'>
                                <Link to={'/assignedQueries'} className="nav-link p-1 navanchor">
                                    <div className="text navtext">
                                        <svg width="18" height="18" fill='currentColor' xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" version="1.1">
                                            <g>
                                                <g strokeWidth="3" stroke="null" id="svg_1">
                                                    <path stroke="null" id="svg_2" d="m15.07658,2.88695c-1.72703,-1.63015 -3.9018,-2.50792 -6.26847,-2.50792s-4.6054,0.87777 -6.26847,2.50792c-0.25586,0.25079 -0.25586,0.68968 0,0.87777c0.25586,0.18809 0.63964,0.18809 0.8955,0c1.47117,-1.44205 3.32613,-2.19443 5.30901,-2.19443c1.98288,0 3.9018,0.81507 5.30901,2.19443c2.94234,2.88411 2.94234,7.58645 0,10.47056c-1.40721,1.44205 -3.32613,2.19443 -5.30901,2.19443c-1.98288,0 -3.9018,-0.81507 -5.30901,-2.19443c-0.25586,-0.25079 -0.63964,-0.25079 -0.8955,0c-0.25586,0.25079 -0.25586,0.62698 0,0.87777c1.72703,1.63015 3.9018,2.50792 6.26847,2.50792s4.6054,-0.75238 6.26847,-2.44522c1.66306,-1.69284 2.55856,-3.82457 2.55856,-6.1444c0,-2.31982 -0.83153,-4.51425 -2.55856,-6.1444z" />
                                                    <path stroke="null" id="svg_3" d="m3.37117,8.96865c0,-0.37619 -0.25586,-0.62698 -0.63964,-0.62698l-1.72703,0c-0.38378,0 -0.63964,0.25079 -0.63964,0.62698s0.25586,0.62698 0.63964,0.62698l1.72703,0c0.38378,0 0.63964,-0.25079 0.63964,-0.62698z" />
                                                    <path stroke="null" id="svg_4" d="m4.45856,8.96865c0,0.37619 0.25586,0.62698 0.63964,0.62698l5.18108,0l-2.94234,2.88411c-0.25586,0.25079 -0.25586,0.62698 0,0.87777c0.12793,0.1254 0.25586,0.18809 0.44775,0.18809c0.19189,0 0.31982,-0.0627 0.44775,-0.18809l3.96577,-3.88727c0.12793,-0.1254 0.19189,-0.25079 0.19189,-0.43889c0,-0.18809 -0.06396,-0.31349 -0.12793,-0.37619c-0.06396,-0.0627 -0.12793,-0.1254 -0.19189,-0.18809l-3.83784,-3.76188c-0.25586,-0.25079 -0.63964,-0.25079 -0.8955,0c-0.25586,0.25079 -0.25586,0.62698 0,0.87777l2.81441,2.75871l-5.05315,0c-0.38378,0 -0.63964,0.25079 -0.63964,0.62698z" />
                                                </g>
                                            </g>
                                        </svg>
                                    </div>
                                </Link>

                            </li>

                        ) : (
                            <></>
                        )}
                        <hr />
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
