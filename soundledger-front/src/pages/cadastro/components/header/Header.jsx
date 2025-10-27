import React from "react";
import './Header.css';
import {useNavigate} from "react-router-dom";

export default function Header() {

    const navigate = useNavigate();

    const handleClickLogin = () => {
        navigate('/login');
    }

    const handleClickHome = () => {
        navigate('/');
    }

    return(
        <header className="header">
            {/* Logo */}
            <div className="logo">
                <img src="src/assets/logo.png" alt="Logo" className="logo-img" onClick={handleClickHome} />
            </div>

            {/* Links */}
            <nav className="nav">
                <button className="btn-cadastro" onClick={handleClickLogin}>Login</button>
            </nav>
        </header>
    );
}