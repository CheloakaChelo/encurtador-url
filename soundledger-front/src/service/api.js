import axios from 'axios';
import config from "../Config.js";
import {jwtDecode} from "jwt-decode";


export const fetchEthBrlRate = async () => {
    const COINGECKO_URL = 'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=brl';

    try {
        const response = await fetch(COINGECKO_URL);

        if (!response.ok) {
            throw new Error('Erro ao buscar cotação da CoinGecko');
        }

        const data = await response.json();

        return data.ethereum.brl;

    } catch (error) {
        console.error("Falha ao buscar cotação ETH/BRL:", error);
        throw new Error('Não foi possível carregar a cotação do ETH.');
    }
};


export const fetchData = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
        throw new Error('Usuário não autenticado. Faça login novamente.');
    }

    let userId;
    try {
        const decodedToken = jwtDecode(token);
        userId = decodedToken.user;

        if (!userId) {
            throw new Error('Claim "user" (ID) não encontrada no token.');
        }
    } catch (e) {
        throw new Error('Token inválido ou expirado.', e);
    }

    const API_ENDPOINT = `${config.apiUrl}/dashboard/${userId}`;

    try {
        const response = await axios.get(API_ENDPOINT, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        return response.data;

    } catch (error) {
        console.error("Erro ao buscar dados do dashboard:", error);
        if (error.response) {
            throw new Error(error.response.data.message || 'Falha ao buscar dados do dashboard.');
        } else if (error.request) {
            throw new Error('Servidor não respondeu. Tente novamente.');
        } else {
            throw new Error('Erro ao configurar a requisição.');
        }
    }
};