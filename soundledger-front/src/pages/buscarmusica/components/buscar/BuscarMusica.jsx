import React, { useState } from 'react';

import apiUrl from "../../../../Config.js";

function BuscaMusica() {
    // Estados para guardar o que o usuário digita
    const [artista, setArtista] = useState('');
    const [titulo, setTitulo] = useState('');

    // Estados para guardar o resultado da busca, loading e erros
    const [resultado, setResultado] = useState(null); // Pode ser o ISRC ou um objeto com mais dados
    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState(null);

    // Função chamada quando o botão de busca é cliclado
    const handleBusca = async (event) => {
        event.preventDefault(); // Impede o recarregamento da página (comportamento padrão do form)
        setLoading(true);
        setErro(null);
        setResultado(null);

        // --- A CHAMADA PARA O SEU BACKEND ---
        try {
            // Substitua pela URL correta do seu endpoint no backend Spring Boot
            const backendUrl = apiUrl + `api/musicas/buscar?artista=${encodeURIComponent(artista)}&titulo=${encodeURIComponent(titulo)}`;

            const response = await fetch(backendUrl);

            if (!response.ok) {
                // Se a resposta não for OK (ex: 404, 500), lança um erro
                const errorData = await response.json(); // Tenta pegar a mensagem de erro do backend
                throw new Error(errorData.message || `Erro ${response.status} ao buscar música.`);
            }

            const data = await response.json(); // Pega os dados JSON da resposta do backend

            // Atualiza o estado com o resultado
            setResultado(data); // 'data' pode ser só o ISRC ou um objeto { isrc: '...', nome: '...' }

        } catch (error) {
            console.error("Erro ao buscar música:", error);
            setErro(error.message);
        } finally {
            setLoading(false); // Termina o estado de loading, independentemente do resultado
        }
        // --- FIM DA CHAMADA ---
    };

    return (
        <div>
            <h2>Buscar Música no Catálogo</h2>
            <form onSubmit={handleBusca}>
                <div>
                    <label htmlFor="artistaInput">Artista:</label>
                    <input
                        id="artistaInput"
                        type="text"
                        value={artista}
                        onChange={(e) => setArtista(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="tituloInput">Título da Música:</label>
                    <input
                        id="tituloInput"
                        type="text"
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Buscando...' : 'Buscar'}
                </button>
            </form>

            {/* Exibição dos Resultados */}
            {loading && <p>Carregando...</p>}
            {erro && <p style={{ color: 'red' }}>Erro: {erro}</p>}
            {resultado && (
                <div>
                    <h3>Resultado:</h3>
                    {/* Adapte conforme a estrutura do 'resultado' que seu backend retorna */}
                    <p>ISRC Encontrado: {resultado.isrc || resultado}</p>
                    {resultado.nome && <p>Nome: {resultado.nome}</p>}
                    {resultado.artista && <p>Artista: {resultado.artista}</p>}
                    {/* Você pode adicionar um botão aqui para confirmar e chamar o cadastro */}
                </div>
            )}
        </div>
    );
}

export default BuscaMusica;