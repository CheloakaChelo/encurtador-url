import './Footer.css'
import {useNavigate} from "react-router-dom";

export default function Footer() {

    const navigate = useNavigate();

    const handleClickLogin = () => {
        navigate('/login');
    }

    const handleClickCadastro = () => {
        navigate('/register');
    }

    return (
        <footer className="site-footer">
            <div className="footer-cta">
                <h2>Junte-se ao SoundLedger</h2>
                <div className="navigation-buttons">
                    <button className="btn-register" onClick={handleClickCadastro}>Cadastre-se</button>
                    <button className="btn-login" onClick={handleClickLogin}>Login</button>
                </div>
            </div>
            <div className="footer-content">
                <div className="footer-branding">
                    <svg className="logo-svg" width="180" height="30" viewBox="0 0 150 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <text x="0" y="20" fontFamily="Arial, sans-serif" fontSize="20" fontWeight="bold" fill="#111">
                            SoundLedger
                        </text>
                    </svg>
                </div>
            </div>
        </footer>
    );
}
