import React from "react";
import './Header.css';

export default function Header() {

    return(
        <header className="header">
            {/* Logo */}
            <div className="logo">
                <img src="src/assets/logo.png" alt="Logo" className="logo-img" />
            </div>

            {/* Links */}
            <nav className="nav">
                <a href="#quem-somos">Quem somos?</a>
                <a href="#login">Login</a>
                <button className="btn-cadastro">Cadastre-se</button>
            </nav>
        </header>
    );
}
