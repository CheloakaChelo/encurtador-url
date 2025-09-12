import React from "react";
import {Container, AppBar, ToolBar, Button, Box} from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import { useNavigate } from 'react-router-dom';

function Header() {
    const navigate = useNavigate();

    const handleClickLogin = () => {
        navigate();
    };

    const handleClickCadastro = () => {
        navigate();
    }

    return(
        <header className="header">
            {/* Logo */}
            <div className="logo">
                <img src="/logo.png" alt="Logo" className="logo-img" />
                <span className="logo-text">Sound Ledger</span>
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
export default Header;