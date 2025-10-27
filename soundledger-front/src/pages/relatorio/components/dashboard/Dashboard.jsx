import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import ReportCard from './components/reportcard/ReportCard.jsx';
import {fetchData} from "../../../../service/api.js";

// Importe mais componentes de relatórios específicos

// Dados simulados
const mockReports = [
    { id: 1, title: 'Total de Royalties Arrecadados', value: 'R$ 15.450,00', trend: '+12% (Últimos 30 dias)', type: 'summary' },
    { id: 2, title: 'Músicas Registradas', value: '452', trend: '+5 Novas', type: 'summary' },
    { id: 4, title: 'Visualizações Totais', value: '2.3M', trend: '', type: 'summary' },
];

export default function Dashboard() {
    // Estado para armazenar os dados reais, obtidos de uma API
    const [reportsData, setReportsData] = useState(mockReports);

    useEffect(() => {
        // Aqui você faria a chamada à API para buscar os dados
        fetchData().then(data => setReportsData(data));
     }, []);

    return (
        <div className="dashboard-page-container">
            <h1>Registros Musicais</h1>
            <p className="dashboard-subtitle">Visão geral do desempenho e royalties.</p>

            {/* Seção 1: Indicadores Chave (Layout Grid) */}
            <section className="key-metrics-grid">
                {reportsData.map(report => (
                    <ReportCard
                        key={report.id}
                        title={report.title}
                        value={report.value}
                        trend={report.trend}
                        type={report.type}
                    />
                ))}
            </section>

            {/* Seção 3: Tabela de Últimos Registros (Componente separado) */}
            <section className="recent-activity-table">
                <h2>Atividade Recente</h2>
                {/* Aqui você renderizaria um componente de tabela */}
                {/* <RecentRegistrationsTable /> */}
                <p>Tabela de músicas recém-registradas...</p>
            </section>
        </div>
    );
}