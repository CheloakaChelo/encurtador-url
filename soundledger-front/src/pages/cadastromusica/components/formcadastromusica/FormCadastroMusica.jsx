import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from "../../../../Config.js";
import './FormCadastroMusica.css';

function FormCadastroMusica() {
    const navigate = useNavigate();

    const [musicaData, setMusicaData] = useState({
        isrc: '',
        titulo: '',
        artistaPrincipalId: ''
    });

    const [detentores, setDetentores] = useState([
        { usuarioId: '', split: 0 }
    ]);

    const [listaUsuarios, setListaUsuarios] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    navigate('/login');
                    return;
                }

                const response = await axios.get(config.apiUrl + '/user/listar', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                setListaUsuarios(response.data);
            } catch (err) {
                console.error("Erro ao cadastrar música:", err);
                if (err.response) {
                    setError(err.response.data.message || 'Erro ao cadastrar a música.');
                } else if (err.request) {
                    setError('Erro de rede: Não foi possível cadastrar a música.');
                } else {
                    setError('Ocorreu um erro ao enviar o formulário.');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [navigate]);

    const handleChangeMusica = (e) => {
        const { id, value } = e.target;
        setMusicaData(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    const handleChangeDetentor = (index, e) => {
        const { name, value } = e.target;
        const novosDetentores = [...detentores];

        novosDetentores[index][name] = value;

        setDetentores(novosDetentores);
    };

    const handleAddDetentor = () => {
        setDetentores([
            ...detentores,
            { usuarioId: '', split: 0 }
        ]);
    };

    const handleRemoveDetentor = (index) => {
        if (detentores.length <= 1) return;

        const novosDetentores = detentores.filter((_, i) => i !== index);
        setDetentores(novosDetentores);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        setIsSubmitting(true);

        const payloadFinal = {
            ...musicaData,
            detentoresDireitos: detentores
        };

        console.log("Enviando para API:", payloadFinal);

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(config.apiUrl + '/musica/cadastrar-isrc', payloadFinal, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 200) {
                alert('Música cadastrada com sucesso!');
                navigate('/profile');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Erro ao cadastrar a música.');
        } finally {
            setIsSubmitting(false);
        }
    };


    if (loading) {
        return <p>Carregando usuários...</p>;
    }

    return (
        <div className="register-container">
            <main className="register-content">
                <div className="form-section">
                    <h1>Cadastrar Música</h1>

                    {error && <div className="form-error-message">{error}</div>}

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="titulo">Título da Música</label>
                            <input
                                type="text"
                                id="titulo"
                                placeholder="Ex: Adult Swim"
                                value={musicaData.titulo}
                                onChange={handleChangeMusica}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="isrc">ISRC</label>
                            <input
                                type="text"
                                id="isrc"
                                placeholder="Ex: USUM71817098"
                                value={musicaData.isrc}
                                onChange={handleChangeMusica}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="artistaPrincipalId">Artista Principal</label>
                            <select
                                id="artistaPrincipalId"
                                value={musicaData.artistaPrincipalId}
                                onChange={handleChangeMusica}
                                required
                            >
                                <option value="" disabled>Selecione um artista</option>
                                {listaUsuarios.map(user => (
                                    <option key={user.id} value={user.id}>{user.nome}</option>
                                ))}
                            </select>
                        </div>

                        <hr className="divider" />

                        <h2 className="detentores">Detentores de Direitos</h2>

                        {detentores.map((detentor, index) => (
                            <div key={index} className="participant-form">
                                <h4>Participante {index + 1}</h4>
                                <div className="form-group">
                                    <label htmlFor={`detentor-user-${index}`}>Usuário</label>
                                    <select
                                        id={`detentor-user-${index}`}
                                        name="usuarioId"
                                        value={detentor.usuarioId}
                                        onChange={(e) => handleChangeDetentor(index, e)}
                                        required
                                    >
                                        <option value="" disabled>Selecione um usuário</option>
                                        {listaUsuarios.map(user => (
                                            <option key={user.id} value={user.id}>{user.nome}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor={`detentor-split-${index}`}>Split (%)</label>
                                    <input
                                        type="number"
                                        id={`detentor-split-${index}`}
                                        name="split"
                                        placeholder="Ex: 50"
                                        value={detentor.split}
                                        onChange={(e) => handleChangeDetentor(index, e)}
                                        required
                                        min="0"
                                        max="100"
                                    />
                                </div>
                                {detentores.length > 1 && (
                                    <button
                                        type="button"
                                        className="btn-remove"
                                        onClick={() => handleRemoveDetentor(index)}
                                    >
                                        Remover
                                    </button>
                                )}
                            </div>
                        ))}

                        <button
                            type="button"
                            className="btn-add"
                            onClick={handleAddDetentor}
                        >
                            Adicionar Participante
                        </button>

                        <button type="submit" className="submit-button" disabled={isSubmitting}>
                            {isSubmitting ? 'Cadastrando...' : 'Cadastrar Música'}
                        </button>
                    </form>
                </div>

                <div className="image-section">

                </div>
            </main>
        </div>
    );
}

export default FormCadastroMusica;