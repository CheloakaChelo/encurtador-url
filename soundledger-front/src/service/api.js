// API da CoinGecko para buscar o preço do Ethereum em BRL
const COINGECKO_URL = 'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=brl';

/**
 * Busca a cotação atual de ETH para BRL.
 */
export const fetchEthBrlRate = async () => {
    try {
        const response = await fetch(COINGECKO_URL);
        if (!response.ok) {
            throw new Error('Erro ao buscar cotação da CoinGecko');
        }
        const data = await response.json();

        // O retorno será algo como: { "ethereum": { "brl": 18000.50 } }
        return data.ethereum.brl;

    } catch (error) {
        console.error("Falha ao buscar cotação:", error);
        return null; // Retorna nulo em caso de erro
    }
};

/**
 * Busca os dados do seu dashboard (agora com ETH bruto).
 */
export const fetchData = async () => {
    // Simulação da sua API
    // O backend agora retorna o valor bruto em ETH (número)
    const mockData = [
        {
            id: 1,
            title: 'Total de Royalties Arrecadados',
            // Agora é um NÚMERO em ETH, não uma string em BRL
            value: 2.5, // Ex: 2.5 ETH
            trend: '+0.2 ETH (Últimos 30 dias)',
            type: 'summary',
            // Adicionamos uma flag para saber que este deve ser convertido
            currency: 'ETH'
        },
        { id: 2, title: 'Músicas Registradas', value: '452', trend: '+5 Novas', type: 'summary' },
        { id: 4, title: 'Visualizações Totais', value: '2.3M', trend: '', type: 'summary' },
    ];

    // Simula atraso de rede
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(mockData);
        }, 500);
    });
};