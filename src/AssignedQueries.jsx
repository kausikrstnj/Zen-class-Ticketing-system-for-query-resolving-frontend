import React from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import './Home.css'

function AssignedQueries() {
    const navigate = useNavigate();
    const isAuthenticated = localStorage.getItem('jwt') ? true : false;
    const role = localStorage.getItem('role');
    const userId = localStorage.getItem('userId');
    const [queries, setQueries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        getAllAssignedQueries();
    }, []);

    // To get queries from DB
    const getAllAssignedQueries = async () => {
        try {
            const response = await fetch(`https://zenclass-ticketing-system-for-query.onrender.com/api/getAllAssignedQueries`);
            const data = await response.json();
            setQueries(data.query);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching queries:', error);
            setError(error);
            setLoading(false);
        }
    };

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

    return (
        <>
            <div className="home">
                <div className="d-flex flex-column flex-shrink-1 p-2 text-white" id='sidebar'>
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
                                <Link to={`/queries/${userId}`} className="nav-link p-1 text-white navanchor">
                                    <div className="text navtext">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-person-raised-hand" viewBox="0 0 16 16">
                                            <path d="M6 6.207v9.043a.75.75 0 0 0 1.5 0V10.5a.5.5 0 0 1 1 0v4.75a.75.75 0 0 0 1.5 0v-8.5a.25.25 0 1 1 .5 0v2.5a.75.75 0 0 0 1.5 0V6.5a3 3 0 0 0-3-3H6.236a1 1 0 0 1-.447-.106l-.33-.165A.83.83 0 0 1 5 2.488V.75a.75.75 0 0 0-1.5 0v2.083c0 .715.404 1.37 1.044 1.689L5.5 5c.32.32.5.754.5 1.207" />
                                            <path d="M8 3a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3" />
                                        </svg>
                                    </div>
                                </Link>
                                <hr />
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
                            <Link to={'/assignedQueries'} className="nav-link p-1 text-white navanchor">
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
                       
                    </ul>
                </div>



                <div className="container text-center mt-2 p-3" id='myQueriesContainer'>

                    {loading ? (
                        <div className="assignedQueriesloadercard">
                            <div id='editProfile'>
                                <div className="loader"></div>
                            </div>
                        </div>
                    ) : error ? (
                        <p>Error: {error.message}</p>
                    ) : queries.length === 0 ? (
                        <div className='card' id='querycardassign'>
                            <p className="text-body-secondary">No Queries to display.</p>
                        </div>
                    ) : (
                        queries.map(query => (
                            <div className='card container w-100 p-3' id='querycardassign' key={query._id}>
                                <div className='card-my-query d-flex flex-column gap-2'>
                                    <div id='card1row text-white'>
                                        <span className='d-flex flex-row gap-4 justify-items-start' >
                                            <h5 className='fs-5 text-white'>QN{query.queryNumber} - {query.title}</h5>
                                            <div id='card1status' className='card p-1' >Assigned To: {query.mentorName}</div>
                                        </span>
                                    </div>
                                    <br />
                                    <div className='d-flex flex-row justify-content-evenly text-white'>
                                        <span id='categoryDet' className='card rounded p-1 border-secondary border-1' >{query.category}</span>
                                        <span id='created d-flex align-self-center'>{formatDate(query.created)}</span>
                                        <span id='userPhn'>Phone - {query.userPhn}</span>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div >
        </>
    )
}
export default AssignedQueries