import './FormLogin.css';
import {useState} from "react";
import {useNavigate} from "react-router-dom";

function FormLogin () {
    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleClickCadastro = () => {
      navigate('/register');
    }

    const handleSubmit = (event) => {
        event.preventDefault();

    }

    return(
        <>
            <div className="login-container">
            <main className="login-content">
                <div className="form-section-login">
                    <h1>Login</h1>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="email">Endereço de e-mail</label>
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="email@dominio.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Senha</label>
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" className="submit-button">Login</button>
                        </form>
                    <p className="register-prompt">
                        Não possui cadastro? <a onClick={handleClickCadastro}>Cadastre-se</a>
                    </p>
                </div>
                <div className="image-section-login">
                    {/* [Imagem de um show com muitas luzes e confete] */}
                </div>
            </main>
            </div>
        </>
    );
}
export default FormLogin;