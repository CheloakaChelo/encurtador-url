import React from "react";
import './Header.css';

export default function Header() {

    return(
        <header className="header">
            {/* Logo */}
            <div className="logo">
                <img src="../../../../assets/logo.png" alt="Logo" className="logo-img" />
            </div>

            {/* Links */}
            <nav className="nav">
                <button className="btn-cadastro">Login</button>
            </nav>
        </header>
    );
}