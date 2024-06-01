import React from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import './Home.css'
import Filebase64 from 'react-file-base64'
import axios from 'axios';

function MyQueries() {
    const navigate = useNavigate();
    const isAuthenticated = localStorage.getItem('jwt') ? true : false;
    const role = localStorage.getItem('role');

    const userId = localStorage.getItem('userId');
    const [queries, setQueries] = useState([]);
    const [recentQuery, setRecentQuery] = useState(null);
    const [phn, setPhn] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [imgSrc, setImgSrc] = useState('');
    const [postImg, setPostImg] = useState({});
    const [filteredQueries, setFilteredQueries] = useState([]);
    const [filterCriteria, setFilterCriteria] = useState('');

    const handleLoadImage = () => {
        const reader = new FileReader();
        reader.onload = function (event) {
            const imageSrc = event.target.result;
            setImgSrc(imageSrc); // Set the image source in state
        };
        let mimeType;
        if (recentQuery.attachment.endsWith('.png')) {
            mimeType = 'image/png';
        } else if (recentQuery.attachment.endsWith('.jpg') || recentQuery.attachment.endsWith('.jpeg')) {
            mimeType = 'image/jpeg';
        } else if (recentQuery.attachment.endsWith('.gif')) {
            mimeType = 'image/gif';
        } else {
            mimeType = 'image/png';
        }
        const blob = new Blob([recentQuery.attachment], { type: mimeType });
        reader.readAsDataURL(blob);
    };

    useEffect(() => {
        if (!localStorage.getItem('jwt')) {
            navigate('/IntroPage');
        }
    }, [navigate]);

    const createQuery = () => {
        navigate('/CreateQuery');
    }

    useEffect(() => {
        getQueries();
    }, []);

    const applyFilter = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            let filterInput = document.getElementById('filterInput').value;
            console.log('filterInput- ', filterInput)
            setQueries([]);
            const response = await fetch(`https://zenclass-ticketing-system-for-query.onrender.com/api/queries/${userId}/${role}/${filterInput}`);
            const data = await response.json();
            // setQueries(data.queries);
            setQueries(data.queries.map((query, index) => ({ ...query, key: index })));
            setRecentQuery(data.recentQuery);
            setLoading(false);
            console.log('success ')
        } catch (error) {
            console.error('Error fetching queries:', error);
            setError(error);
            setLoading(false);
        }
    };

    const getQueries = async () => {
        try {
            const response = await fetch(`https://zenclass-ticketing-system-for-query.onrender.com/api/queries/${userId}/${role}`);
            const data = await response.json();
            // setQueries(data.queries);
            setQueries(data.queries.map((query, index) => ({ ...query, key: index })));
            setRecentQuery(data.recentQuery);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching queries:', error);
            setError(error);
            setLoading(false);
        }
    };

    function getStatusStyle(status) {
        let color, backgroundColor;
        switch (status) {
            case 'closed':
                color = 'white';
                backgroundColor = 'green';
                break;
            case 'assigned':
                color = 'white';
                backgroundColor = 'blue';
                break;
            case 'pending':
                color = 'white';
                backgroundColor = 'red';
                break;
            default:
                color = 'black';
                backgroundColor = 'white';
        }
        return { color, backgroundColor };
    }
    async function fetchDataAndNavigate(queryId) {
        try {
            const response = await fetch(`https://zenclass-ticketing-system-for-query.onrender.com/api/query/${queryId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch query data');
            }
            const data = await response.json();
            const queryData = data.query;
            navigate(`/query/${queryData._id}`, { state: { queryData } });
        } catch (error) {
            console.error('Error:', error);
        }
    }
    const handleAssignClick = async (queryId) => {
        navigate(`/assign/${queryId}`);
    };
    const handleCloseModal = () => {
        setSelectedQuery(null);
    };

    //To close query by mentor
    const closeQuery = async (queryId) => {
        fetch(`https://zenclass-ticketing-system-for-query.onrender.com/api/closeQuery/${queryId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ queryId: queryId })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                alert(data.message);
                getQueries();
                //  window.location.reload();
            })
            .catch(error => {
                console.error('There was a problem closing query', error);
            });

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
        < >
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

                <div className="container text-center m-3" id='myQueriesContainer'>
                    <form className="myQueriesFilterform mt-4 align-self-center" onSubmit={applyFilter}>
                        <button type='submit'>
                            <svg width="40" height="20" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="search">
                                <path d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9" stroke="currentColor" strokeWidth="1.333" strokeLinecap="round" strokeLinejoin="round"></path>
                            </svg>
                        </button>
                        <input className="input" placeholder="EX : QNo/Title" type="text" id='filterInput' onChange={applyFilter} />
                        <button className="reset" type="reset">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                    </form>

                    {loading ? (
                        <div className="loadercard">
                            <div className="loader_card__skeleton loader_card__title"></div>
                            <div className="loader_card__skeleton loader_card__description"></div>
                        </div>
                    ) : queries.length === 0 ? (
                        <div className='card' id='myQueriesCard1'>
                            <p className="text-body-secondary">No Queries to display.</p>
                        </div>
                    ) : (
                        queries.map(query => (
                            <>
                                <div className='m-1' id='myQueriesCard1' key={query._id}>
                                    <button onClick={() => fetchDataAndNavigate(query._id)} key={query._id} id='myQueryButton'>
                                        <div className='card-my-query text-white' key={query._id}>
                                            <div id='card1row'>
                                                <span id='myQueriesCard1QT'>QN{query.queryNumber} - {query.title}
                                                    <div id='card1status' style={getStatusStyle(query.status)}>{query.status}</div>
                                                </span>
                                            </div>
                                            <br />
                                            <div className='row' id='placementcreated'>
                                                <span id='categoryDet'> {query.category}</span>
                                                <span id='created'> {formatDate(query.created)}</span>
                                            </div>
                                            {role === 'mentor' && (
                                                <>
                                                    <br />
                                                    <span id='userPhn'> Phn - {query.userPhn}</span>
                                                </>
                                            )}
                                        </div>
                                    </button>
                                    {role === 'admin' && (
                                        <div className='d-flex justify-content-center align-self-center mb-2 mt-1 ms-1 me-1'>
                                            {query.status === 'assigned' ? (
                                                <button key={`assign_${query._id}`} className="btn btn-secondary">
                                                    Assigned
                                                </button>
                                            ) : (
                                                query.status === 'closed' ? (
                                                    <>
                                                        <button key={`assign_${query._id}`} className="btn btn-success">
                                                            Closed
                                                        </button>
                                                        <br />
                                                    </>
                                                ) : (
                                                    <>
                                                        <button onClick={() => handleAssignClick(query._id)} key={`assign_${query._id}`} className="btn btn-primary">
                                                            Assign
                                                        </button>
                                                        <br />
                                                    </>
                                                )
                                            )}
                                        </div>
                                    )}
                                    {role === 'mentor' && (
                                        query.status === 'closed' ? (
                                            <div>
                                                <button key={`assign_${query._id}`} className="btn btn-success">
                                                    Closed
                                                </button>
                                            </div>
                                        ) : (
                                            <div>
                                                <button onClick={() => closeQuery(query._id)} key={`assign_${query._id}`} className="btn btn-danger">
                                                    Close Query
                                                </button>
                                            </div>
                                        )
                                    )}
                                </div>
                            </>
                        ))
                    )}
                </div >

                <div className="container text-center" id='myQueriesContainer2'>
                    {loading ? (
                        <div className='card mt-3' id='myQueriesCard2'>
                            <div id='loader' style={{ display: 'flex', justifyContent: 'center', alignSelf: 'center' }}>
                                <div className="loader"></div>
                            </div>
                        </div>
                    ) : recentQuery ? (
                        <div className='card mt-3 text-white' id='myQueriesCard2' style={{ padding: '20px' }}>
                            <div id='recentQuery'>
                                <span>Recent Query</span>
                            </div>
                            <div className='text-white' id='recentQueryHeader'>
                                <span>QN{recentQuery.queryNumber} - {recentQuery.title}</span>
                                <span id='status' style={getStatusStyle(recentQuery.status)}>{recentQuery.status}</span>
                            </div>
                            <hr />
                            <div className='row text-white'>
                                <div className='text-white' id='detrow'>
                                    <span id='createdAt'> Created at:</span>
                                    <span id='createdAt'> Assigned to:</span>
                                </div>
                                <div className='text-white' id='detrow'>
                                    <span>{formatDate(recentQuery.created)}</span>
                                    <span>{recentQuery.mentorName} </span>
                                </div>
                            </div>
                            <br />
                            <div className='text-white' id='desc'>
                                <span className="text-body-secondary">Description:</span>
                            </div>
                            <div className='text-white' id='desc'>
                                <span>{recentQuery.desc}</span>
                            </div>
                            <br />
                            <div className="attachment-container">
                                <p className="text-body-secondary">Attachment:</p>
                                <br />
                                {recentQuery.attachment === '' ? (
                                    <>
                                    </>
                                ) : (
                                    <div id='imagePreview' style={{ paddingLeft: '10px' }}>
                                        <br />
                                        {recentQuery.attachment && (
                                            <img
                                                src={recentQuery.attachment}
                                                style={{ height: '100px', width: '100px' }}
                                                onLoad={handleLoadImage}
                                                alt="Attachment"
                                            />
                                        )}
                                    </div>
                                )}
                            </div>
                            <div id='goToQuery'>
                                <Link to={`/query/${recentQuery._id}`} className="btn btn-primary">Go to query</Link>
                            </div>
                        </div>
                    ) : (
                        <div className='card mt-3' id='myQueriesCard2'>
                            <p className="text-body-secondary">No recent query.</p>
                        </div>
                    )}

                </div>
            </div >
        </>
    )
}

export default MyQueries