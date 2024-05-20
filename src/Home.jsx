import React, { useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Home.css'
import { useState } from 'react';
import { Bar, Line } from "react-chartjs-2";
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

    const searchData = {
        labels: ['Query 1', 'Query 2', 'Query 3', 'Query 4', 'Query 5'],
        datasets: [
            {
                backgroundColor: [
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(255, 206, 86, 0.5)',
                    'rgba(75, 192, 192, 0.5)',
                    'rgba(153, 102, 255, 0.5)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)'
                ],
                borderWidth: 1,
                data: [300, 200, 150, 100, 50],
            }
        ]
    };

    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'Resolution Rate (%)',
                data: [80, 85, 90, 88, 92, 89, 91, 93, 95, 94, 96, 97],
                borderColor: 'blue',
                backgroundColor: 'rgba(0, 0, 255, 0.1)',
                pointBackgroundColor: 'blue',
                pointBorderColor: 'blue',
                pointHoverBackgroundColor: 'blue',
                pointHoverBorderColor: 'blue',
            },
        ],
    };

    const data1 = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'Avg Response Time (minutes)',
                data: [15, 14, 13, 12, 11, 10, 8, 8, 7, 6, 6, 6],
                borderColor: 'green',
                backgroundColor: 'rgba(0, 255, 0, 0.1)',
                pointBackgroundColor: 'green',
                pointBorderColor: 'green',
                pointHoverBackgroundColor: 'green',
                pointHoverBorderColor: 'green',
            },
        ],
    };



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
                                <span className="text">Dashboard</span>
                            </Link>
                        </li>
                        <hr />
                        {role === 'student' ? (
                            <li>
                                <Link to={`/CreateQuery/${userId}`} className="nav-link text-white" >
                                    <span className="icon"><i className="bi bi-plus-square-fill"></i></span>
                                    <span className="text">Create Query</span>
                                </Link>
                                <hr />
                            </li>
                        ) : (
                            <></>
                        )}
                        {role == 'admin' ? (
                            <li>
                                <Link to={`/queries/${userId}`} className="nav-link text-white">
                                    <span className="icon"> All Queries</span>
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

                {
                    totalQueries.length === 0 && pendingQueries.length === 0 && assignedQueries.length === 0 && resolvedQueries.length === 0 ? (
                        <div id='editProfile'>
                            <div class="loader"></div>
                        </div>

                    ) : (
                        <div className="container text-center" id='tiles'>

                            <div className='tilesContainer'>

                                {role == 'student' || 'admin' ? (

                                    <div class="tileCard" >
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

                            <div className='chartContainer' >
                                <div className='chart' style={{ padding: '20px', width: '50%', boxSizing: 'border-box' }}>
                                    <h5>Resolution Rate of Ticketing System</h5>
                                    <Line height={45} width={'100%'} data={data} />
                                </div>

                                <div className='chart' style={{ padding: '20px', width: '50%', boxSizing: 'border-box' }}>
                                    <h5>Avg Response Time of Ticketing System</h5>
                                    <Line height={45} width={'100%'} data={data1} />
                                </div>
                            </div>

                        </div>
                    )}





            </div >
        </>
    );
}

export default Home;
