import React, {useEffect, useState} from 'react';
import './ProfileContent.css';
import Card from './components/Card';

import config from "../../../../Config.js";
import axios from "axios";
import {jwtDecode} from "jwt-decode";
import { useNavigate } from 'react-router-dom';

export default function ProfileContent() {

    const [musica, setMusicas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {

        const fetchAllData = async () => {
            try {
                const token = localStorage.getItem('token');

                if (!token) {
                    setError('Não autenticado. Faça login novamente.');
                    navigate('/login');
                    return;
                }

                const decodedToken = jwtDecode(token);

                const id_user = decodedToken.user;

                if (!id_user) {
                    throw new Error("Token inválido. Não foi possível encontrar o ID do usuário.");
                }

                const authHeaders = {
                    'Authorization': `Bearer ${token}`
                };
                const fetchHeaders = {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                };

                const [userResponse, musicasResponse] = await Promise.all([
                    axios.get(config.apiUrl + "/user/listar/" + id_user, { headers: authHeaders }),
                    fetch(config.apiUrl + '/musica/buscar/' + id_user, { headers: fetchHeaders })
                ]);

                const userData = userResponse.data;

                let musicasData
                if (musicasResponse.status === 204){
                    musicasData = [];
                } else if (!musicasResponse.ok) {
                    if (musicasResponse.status === 403 || musicasResponse.status === 401) {
                        throw new Error('Sessão expirada. Faça login novamente.');
                    }
                    throw new Error('Falha ao buscar músicas');
                } else {
                    musicasData = await musicasResponse.json();
                }


                setData(userData);
                setMusicas(musicasData);

            } catch (err) {
                console.error("Erro ao buscar dados do perfil:", err);
                if (err.response) {
                    setError(err.response.data.message || "Falha ao carregar dados do usuário.");
                } else if (err.message) {
                    setError(err.message);
                } else {
                    setError("Ocorreu um erro inesperado.");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchAllData();

    }, [navigate]);

    if (loading) {
        return <p>Carregando perfil...</p>
    }

    if (error){
        return <p>Erro: {error}</p>
    }

    const musicasValidas = musica.filter(item => item && item.id && item.titulo);

    return (
        <div className="profile-content-container">
            <section className="profile-info-section">
                <h1>Nome: {data ? data.nome : 'Carregando...'}</h1>
            </section>

            <hr className="divider" />

            <section className="music-section">
                <div className="music-header">
                    <h2>Músicas</h2>
                </div>

                <div className="products-grid">
                    {musicasValidas.length > 0 ? musicasValidas.map((musicaItem) => (
                        <Card
                            key={musicaItem.id}
                            id={musicaItem.id}
                            title={musicaItem.titulo}
                            description={musicaItem.artista}
                        />
                    )) : (<p className="nenhuma-musica">Nenhuma música cadastrada</p>)
                    }
                </div>
            </section>
        </div>
    );
}