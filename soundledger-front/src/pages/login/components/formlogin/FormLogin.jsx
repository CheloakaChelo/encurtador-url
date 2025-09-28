import './FormLogin.css';
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import config from "../../../../Config.js";

function FormLogin () {
    localStorage.removeItem('token');
    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [setError] = useState('');

    const handleClickCadastro = () => {
      navigate('/register');
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            const response = await axios.post(config.apiUrl + '/auth/login',
                {email, senha},
                {headers: {'Content-Type': 'application/json'}}
            );
            const token = response.data.token;
            localStorage.setItem('token', token);
            const decodedToken = jwtDecode(token);
            const role = decodedToken.role;

            if (role.includes('ARTIST') && role.includes('COMPOSER') && role.includes('PRODUCER')){
                navigate('/profile');
                return;
            }
        }catch (erro) {
            console.error('Login failed', erro);
            setError('Credenciais inválidas. Tente novamente');
            setTimeout(() => {
                setError('');
            }, 3000);
        }

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
                                    value={senha}
                                    onChange={(e) => setSenha(e.target.value)}
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
                </div>
            </main>
            </div>

        </>
    );
}
export default FormLogin;