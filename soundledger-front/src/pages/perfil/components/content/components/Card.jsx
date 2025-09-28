import React from 'react';
import './Card.css'; // Estilos do card de produto

export default function Card({ title, description }) {
    return (
        <div className="card">
            <h3>{title}</h3>
            <p>{description}</p>
            <button className="btn-report">Ver relatório</button>
        </div>
    );
}