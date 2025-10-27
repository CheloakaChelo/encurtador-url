import React from 'react';
import './ReportCard.css';

export default function ReportCard({ title, value, trend, type }) {
    // Lógica para determinar a cor do trend, se necessário
    const trendColor = trend.includes('+') ? 'trend-positive' : 'trend-neutral';

    return (
        <div className={`report-card ${type}`}>
            <p className="card-title">{title}</p>
            <h3 className="card-value">{value}</h3>
            <span className={`card-trend ${trendColor}`}>{trend}</span>
        </div>
    );
}