import React, {useEffect, useState} from 'react';
import './ProfileContent.css';
import Card from './components/Card';

import apiUrl from "../../../../Config.js";


export default function ProfileContent() {
    const [musica, setMusicas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMusicas = async () => {
            try {
                const response = await fetch(apiUrl + '/musicas/listar');

                if (!response.ok) {
                    throw new Error('Falha ao buscar dados do servidor');
                }

                const data = await response.json();
                setMusicas(data);
            }catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchMusicas();
    }, []);

    if (loading) {
        return <p>Carregando músicas...</p>
    }

    if (error){
        return <p>Erro: {error}</p>
    }
    
    return (
        <div className="profile-content-container">
            <section className="profile-info-section">
                <h1>Perfil</h1>
                <p>Função</p>
            </section>

            <hr className="divider" />

            <section className="music-section">
                <div className="music-header">
                    <h2>Músicas</h2>
                    <button className="btn-view-list">Ver lista</button>
                </div>

                <div className="products-grid">
                    {musica.length > 0 ? musica.map((musica) => (
                        <Card
                            key={musica.id}
                            title={musica.title}
                            description={musica.description}
                        />
                    )) : (<p>Nenhuma música cadastrada</p>)
                    }
                </div>
            </section>
        </div>
    );
}