import "./Header.css";
import {useNavigate} from "react-router-dom";

export default function Header () {

    const navigate = useNavigate();

    const handleClickHome = () => {
        navigate("/home");
    }

    return(<header className="header">
        <div className="logo">
            <img src="src/assets/logo.png" alt="Logo" className="logo-img" onClick={handleClickHome}/>
        </div>

        <nav className="nav">
            <a >Cadastrar Música</a>
            <a >Meus Registros</a>
            <button className="btn-logout">Logout</button>
        </nav>
    </header>);
}