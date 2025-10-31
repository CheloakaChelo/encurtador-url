import React from 'react';
import './Card.css';
import {useNavigate} from "react-router-dom";



export default function Card({id, title, description }) {

    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate(`/rel`);
    }

    return (
        <div className="card">
            <h3>{title}</h3>
            <p>{description}</p>
            <button className="btn-report" onClick={handleNavigate}>Ver relatório</button>
        </div>
    );
}