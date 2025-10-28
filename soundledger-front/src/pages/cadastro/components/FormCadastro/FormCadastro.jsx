import './FormCadastro.css'
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import apiUrl from "../../../../Config.js";
import axios from "axios";

const buildApiPayload = (formData) => {
    const payload = {
        nome: formData.name,
        email: formData.email,
        senha: formData.password,
        roles: [],
        perfilArtista: null,
        perfilProdutor: null,
        perfilCompositor: null,
    };

    const rolesSet = new Set();

    // 1. Mapeia a role principal
    if (formData.role === 'artist1') rolesSet.add('ARTISTA');
    if (formData.role === 'composer1') rolesSet.add('COMPOSITOR');
    if (formData.role === 'producer1') rolesSet.add('PRODUTOR');
    if (formData.role === 'label1') rolesSet.add('GRAVADORA');

    // 2. Mapeia a role secundária
    if (formData.otherRole === 'artist') rolesSet.add('ARTISTA');
    if (formData.otherRole === 'composer') rolesSet.add('COMPOSITOR');
    if (formData.otherRole === 'producer') rolesSet.add('PRODUTOR');

    // Converte o Set para o array final
    payload.roles = Array.from(rolesSet);

    // 3. Constrói os perfis aninhados
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

    // Limpa perfis nulos (opcional, mas mais limpo)
    if (!payload.perfilArtista) delete payload.perfilArtista;
    if (!payload.perfilProdutor) delete payload.perfilProdutor;
    if (!payload.perfilCompositor) delete payload.perfilCompositor;

    return payload;
};

function FormCadastro() {

    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        senha: '',
        role: '',
        artistName: '',
        otherRole: '',
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

        const apiData = buildApiPayload(formData)

        console.log('Dados do formulário:', apiData);
        alert('Cadastro enviado! Verifique o console para ver os dados.');

        try {
            const response = await axios.post(apiUrl + "/register", formData);

            if (response.status == 201){
                console.log('Cadastro realizado:', response.data);
                navigate('/login');
            }

        } catch (e) {
            console.error("Erro no cadastro: ", e);

            if (e.response) {

                setError(e.response.data.message || 'Erro: Verifique seus dados.');
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
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="name">Nome</label>
                                <input
                                    type="text"
                                    id="name"
                                    placeholder="Jane"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Endereço de e-mail</label>
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="email@dominio.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Senha</label>
                                <input
                                    type="password"
                                    id="password"
                                    placeholder="Senha"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="role">Função</label>
                                <select id="role" value={formData.role} onChange={handleChange} required>
                                    <option value="" disabled>Selecione</option>
                                    <option value="artist1">Artista/Intérprete</option>
                                    <option value="composer1">Compositor</option>
                                    <option value="producer1">Produtor</option>
                                    <option value="label1">Gravadora</option>
                                </select>
                            </div>
                            {formData.role && (
                                <>
                                    <div className="form-group">
                                        <label htmlFor="artistName">{formData.role === 'label' ? 'Nome da Gravadora' : 'Nome Artístico'}</label>
                                        <input
                                            type="text"
                                            id="artistName"
                                            placeholder={formData.role === 'label' ? 'Ex: Sua Gravadora' : 'Ex: Smitherton'}
                                            value={formData.artistName}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="otherRole">Alguma outra função?</label>
                                        <select id="otherRole" value={formData.otherRole} onChange={handleChange}>
                                            <option value="" disabled>Selecione</option>
                                            {formData.role === 'artist1' ? null : <option value="artist">Artista</option>}
                                            {formData.role === 'composer1' ? null : <option value="composer">Compositor</option>}
                                            {formData.role === 'producer1' ? null : <option value="producer">Produtor</option>}
                                        </select>
                                    </div>
                                </>
                            )}
                            <button type="submit" className="submit-button">Cadastrar</button>
                        </form>
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