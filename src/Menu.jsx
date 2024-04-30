import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Home.css'
import { useState } from 'react';

function Menu() {
    const location = useLocation();
    const navigate = useNavigate();
    const isAuthenticated = localStorage.getItem('jwt') ? true : false;
    const role = localStorage.getItem('role');
    const signout = () => {
        localStorage.removeItem('jwt');
        navigate('/IntroPage');
    }
    const userId = localStorage.getItem('userId');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    }
    const handleItemClick = () => {
        setDropdownOpen(false);
    };

    return (
        <>

            <nav className="navbar navbar-expand-lg navbar-dark bg-dark" >
                <div className="container">
                    <Link className="navbar-brand" to="/">
                        <label id='zenclass'>Zen Class</label> <br />
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
                        {!isAuthenticated ? (
                            <ul className="navbar-nav">

                            </ul>
                        ) : (
                            <ul className="navbar-nav">
                                <li className="nav-item dropdown">
                                    <button style={{ backgroundColor: 'transparent', border: 'none' }} className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" onClick={toggleDropdown}>
                                        My Profile
                                    </button>
                                    <ul className={"dropdown-menu" + (dropdownOpen ? " show" : "")} >
                                        <li>
                                            <Link className={"dropdown-item" + (location.pathname === '/' ? ' active' : '')} to="/" onClick={handleItemClick}>Home</Link>
                                        </li>
                                        {role == 'admin' ? (
                                            <li>
                                                <Link className={"dropdown-item" + (location.pathname === '/users' ? ' active' : '')} to="/users" onClick={handleItemClick}>Users</Link>
                                            </li>
                                        ) : (
                                            <></>
                                        )}

                                        <li>
                                            <Link className={"dropdown-item" + (location.pathname === `/user/${userId}` ? ' active' : '')} to={`/user/${userId}`} onClick={handleItemClick}>My Profile</Link>
                                        </li>
                                        <li>
                                            <button className="dropdown-item" onClick={signout} >Sign Out</button>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        )}
                    </div>
                </div>
            </nav>

        </>
    );
}

export default Menu;
