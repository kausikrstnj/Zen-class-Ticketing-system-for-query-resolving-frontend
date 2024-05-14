import React, { useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Home.css'
import { useState } from 'react';
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";



function Home() {
    const navigate = useNavigate();
    const location = useLocation();
    const isAuthenticated = localStorage.getItem('jwt') ? true : false;
    const userId = localStorage.getItem('userId');
    const role = localStorage.getItem('role');
    const [queries, setQueries] = useState([]);
    const [totalQueries, setTotalQueries] = useState(0);
    const [pendingQueries, setPendingQueries] = useState(0);
    const [assignedQueries, setAssignedQueries] = useState(0);
    const [resolvedQueries, setResolvedQueries] = useState(0);

    const totalQuerieschartData = {
        labels: [''],
        datasets: [
            {
                backgroundColor: 'purple',
                data: [totalQueries],
            },
        ],
    };

    const pendingQuerieschartData = {
        labels: [''],
        datasets: [
            {
                backgroundColor: 'red',
                data: [pendingQueries],
            },
        ],
    };

    const assignedQuerieschartData = {
        labels: [''],
        datasets: [
            {
                backgroundColor: 'blue',
                data: [assignedQueries],
            },
        ],
    };

    const resolvedQuerieschartData = {
        labels: [''],
        datasets: [
            {
                backgroundColor: 'lightgreen',
                data: [resolvedQueries],
            },
        ],
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

    const getQueries = async () => {
        try {
            const response = await fetch(`https://zenclass-ticketing-system-for-query.onrender.com/api/queries/${userId}/${role}`);
            const data = await response.json();
            setQueries(data.queries);
            setTotalQueries(data.totalQuery);
            setPendingQueries(data.pendingQuery);
            setAssignedQueries(data.assignedQueries);
            setResolvedQueries(data.resolvedQueries);
        } catch (error) {
            console.error('Error fetching queries:', error);
        }
    };

    return (
        <>
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
                                <Link to={`/CreateQuery/${userId}`} className="nav-link text-white" >
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

                {totalQueries.length === 0 && pendingQueries.length === 0 && assignedQueries.length === 0 && resolvedQueries.length === 0 ? (
                    <div id='editProfile'>
                        <div class="loader"></div>
                    </div>

                ) : (
                    <div className="container text-center" id='tiles'>

                        <div className="row" id='tileCardRow' >
                            {role == 'student' || 'admin' ? (

                                <div class="tileCard">
                                    <h6>Total Queries</h6>
                                    <Bar
                                        data={totalQuerieschartData}
                                        options={{
                                            plugins: {
                                                title: {
                                                    display: true,

                                                },
                                                legend: {
                                                    display: false
                                                }
                                            }
                                        }}
                                    />

                                </div>

                            ) : (
                                <></>
                            )}

                            {role == 'mentor' ? (
                                <></>
                            ) : (

                                <div class="tileCard">
                                    <h6>Pending Queries</h6>
                                    <Bar
                                        data={pendingQuerieschartData}
                                        options={{
                                            plugins: {
                                                title: {
                                                    display: true,

                                                },
                                                legend: {
                                                    display: false
                                                }
                                            }
                                        }}
                                    />
                                </div>
                            )}


                            <div class="tileCard">
                                <h6>Resolved Queries</h6>
                                <Bar
                                    data={resolvedQuerieschartData}
                                    options={{
                                        plugins: {
                                            title: {
                                                display: true,

                                            },
                                            legend: {
                                                display: false
                                            }
                                        }
                                    }}
                                />
                            </div>

                            {role === 'mentor' ? (
                                <div class="tileCard">
                                    <h6>Assigned Queries</h6>
                                    <Bar
                                        data={assignedQuerieschartData}
                                        options={{
                                            plugins: {
                                                title: {
                                                    display: true,

                                                },
                                                legend: {
                                                    display: false
                                                }
                                            }
                                        }}
                                    />
                                </div>
                            ) : (
                                <></>
                            )}

                        </div>

                    </div>)}
            </div>
        </>
    );
}

export default Home;
