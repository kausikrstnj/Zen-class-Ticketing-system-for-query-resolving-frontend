import React from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import './Home.css'


function ViewQuery() {
    const navigate = useNavigate();
    const location = useLocation();
    const isAuthenticated = localStorage.getItem('jwt') ? true : false;
    const queryData = location.state.queryData;
    const userId = localStorage.getItem('userId');
    const role = localStorage.getItem('role');
    const [queries, setQueries] = useState([]);
    useEffect(() => {
        if (!localStorage.getItem('jwt')) {
            navigate('/IntroPage');
        }
    }, [navigate]);

    const createQuery = () => {
        navigate('/CreateQuery');
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const formattedTime = `${hours % 12 || 12}:${minutes < 10 ? '0' : ''}${minutes} ${ampm}`;
        return `${formattedDate}, ${formattedTime}`;
    };
    const formattedDate = formatDate('2024-03-23T11:50:54.034Z');
    const [imgSrc, setImgSrc] = useState('');
    const handleLoadImage = () => {
        const reader = new FileReader();
        reader.onload = function (event) {
            const imageSrc = event.target.result;
            setImgSrc(imageSrc); // Set the image source in state
        };
        let mimeType;
        if (queryData.attachment.endsWith('.png')) {
            mimeType = 'image/png';
        } else if (queryData.attachment.endsWith('.jpg') || queryData.attachment.endsWith('.jpeg')) {
            mimeType = 'image/jpeg';
        } else if (queryData.attachment.endsWith('.gif')) {
            mimeType = 'image/gif';
        } else {
            // Default to PNG if the format is not recognized
            mimeType = 'image/png';
        }
        // Convert the file path to Blob object
        const blob = new Blob([queryData.attachment], { type: mimeType });

        reader.readAsDataURL(blob);
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



                <div className='container' id='ViewQueryParent' >
                    <div className="container text-center" id='' >
                        {queryData && (
                            <div className='card' id='viewqueryCard'>
                                <h3 style={{ backgroundColor: 'transparent' }}>Query Detail</h3>
                                {role === 'admin' || role === 'mentor' ?
                                    (
                                        <div className='row mt-4' style={{ display: 'inline' }}>
                                            <span className="" >Created by: {queryData.userName}</span>
                                            <span className="" >Contact: {queryData.userPhn}</span>
                                        </div>
                                    ) : (
                                        <></>
                                    )}
                                <hr />
                                <div className='row' style={{ padding: '20px' }}>
                                    <div id='detrow'>
                                        <span id='Heading'> Created at: </span>
                                        <span id='createdAtData'> {formatDate(queryData.created)}</span>
                                    </div>
                                    <div id='detrow'>
                                        <span id='Heading'>Assigned to: </span>
                                        <span id='assignedToData'> {queryData.mentorName}</span>
                                    </div>
                                </div>
                                <div className='row' style={{ padding: '20px' }}>
                                    <div id='desc'>
                                        <span id='Heading'>Description:</span>

                                    </div>
                                    <div id='desc'>
                                        <span>{queryData.desc}</span>
                                    </div>
                                </div>
                                <div className='row' style={{ padding: '20px' }}>
                                    <div id='detrow'>
                                        <span id='Heading'>Sub-Category:</span>
                                        <span id='Heading'>Preferred Language:</span>
                                    </div>
                                    <div id='detrow'>
                                        <span> {queryData.subcategory}</span>
                                        <span>  {queryData.language} </span>
                                    </div>
                                </div>
                                <div className='row' style={{ padding: '20px' }}>
                                    <div className="attachment-container">
                                        <span id='Heading'>Attachment:</span>

                                        {queryData.attachment === '' ? (
                                            <>
                                            </>
                                        ) : (
                                            <div id='imagePreview' style={{ paddingLeft: '10px' }}>
                                                <br />
                                                {queryData.attachment && (

                                                    <img
                                                        src={queryData.attachment}
                                                        style={{ height: '100px', width: '100px' }}
                                                        onLoad={handleLoadImage}
                                                        alt="Attachment"
                                                    />


                                                )}
                                            </div>
                                        )}

                                    </div>
                                </div>
                                <br />
                                <hr />

                            </div>
                        )}
                    </div>
                </div>


            </div >
        </>
    )
}

export default ViewQuery