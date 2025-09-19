import './FormCadastro.css'
import {useState} from "react";

function FormCadastro() {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: '',
        artistName: '',
        otherRole: '',
    });

    // Função para atualizar o estado quando o usuário digita
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [id]: value,
        }));
    };

    // Função para lidar com o envio do formulário
    const handleSubmit = (e) => {
        e.preventDefault();
        // Aqui você enviaria os dados (formData) para sua API ou backend
        console.log('Dados do formulário:', formData);
        alert('Cadastro enviado! Verifique o console para ver os dados.');
    };

    return(
        <>
            <div className="register-container">

                <main className="register-content">
                    <div className="form-section">
                        <h1>Cadastre-se</h1>
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