import React, { useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Home.css'
import { useState } from 'react';
import { Bar, Line } from "react-chartjs-2";
import Chart, { plugins } from "chart.js/auto";



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
                backgroundColor: 'blue',
                pointBackgroundColor: 'blue',
                pointBorderColor: 'blue',
                pointHoverBackgroundColor: 'blue',
                pointHoverBorderColor: 'blue',
                labelColor: 'white',

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
                backgroundColor: 'green',
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
                <div className="d-flex flex-column flex-shrink-1 p-2 text-white" id='sidebar'>
                    <ul className="nav nav-pills flex-column mb-auto mt-5 justify-items-center">
                        <li className="nav-item navcontents">
                            <Link to={`/`} className="nav-link p-1 navanchor">
                                <div className="text navtext">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-house" viewBox="0 0 16 16">
                                        <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z" />
                                    </svg>
                                </div>
                            </Link>
                        </li>
                        {role === 'student' ? (
                            <li className="nav-item navcontents">
                                <Link to={`/CreateQuery/${userId}`} className="nav-link p-1 navanchor" >
                                    <div className="text navtext">
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
                                    <div className="text navtext">
                                        all queries
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-card-text" viewBox="0 0 16 16">
                                            <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2z" />
                                            <path d="M3 5.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5M3 8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 8m0 2.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5" />
                                        </svg>
                                    </div>
                                </Link>
                            </li>

                        ) : (
                            <li className="nav-item navcontents">
                                <Link to={`/queries/${userId}`} className="nav-link p-1 navanchor">
                                    <div className="text navtext">
                                        {/* My Queries */}
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
                                    <div className="text navtext">
                                        {/* Assigned Queries */}
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

                {
                    totalQueries.length === 0 && pendingQueries.length === 0 && assignedQueries.length === 0 && resolvedQueries.length === 0 ? (
                        <div id='editProfile'>
                            <div class="loader"></div>
                        </div>

                    ) : (
                        <div className="container text-center" id='tiles'>

                            <div className='tilesContainer d-flex flex-row justify-content-center gap-4 w-100'>

                                {role == 'student' || 'admin' ? (

                                    <div className="tileCard" >
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

                                    <div className="tileCard">
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


                                <div className="tileCard">
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
                                    <div className="tileCard">
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

                            <div className='chartContainer d-flex flex-row gap-3 w-100 text-white' >
                                <div className='chart col p-3 w-50' >
                                    <h5>Resolution Rate of Ticketing System</h5>
                                    <Line height={45} width={'100%'} data={data} />
                                </div>

                                <div className='chart col p-3 w-50' >
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
