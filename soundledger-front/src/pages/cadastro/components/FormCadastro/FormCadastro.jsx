import './FormCadastro.css'
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import config from "../../../../Config.js"; // Certifique-se que este caminho está correto
import axios from "axios";

// A função buildApiPayload está 100% correta.
const buildApiPayload = (formData) => {
    const payload = {
        nome: formData.name,
        email: formData.email,
        senha: formData.password,
        enderecoCarteira: formData.walletAddress,
        roles: [],
        perfilArtista: null,
        perfilProdutor: null,
        perfilCompositor: null,
    };

    const rolesSet = new Set();

    if (formData.role === 'artist1') rolesSet.add('ARTISTA');
    if (formData.role === 'composer1') rolesSet.add('COMPOSITOR');
    if (formData.role === 'producer1') rolesSet.add('PRODUTOR');
    if (formData.role === 'label1') rolesSet.add('GRAVADORA');

    if (formData.otherRole === 'artist') rolesSet.add('ARTISTA');
    if (formData.otherRole === 'composer') rolesSet.add('COMPOSITOR');
    if (formData.otherRole === 'producer') rolesSet.add('PRODUTOR');

    payload.roles = Array.from(rolesSet);

    if (payload.roles.includes('ARTISTA')) {
        payload.perfilArtista = {
            nomeArtistico: formData.artistName,
            generoMusical: formData.generoMusical,
        };
    }
    if (payload.roles.includes('COMPOSITOR')) {
        payload.perfilCompositor = {
            nomeArtistico: formData.artistName,
        };
    }
    if (payload.roles.includes('PRODUTOR')) {
        payload.perfilProdutor = {
            estudio: formData.estudio,
            experiencia: formData.experiencia,
        };
    }

    if (!payload.perfilArtista) delete payload.perfilArtista;
    if (!payload.perfilProdutor) delete payload.perfilProdutor;
    if (!payload.perfilCompositor) delete payload.perfilCompositor;

    return payload;
};

// --- Início do Componente ---

function FormCadastro() {

    // O useState está correto (com os campos extras)
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        senha: '',
        role: '',
        walletAddress: '',
        artistName: '',
        otherRole: '',
        generoMusical: '',
        estudio: '',
        experiencia: '',
    });

    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [id]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const apiData = buildApiPayload(formData);
        console.log('Dados que serão enviados para a API:', apiData);

        try {
            const response = await axios.post(config.apiUrl + "/user/cadastrar", apiData);

            if (response.status === 201){
                console.log('Cadastro realizado:', response.data);
                navigate('/login');
            }

        } catch (e) {
            console.error("Erro no cadastro: ", e);
            if (e.response) {
                setError(e.response.data.message || e.response.data.error || 'Erro: Verifique seus dados.');
            } else if (e.request) {
                setError('Erro de rede: O servidor não respondeu.');
            } else {
                setError('Erro ao enviar o formulário.');
            }
        }
    };

    return(
        <>
            <div className="register-container">
                <main className="register-content">
                    <div className="form-section">
                        <h1>Cadastre-se</h1>
                        {error && (
                            <div className="form-error-message">
                                {error}
                            </div>
                        )}

                        {/* --- CORREÇÃO NO FORMULÁRIO (JSX) --- */}
                        <form onSubmit={handleSubmit}>
                            {/* Campos Pessoais */}
                            <div className="form-group">
                                <label htmlFor="name">Nome</label>
                                <input type="text" id="name" placeholder="Jane" value={formData.name} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Endereço de e-mail</label>
                                <input type="email" id="email" placeholder="email@dominio.com" value={formData.email} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Senha</label>
                                <input type="password" id="password" placeholder="Senha" value={formData.password} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="walletAddress">Endereço de Carteira</label>
                                <input type="walletAddress" id="walletAddress" placeholder="Endereço de Carteira" value={formData.walletAddress} onChange={handleChange} required />
                            </div>

                            {/* Campo de Função Principal */}
                            <div className="form-group">
                                <label htmlFor="role">Função Principal</label>
                                <select id="role" value={formData.role} onChange={handleChange} required>
                                    <option value="" disabled>Selecione</option>
                                    <option value="artist1">Artista/Intérprete</option>
                                    <option value="composer1">Compositor</option>
                                    <option value="producer1">Produtor</option>
                                    <option value="label1">Gravadora</option>
                                </select>
                            </div>

                            {/* Nome Artístico/Gravadora (Aparece para Artista, Compositor ou Gravadora) */}
                            {(formData.role === 'artist1' || formData.role === 'composer1' || formData.role === 'label1' || formData.otherRole === 'artist' || formData.otherRole === 'composer') && (
                                <div className="form-group">
                                    <label htmlFor="artistName">{formData.role === 'label1' ? 'Nome da Gravadora' : 'Nome Artístico'}</label>
                                    <input
                                        type="text" id="artistName"
                                        placeholder={formData.role === 'label1' ? 'Ex: Sua Gravadora' : 'Ex: Smitherton'}
                                        value={formData.artistName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            )}

                            {/* Gênero Musical (Aparece SÓ para Artista) */}
                            {(formData.role === 'artist1' || formData.otherRole === 'artist') && (
                                <div className="form-group">
                                    <label htmlFor="generoMusical">Gênero Musical</label>
                                    <input
                                        type="text" id="generoMusical"
                                        placeholder="Ex: Boombap, Rap"
                                        value={formData.generoMusical}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            )}

                            {/* Campos de Produtor (Aparece SÓ para Produtor) */}
                            {(formData.role === 'producer1' || formData.otherRole === 'producer') && (
                                <>
                                    <div className="form-group">
                                        <label htmlFor="estudio">Estúdio (Opcional)</label>
                                        <input
                                            type="text" id="estudio"
                                            placeholder="Nome do seu estúdio"
                                            value={formData.estudio}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="experiencia">Experiência (Opcional)</label>
                                        <input
                                            type="text" id="experiencia"
                                            placeholder="Ex: 5 anos de produção"
                                            value={formData.experiencia}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </>
                            )}

                            {/* Campo de Outra Função (ajustado) */}
                            {formData.role && (
                                <div className="form-group">
                                    <label htmlFor="otherRole">Função Secundária (Opcional)</label>
                                    <select id="otherRole" value={formData.otherRole} onChange={handleChange}>
                                        <option value="">Nenhuma</option>
                                        {formData.role === 'artist1' ? null : <option value="artist">Artista</option>}
                                        {formData.role === 'composer1' ? null : <option value="composer">Compositor</option>}
                                        {formData.role === 'producer1' ? null : <option value="producer">Produtor</option>}
                                    </select>
                                </div>
                            )}

                            <button type="submit" className="submit-button">Cadastrar</button>
                        </form>
                        {/* --- FIM DO FORMULÁRIO --- */}

                        <p className="login-prompt">
                            Já possui cadastro? <a href="/login">Login</a>
                        </p>
                    </div>
                    <div className="image-section">
                        {/* [Imagem de um estúdio com guitarras] */}
                    </div>
                </main>
            </div>
        </>
    );
}

export default FormCadastro;