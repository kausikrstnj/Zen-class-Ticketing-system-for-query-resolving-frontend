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


    useEffect(() => {
        getAllAssignedQueries();
    }, []);

    //To get queries from DB
    const getAllAssignedQueries = async () => {
        try {
            const response = await fetch(`https://zenclass-ticketing-system-for-query.onrender.com/api/getAllAssignedQueries`);
            const data = await response.json();
            setQueries(data.query);
        } catch (error) {
            console.error('Error fetching queries:', error);
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



                <div className="container text-center" id='myQueriesContainer'>
                    <h3>Assigned Queries</h3>

                    {queries.length === 0 ? (
                        <div className='card' id='myQueriesCard1'>
                            <p className="text-body-secondary">No Queries to display.</p>
                        </div>
                    ) : (
                        queries.map(query => (
                            <div className='card' id='myQueriesCard1'>

                                <div className='card-my-query' key={query._id}>
                                    <div id='card1row'>
                                        <span id='myQueriesCard1QT'>QN{query.queryNumber} - {query.title}
                                            <div id='card1status' >Assigned To:{query.mentorName}</div>
                                        </span>

                                    </div>
                                    <br />
                                    <div className='row' id='placementcreated' >
                                        <span id='categoryDet'> {query.category}</span>
                                        <span id='created'> {formatDate(query.created)}</span>
                                        < span id='userPhn'> Phn - {query.userPhn}</span>
                                    </div>

                                </div>


                            </div>
                        )
                        )
                    )}
                </div >
            </div >
        </>
    )
}
export default AssignedQueries