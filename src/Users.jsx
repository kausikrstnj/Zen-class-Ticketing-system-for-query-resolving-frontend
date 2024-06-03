import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css'

function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            try {
                const response = await fetch('https://zenclass-ticketing-system-for-query.onrender.com/api/users', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${JSON.parse(localStorage.getItem('jwt')).token}`,
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setUsers(data);
                    setLoading(false);
                } else {
                    console.error('Error fetching users:', response.statusText);
                }
            } catch (error) {
                setLoading(false);
                console.error('Error fetching users:', error.message);
            }
        };

        fetchUsers();
    }, []);

    useEffect(() => {
        if (!localStorage.getItem('jwt')) {
            window.location.href = '/signin';
        }
    }, []);

    const handleAddUserClick = () => {
        const popupWindow = window.open('/addUser', 'Add User', 'width=600,height=400');
        if (!popupWindow || popupWindow.closed || typeof popupWindow.closed === 'undefined') {
            alert('Please allow pop-ups for this website to add a user.');
        }
    };

    function openForm() {
        document.getElementById("myForm").style.display = "block";
    }

    function closeForm() {
        document.getElementById("myForm").style.display = "none";
    }

    return (
        <>
            {loading ? (
                <div id='editProfile'>
                    <div className="spinner"></div>
                </div>
            ) : users.length === 0 ? (
                <div id='editProfile'>
                    <p className="">No Users to display.</p>
                </div>
            ) : (
                <div className="container mt-5">
                    <div id='addUser'>
                        <div className='d-flex align-content-center'>
                            <h6 className="text-white fs-4">All Users</h6>
                        </div>
                        <Link type="button" className="btn btn-primary" to={`/addUser`}>+ Add User</Link>
                    </div>
                    <ul className="list-group mt-5" id='usersList'>
                        {users.map((item, i) => (
                            <Link to={`/user/${item._id}`} key={i} className="text-decoration-none">
                                <li className="list-group-item d-flex align-items-center justify-content-between userlist text-white rounded" >
                                    <div className="d-flex align-items-center">
                                        <div className="avatar">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
                                                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                                                <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                                            </svg>
                                        </div>
                                        <span className="ms-3">{item.name}</span>
                                    </div>
                                    <div>
                                        <i className="bi bi-arrow-right-circle"></i>
                                    </div>
                                </li>
                                <hr style={{ color: 'white' }} />
                            </Link>
                        ))}
                    </ul>
                </div >
            )}
        </>
    );
}

export default Users;
