import React from 'react'
import { Link, useNavigate, useLocation, useParams } from 'react-router-dom';
import './Home.css'
import { useState, useEffect } from 'react';
import axios from 'axios';




function Assign() {
    const location = useLocation();
    const userId = localStorage.getItem('userId');
    const { queryId } = useParams();
    const isAuthenticated = localStorage.getItem('jwt') ? true : false;
    const role = localStorage.getItem('role');
    const navigate = useNavigate();
    const [mentor, setMentor] = useState([]);
    useEffect(() => {
        getMentors();
        if (!localStorage.getItem('jwt')) {
            navigate('/IntroPage');
        }
    }, [navigate]);

    const getMentors = async () => {
        try {
            const response = await axios.get('https://zenclass-ticketing-system-for-query.onrender.com/api/mentors');
            const data = response.data;
            setMentor(data.Mentors);
        } catch (error) {
            console.error('Error:', error);
        }
    }


    //To assign mentor for a query
    const AssignToMentor = (event) => {
        const mentorId = event.target.value; // Extract the value from the button clicked
        fetch(`https://zenclass-ticketing-system-for-query.onrender.com/api/assignMentor/${mentorId}/${queryId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ mentorId: mentorId, queryId: queryId })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                alert(data.message);
                navigate(`/queries/${userId}`);
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });

    };



    return (
        <div className='container' id='assignToMentor'>
            <b id='mentorListHeader' >Mentor List</b>
            {mentor.length === 0 ? (
                <div className='card' >
                    <span id='Heading'>No mentors available.</span>
                </div>
            ) : (
                mentor.map(m => (
                    <div key={m._id} id='mentorList'>
                        <label htmlFor={`mentor_${m._id}`}>{m.name}</label>
                        <button id='assignMentor' value={m._id} className='btn btn-primary' onClick={AssignToMentor}> Assign</button>
                    </div>
                ))
            )}


        </div >
    )
}

export default Assign