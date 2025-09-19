import './Footer.css'

export default function Footer() {
    return (
        <footer className="site-footer">
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