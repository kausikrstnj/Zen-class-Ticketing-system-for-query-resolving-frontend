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
                                    <svg onMouseOver={'Dashboard'} xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-house" viewBox="0 0 16 16">
                                        <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z" />
                                    </svg>
                                </div>
                            </Link>
                        </li>
                        <hr />
                        {role === 'student' ? (
                            <li>
                                <Link to={`/CreateQuery/${userId}`} className="nav-link text-white" >
                                    {/* <span className="icon"><i className="bi bi-plus-square-fill"></i></span>
                                    <span className="text">Create Query</span> */}
                                    <div className="text navtext">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="18"
                                            height="18"
                                            fill="currentColor"
                                            className="bi bi-create-query"
                                            viewBox="0 0 16 16">
                                            <path d="M11 1H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2zm1 12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v10z" />
                                            <path d="M8 7.5v-2a.5.5 0 0 0-1 0v2H5.5a.5.5 0 0 0 0 1H7v2a.5.5 0 0 0 1 0v-2h1.5a.5.5 0 0 0 0-1H8z" />
                                        </svg>
                                    </div>
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
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" classname="bi bi-person-raised-hand" viewBox="0 0 16 16">
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
                                    <div>
                                        <svg fill="currentColor" width="18px" height="18px" viewBox="0 0 16 16" id="Layer_1" xmlns="http://www.w3.org/2000/svg">
                                            <g id="SVGRepo_bgCarrier" ></g>
                                            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                            <g id="SVGRepo_iconCarrier"> <defs> </defs>
                                                <circle cx="11" cy="15.5" r="1.5"></circle>
                                                <path d="M12,12H10V8h2a2,2,0,0,0,0-4H10A2.0023,2.0023,0,0,0,8,6v.5H6V6a4.0045,4.0045,0,0,1,4-4h2a4,4,0,0,1,0,8Z"></path>
                                                <path d="M22.4479,21.0337A10.971,10.971,0,0,0,19.9211,4.7446l-.999,1.73A8.9967,8.9967,0,1,1,5,14H3a10.9916,10.9916,0,0,0,18.0338,8.4478L28.5859,30,30,28.5859Z" transform="translate(0 0)"></path>
                                                <rect id="_Transparent_Rectangle_" className="cls-1" width="32" height="32" transform="translate(32 32) rotate(-180)"></rect>
                                            </g>
                                        </svg>
                                    </div>
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
                                                <g stroke-width="3" stroke="null" id="svg_1">
                                                    <path stroke="null" id="svg_2" d="m15.07658,2.88695c-1.72703,-1.63015 -3.9018,-2.50792 -6.26847,-2.50792s-4.6054,0.87777 -6.26847,2.50792c-0.25586,0.25079 -0.25586,0.68968 0,0.87777c0.25586,0.18809 0.63964,0.18809 0.8955,0c1.47117,-1.44205 3.32613,-2.19443 5.30901,-2.19443c1.98288,0 3.9018,0.81507 5.30901,2.19443c2.94234,2.88411 2.94234,7.58645 0,10.47056c-1.40721,1.44205 -3.32613,2.19443 -5.30901,2.19443c-1.98288,0 -3.9018,-0.81507 -5.30901,-2.19443c-0.25586,-0.25079 -0.63964,-0.25079 -0.8955,0c-0.25586,0.25079 -0.25586,0.62698 0,0.87777c1.72703,1.63015 3.9018,2.50792 6.26847,2.50792s4.6054,-0.75238 6.26847,-2.44522c1.66306,-1.69284 2.55856,-3.82457 2.55856,-6.1444c0,-2.31982 -0.83153,-4.51425 -2.55856,-6.1444z" />
                                                    <path stroke="null" id="svg_3" d="m3.37117,8.96865c0,-0.37619 -0.25586,-0.62698 -0.63964,-0.62698l-1.72703,0c-0.38378,0 -0.63964,0.25079 -0.63964,0.62698s0.25586,0.62698 0.63964,0.62698l1.72703,0c0.38378,0 0.63964,-0.25079 0.63964,-0.62698z" />
                                                    <path stroke="null" id="svg_4" d="m4.45856,8.96865c0,0.37619 0.25586,0.62698 0.63964,0.62698l5.18108,0l-2.94234,2.88411c-0.25586,0.25079 -0.25586,0.62698 0,0.87777c0.12793,0.1254 0.25586,0.18809 0.44775,0.18809c0.19189,0 0.31982,-0.0627 0.44775,-0.18809l3.96577,-3.88727c0.12793,-0.1254 0.19189,-0.25079 0.19189,-0.43889c0,-0.18809 -0.06396,-0.31349 -0.12793,-0.37619c-0.06396,-0.0627 -0.12793,-0.1254 -0.19189,-0.18809l-3.83784,-3.76188c-0.25586,-0.25079 -0.63964,-0.25079 -0.8955,0c-0.25586,0.25079 -0.25586,0.62698 0,0.87777l2.81441,2.75871l-5.05315,0c-0.38378,0 -0.63964,0.25079 -0.63964,0.62698z" />
                                                </g>
                                            </g>
                                        </svg>
                                    </div>
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
