import React from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import './Home.css'
import Filebase64 from 'react-file-base64'

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
        // Convert the file path to Blob object
        const blob = new Blob([recentQuery.attachment], { type: mimeType });
        // Read the file as a data URL (base64 string)
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

    const applyFilter = async (filterCriteria) => {
        setLoading(true);
        console.log('filterCriteria- ', filterCriteria)
        try {
            setQueries([]);
            const response = await fetch(`https://zenclass-ticketing-system-for-query.onrender.com/api/queries/${userId}/${role}/${filterCriteria}`);
            const data = await response.json();
            setQueries(data.queries);
            setRecentQuery(data.recentQuery);
            setLoading(false);
            console.log('success ')
        } catch (error) {
            console.error('Error fetching queries:', error);
            setError(error);
            setLoading(false);
        }
    };

    // Call this function whenever filter criteria change
    const handleFilterChange = async () => {
        event.preventDefault();
        let filterInput = document.getElementById('filterInput').value;
        console.log('filterInput- ', filterInput);
        applyFilter(filterInput);
    };


    const getQueries = async () => {
        try {
            const response = await fetch(`https://zenclass-ticketing-system-for-query.onrender.com/api/queries/${userId}/${role}`);
            const data = await response.json();
            setQueries(data.queries);
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
                <div className="d-flex flex-column flex-shrink-1 p-2 text-bg-dark" id='sidebar'>
                    <ul className="nav nav-pills flex-column mb-auto">
                        <li className="nav-item">
                            <Link to={`/`} className="nav-link text-white">
                                <span className="text">📊Dashboard</span>
                            </Link>
                        </li>
                        <hr />
                        {role === 'student' ? (
                            <li>
                                <Link to={`/CreateQuery/${userId}`} className="nav-link text-white" onClick={createQuery}>
                                    <span className="icon"><i className="bi bi-plus-square-fill"></i></span> {/* Example icon */}
                                    <span className="text">➕Create Query</span>
                                </Link>
                                <hr />
                            </li>
                        ) : (
                            <></>
                        )}
                        {role == 'admin' ? (
                            <li>
                                <Link to={`/queries/${userId}`} className="nav-link text-white">
                                    <span className="icon">📂All Queries</span>
                                </Link>
                                <hr />
                            </li>

                        ) : (
                            <li>
                                <Link to={`/queries/${userId}`} className="nav-link text-white">
                                    <span className="icon">📂My Queries</span>
                                </Link>
                                <hr />
                            </li>
                        )}

                        {role === 'admin' ? (<li>
                            <Link to={'/assignedQueries'} className="nav-link text-white">
                                <span className="icon">📦</span>
                                <span className="text">Queries Assigned</span>
                            </Link>
                            <hr />
                        </li>

                        ) : (
                            <></>
                        )}

                    </ul>
                </div>

                <div className="container text-center" id='myQueriesContainer'>
                    <form className="myQueriesFilterform">
                        <button onClick={() => handleFilterChange()}>
                            <svg width="40" height="20" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="search">
                                <path d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9" stroke="currentColor" stroke-width="1.333" stroke-linecap="round" stroke-linejoin="round"></path>
                            </svg>
                        </button>
                        <input className="input" placeholder="EX : QNo/Title" required="" type="text" id='filterInput' />
                        <button className="reset" type="reset">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
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
                                <div className='card' id='myQueriesCard1' key={query._id}>
                                    <button onClick={() => fetchDataAndNavigate(query._id)} key={query._id} id='myQueryButton'>
                                        <div className='card-my-query' key={query._id}>
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
                                        <div>
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
                        <div className='card' id='myQueriesCard2'>
                            <div id='editProfile'>
                                <div class="loader"></div>
                            </div>
                        </div>
                    ) : recentQuery ? (
                        <div className='card' id='myQueriesCard2'>
                            <div id='recentQuery'>
                                <span>Recent Query</span>
                            </div>
                            <div id='recentQueryHeader'>
                                <span>QN{recentQuery.queryNumber} - {recentQuery.title}</span>
                                <span id='status' style={getStatusStyle(recentQuery.status)}>{recentQuery.status}</span>
                            </div>
                            <hr />
                            <div className='row'>
                                <div id='detrow'>
                                    <span className="text-body-secondary" id='createdAt'> Created at:</span>
                                    <span className="text-body-secondary" id='createdAt'> Assigned to:</span>
                                </div>
                                <div id='detrow'>
                                    <span>{formatDate(recentQuery.created)}</span>
                                    <span>{recentQuery.mentorName} </span>
                                </div>
                            </div>
                            <br />
                            <div id='desc'>
                                <span className="text-body-secondary">Description:</span>
                            </div>
                            <div id='desc'>
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
                        <div className='card' id='myQueriesCard2'>
                            <p className="text-body-secondary">No recent query.</p>
                        </div>
                    )}

                </div>
            </div >
        </>
    )
}

export default MyQueries