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


    console.log('Query Data/ -- ', queryData)

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
        // Create a new FileReader object
        const reader = new FileReader();

        // When the file is loaded, set the result as the src attribute of the image
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

        // Read the file as a data URL (base64 string)
        reader.readAsDataURL(blob);
    };

    return (
        <>
            <div className="home">
                {/* sidebar */}
                <div className="d-flex flex-column flex-shrink-1 p-2 text-bg-dark" id='sidebar'>
                    <ul className="nav nav-pills flex-column mb-auto">
                        <li className="nav-item">
                            <a href="/" className="nav-link text-white">
                                <span className="text">📊Dashboard</span>
                            </a>
                        </li>
                        <hr />
                        {role === 'student' ? (
                            <li>
                                <a href={`/CreateQuery/${userId}`} className="nav-link text-white" onClick={createQuery}>
                                    <span className="icon"><i className="bi bi-plus-square-fill"></i></span> {/* Example icon */}
                                    <span className="text">➕Create Query</span>
                                </a>
                                <hr />
                            </li>
                        ) : (
                            <></>
                        )}
                        <li>
                            <Link to={`/queries/${userId}`} className="nav-link text-white">
                                <span className="icon">📂My Queries</span>
                            </Link>
                        </li>
                        <hr />

                        {role === 'admin' ? (<li>
                            <a href={'/assignedQueries'} className="nav-link text-white">
                                <span className="icon">📦</span>
                                <span className="text">Queries Assigned</span>
                            </a>
                            <hr />
                        </li>

                        ) : (
                            <></>
                        )}

                    </ul>
                </div>



                <div className='container' id='ViewQueryParent' >
                    <div className="container text-center" id='viewQueryContainer2' >
                        {queryData && (
                            <div className='card' id='viewQueriesCard'>
                                <h3>Query Detail</h3>
                                {role === 'admin' || role === 'mentor' ?
                                    (
                                        <div className='row mt-4' style={{ display: 'inline' }}>
                                            <span className="text-body-secondary" >Created by: {queryData.userName}</span>
                                            <span className="text-body-secondary" >Contact: {queryData.userPhn}</span>
                                        </div>
                                    ) : (
                                        <></>
                                    )}
                                <hr />
                                <div className='row' style={{ padding: '20px' }}>
                                    <div id='detrow'>
                                        <span className="text-body-secondary" >Created at:</span>
                                        <span className="text-body-secondary" >Assigned to:</span>
                                    </div>
                                    <div id='detrow'>
                                        <span> {formatDate(queryData.created)}</span>
                                        <span>  {queryData.mentorName} </span>
                                    </div>
                                </div>
                                <div className='row' style={{ padding: '20px' }}>
                                    <div id='desc'>
                                        <span className="text-body-secondary" >Description:</span>
                                    </div>
                                    <div id='desc'>
                                        <span>{queryData.desc}</span>
                                    </div>
                                </div>
                                <div className='row' style={{ padding: '20px' }}>
                                    <div id='detrow'>
                                        <span className="text-body-secondary">Sub-Category:</span>
                                        <span className="text-body-secondary">Preferred Language:</span>
                                    </div>
                                    <div id='detrow'>
                                        <span> {queryData.subcategory}</span>
                                        <span>  {queryData.language} </span>
                                    </div>
                                </div>
                                <div className='row' style={{ padding: '20px' }}>
                                    <div className="attachment-container">
                                        <p className="text-body-secondary">Attachment:</p>
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