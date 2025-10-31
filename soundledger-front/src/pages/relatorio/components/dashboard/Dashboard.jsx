import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import ReportCard from './components/reportcard/ReportCard.jsx';
import {fetchData, fetchEthBrlRate} from "../../../../service/api.js";


function formatoToBRL(value) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value);
}

function formatNumber(value) {
    if(value >= 1000000) {
        return (value / 1000000).toFixed(1) + 'M';
    }
    if (value >= 10000) {
        return (value / 10000).toFixed(1) + 'k';
    }
    return value.toString();
}

export default function Dashboard() {

    const [summaryData, setSummaryData] = useState([]);
    const [musicas, setMusicas] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadDashboard = async () => {
            try {
                const [musicasData, ethRate] = await Promise.all([
                    fetchData(),
                    fetchEthBrlRate()
                ]);

                setMusicas(musicasData);

                const totalMusicas = musicasData.length;

                const totalPlays = musicasData.reduce((sum, musicas) => {
                    return sum + (musicas.totalPlaysDaMusica || 0);
                }, 0);

                const totalEth = musicasData.reduce((sum, musicas) => {
                    return sum + parseFloat(musicas.saldoDoUsuarioEth || 0);
                }, 0);

                const totalBRL = totalEth * ethRate;

                const newSummaryData = [
                    {
                        id: 1,
                        title: 'Total de Royalties (BRL)',
                        value: formatoToBRL(totalBRL),
                        trend: totalEth.toFixed(4) + ' ETH'
                    },
                    {
                        id: 2,
                        title: 'Musicas Registradas',
                        value: totalMusicas.toString(),
                        trend: ''
                    },
                    {
                        id: 4,
                        title: 'Visualizações Totais',
                        value: formatNumber(totalPlays),
                        trend: ''
                    }
                ];

                setSummaryData(newSummaryData);

            } catch (err) {
                console.error("Erro ao carregar o dashboard:" , err);
                setError("Falha ao carregar os dados. Tente novamente");
            } finally {
                setLoading(false);
            }
        };

        loadDashboard();
     }, []);

    if (loading) {
        return <p>Carregando dashboard...</p>;
    }

    if (error) {
        return <p>Erro: {error}</p>;
    }

    return (
        <div className="dashboard-page-container">
            <h1>Registros Musicais</h1>
            <p className="dashboard-subtitle">Visão geral do desempenho e royalties.</p>

            <section className="key-metrics-grid">
                {summaryData.map(report => (
                    <ReportCard
                        key={report.id}
                        title={report.title}
                        value={report.value}
                        trend={report.trend}
                        type={report.type}
                    />
                ))}
            </section>

            <section className="recent-activity-table">
                <h2>Suas Músicas</h2>
                {musicas.length > 0 ? (
                    <table>
                        <thead>
                        <tr>
                            <th>Título</th>
                            <th>Artista Principal</th>
                            <th>Total de Plays</th>
                            <th>Seu Saldo (ETH)</th>
                        </tr>
                        </thead>
                        <tbody>
                        {musicas.map(musica => (
                            <tr key={musica.musicaId}>
                                <td>{musica.titulo}</td>
                                <td>{musica.artistaPrincipalNome}</td>
                                <td>{musica.totalPlaysDaMusica}</td>
                                <td>{parseFloat(musica.saldoDoUsuarioEth).toFixed(6)} ETH</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                ) : (
                    <p>Nenhuma música registrada ainda.</p>
                )}
            </section>
        </div>
    );
}