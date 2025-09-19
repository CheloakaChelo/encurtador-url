import React from "react";
import './Header.css';
import {useNavigate} from "react-router-dom";

export default function Header() {

    const navigate = useNavigate();

    const handleClickCadastro = () => {
        navigate('/register');
    }

    const handleClickHome = () => {
        navigate('/home');
    }

    return(
        <header className="header">
            {/* Logo */}
            <div className="logo">
                <img src="src/assets/logo.png" alt="Logo" className="logo-img" onClick={handleClickHome} />
            </div>

            {/* Links */}
            <nav className="nav">
                <button className="btn-cadastro" onClick={handleClickCadastro}>Cadastre-se</button>
            </nav>
        </header>
    );
}