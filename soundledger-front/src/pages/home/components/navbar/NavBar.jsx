import './NavBar.css'

export default function Navbar() {
    return (
        <main className="main-content">
            <section className="hero-section">
                <h1>Distribua corretamente seus royalties</h1>
                <p>Com a SoundLedger, seus direitos autorais estão mais seguros e seus contratos são feitos de forma transparente e justa para que você tenha retorno completo das suas produções musicais.</p>
                <div className="hero-image-placeholder">
                    [Imagem de um estúdio de música]
                </div>
            </section>

            <section className="features-section">
                <h2>Para todos os colaboradores na produção musical</h2>
                <div className="features-grid">
                    <div className="feature-card">[Imagem de um artista]<h3>Artista/Intérprete</h3></div>
                    <div className="feature-card">[Imagem de um compositor]<h3>Compositor/Produtor</h3></div>
                    <div className="feature-card">[Imagem de um engenheiro de som]<h3>Gravadora</h3></div>
                </div>
            </section>

            <section className="info-section">
                <h2>Pensado para independentes e gigantes</h2>
                <div className="info-grid">
                    <div className="info-card">
                        <div className="info-card-image-placeholder">[Imagem de um home studio]</div>
                        <h3>Para aqueles artistas independentes</h3>
                        <p>Deixando de lado a necessidade de ter contrato com gravadoras para terem seus ganhos.</p>
                    </div>
                    <div className="info-card">
                        <div className="info-card-image-placeholder">[Imagem de um estúdio profissional]</div>
                        <h3>Para aqueles artistas em contrato com gravadoras</h3>
                        <p>Potencializando ao máximo a transparência de contratos.</p>
                    </div>
                </div>
            </section>

            <section className="testimonials-section">
                <h2>Veja as opiniões de quem usa</h2>
                <div className="testimonials-grid">
                    <div className="testimonial-card">
                        <p className="quote">“Já consigo ver meus royalties imediatamente”</p>
                        <div className="author">
                            <div className="avatar-placeholder"></div>
                            <span>Paulo - Artista</span>
                        </div>
                    </div>
                    <div className="testimonial-card">
                        <p className="quote">“Chega de enrolação em contratos”</p>
                        <div className="author">
                            <div className="avatar-placeholder"></div>
                            <span>Ricardo - Compositor</span>
                        </div>
                    </div>
                    <div className="testimonial-card">
                        <p className="quote">“O que mais me impressionou foi a clareza dos relatórios”</p>
                        <div className="author">
                            <div className="avatar-placeholder"></div>
                            <span>Clara - Produtora</span>
                        </div>
                    </div>
                </div>
            </section>

        </main>
    );
}
