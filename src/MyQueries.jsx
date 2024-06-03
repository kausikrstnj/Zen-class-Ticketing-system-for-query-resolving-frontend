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
    const [originalQueries, setOriginalQueries] = useState([]);
    const [recentQuery, setRecentQuery] = useState(null);
    const [phn, setPhn] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [imgSrc, setImgSrc] = useState('');
    const [postImg, setPostImg] = useState({});
    const [filterCriteria, setFilterCriteria] = useState('');
    const [filterInput, setFilterInput] = useState('');

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

    // const applyFilter = async (event) => {
    //     setLoading(true);
    //     try {
    //         let filterInput = document.getElementById('filterInput').value;
    //         console.log('filterInput- ', filterInput)
    //         setQueries([]);
    //         const response = await fetch(`https://zenclass-ticketing-system-for-query.onrender.com/api/queries/${userId}/${role}/${filterInput}`);
    //         const data = await response.json();
    //         setQueries(data.queries.map((query, index) => ({ ...query, key: index })));
    //         setLoading(false);
    //         console.log('success ')
    //     } catch (error) {
    //         console.error('Error fetching queries:', error);
    //         setError(error);
    //         setLoading(false);
    //     }
    // };

    const handleFilterChange = (e) => {
        const input = e.target.value;
        setFilterInput(input);
        const filteredQueries = originalQueries.filter(query =>
            query.queryNumber.toString().includes(input) ||
            query.title.toLowerCase().includes(input.toLowerCase())
        );
        setQueries(filteredQueries);
    };

    const getQueries = async () => {
        try {
            const response = await fetch(`https://zenclass-ticketing-system-for-query.onrender.com/api/queries/${userId}/${role}`);
            const data = await response.json();
            setOriginalQueries(data.queries);
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

                <div className="container text-center m-3" id='myQueriesContainer'>
                    <form className="myQueriesFilterform mt-4 align-self-center"
                        onSubmit={(e) => e.preventDefault()}>
                        <button type='submit'>
                            <svg width="40" height="20" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="search">
                                <path d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9" stroke="currentColor" strokeWidth="1.333" strokeLinecap="round" strokeLinejoin="round"></path>
                            </svg>
                        </button>
                        <input style={{ fontFamily: 'sans-serif', fontWeight: '100' }} className="input" placeholder="EX : QNo/Title" type="text" id='filterInput' onChange={handleFilterChange} />
                    </form>

                    {loading ? (
                        <div className="loadercard">
                            <div className="loader_card__skeleton loader_card__title"></div>
                            <div className="loader_card__skeleton loader_card__description"></div>
                        </div>
                    ) : queries.length === 0 ? (
                        <div className='card  text-white' id='myQueriesCard1'>
                            <p className="">No Queries to display.</p>
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
                        <div className='card mt-3'
                            id='myQueriesCard2'
                            style={{ padding: '20px' }}>
                            <div class="spinner"></div>
                        </div>
                    ) : recentQuery ? (
                        <div className='card mt-3 text-white' id='myQueriesCard2' style={{ padding: '20px' }}>
                            <div id='recentQuery'>
                                <span> <b>Recent Query</b> </span>
                            </div>
                            <div className='text-white' id='recentQueryHeader'>
                                <span> <b>QN{recentQuery.queryNumber}</b>  - {recentQuery.title}</span>
                                <span id='status' style={getStatusStyle(recentQuery.status)}>{recentQuery.status}</span>
                            </div>
                            <hr />
                            <div className='row text-white'>
                                <div className='text-white' id='detrow'>
                                    <span id='createdAt'> <b>Created at:</b> </span>
                                    <span id='createdAt'> <b>Assigned to:</b> </span>
                                </div>
                                <div className='text-white' id='detrow'>
                                    <span>{formatDate(recentQuery.created)}</span>
                                    <span>{recentQuery.mentorName} </span>
                                </div>
                            </div>
                            <br />
                            <div className='text-white' id='desc'>
                                <span id='createdAt'> <b>Description:</b> </span>
                            </div>
                            <div className='text-white' id='desc'>
                                <span>{recentQuery.desc}</span>
                            </div>
                            <br />
                            <div className="attachment-container">
                                <span id='createdAt'> <b>Attachment:</b> </span>

                                <br />
                                {recentQuery.attachment === '' ? (
                                    <>
                                    </>
                                ) : (
                                    <div id='imagePreview' style={{ paddingLeft: '10px' }}>
                                        {/* <br /> */}
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
                        </div>
                    ) : (
                        <div className='card mt-3' id='myQueriesCard2'>
                            <p className="text-white">No recent query.</p>
                        </div>
                    )}

                </div>
            </div >
        </>
    )
}

export default MyQueries