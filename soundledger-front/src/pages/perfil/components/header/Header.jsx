import "./Header.css";
import {useNavigate} from "react-router-dom";

export default function Header () {

    const navigate = useNavigate();

    const handleClickHome = () => {
        navigate("/");
    }

    const handleClickFormCadastroMusica = () => {
        navigate('/cadastromusica');
    }

    return(<header className="header">
        <div className="logo">
            <img src="src/assets/logo.png" alt="Logo" className="logo-img" onClick={handleClickHome}/>
        </div>

        <nav className="nav">
            <a onClick={handleClickFormCadastroMusica}>Cadastrar Música</a>
            <button className="btn-logout" onClick={handleClickHome}>Logout</button>
        </nav>
    </header>);
}