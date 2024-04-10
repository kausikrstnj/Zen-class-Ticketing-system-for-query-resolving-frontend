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
        labels: ['Total Queries'],
        datasets: [
            {
                backgroundColor: 'purple',
                data: [totalQueries], // totalQueries is the count of queries
            },
        ],
    };

    const pendingQuerieschartData = {
        labels: ['Pending Queries'],
        datasets: [
            {
                backgroundColor: 'red',
                data: [pendingQueries], // totalQueries is the count of queries
            },
        ],
    };

    const assignedQuerieschartData = {
        labels: ['Assigned Queries'],
        datasets: [
            {
                backgroundColor: 'blue',
                data: [assignedQueries], // totalQueries is the count of queries
            },
        ],
    };

    const resolvedQuerieschartData = {
        labels: ['Resolved Queries'],
        datasets: [
            {
                backgroundColor: 'lightgreen',
                data: [resolvedQueries], // totalQueries is the count of queries
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
            const response = await fetch(`http://localhost:3000/api/queries/${userId}/${role}`);
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

                <div className="container text-center" id='tiles'>
                    <h3>Dashboard</h3>
                    <hr />
                    <div className="row" id='tileCardRow' style={{ backgroundColor: 'white' }}>
                        {role == 'student' || 'admin' ? (
                            <div className="card" id='tileCard'>
                                <h5>Total Queries</h5>
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
                            <div className="card" id='tileCard' style={{ backgroundColor: 'white' }}>
                                <h5 >Pending Queries</h5>
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

                        <div className="card" id='tileCard' style={{ backgroundColor: 'white' }}>
                            <h5>Resolved Queries</h5>
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
                            <div className="card" id='tileCard' style={{ backgroundColor: 'white' }}>
                                <h5> Assigned to me</h5>
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
                    <hr />
                </div>
            </div>
        </>
    );
}

export default Home;
