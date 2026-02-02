export default function AboutPage() {
    return (
        <div className="container" style={{ padding: '4rem 1rem' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>

                <section style={{ marginBottom: '4rem' }}>
                    <h1 style={{ marginBottom: '1.5rem', color: 'var(--pk-brand-primary)' }}>Quem Somos</h1>
                    <div style={{ lineHeight: 1.8, color: 'var(--pk-text-secondary)', fontSize: '1.1rem' }}>
                        <p style={{ marginBottom: '1rem' }}>
                            O <strong>Casa Fácil MZ</strong> é uma plataforma digital criada para facilitar a venda e o aluguel de casas e terrenos em Moçambique, conectando diretamente proprietários e interessados de forma simples, transparente e segura.
                        </p>
                        <p style={{ marginBottom: '1rem' }}>
                            Nosso objetivo é reduzir a burocracia, evitar intermediários informais e trazer mais organização e confiança ao mercado imobiliário local, começando por atuações em nível municipal e expandindo gradualmente.
                        </p>
                        <p>
                            Atuamos como plataforma de divulgação, mediação e apoio comercial, respeitando as leis locais e trabalhando sempre com regras claras para todas as partes envolvidas.
                        </p>
                    </div>
                </section>

                <section>
                    <h2 style={{ marginBottom: '1.5rem', color: 'var(--pk-text-primary)' }}>O Que Fazemos</h2>
                    <div style={{ background: 'white', padding: '2rem', borderRadius: 'var(--pk-radius-md)', boxShadow: 'var(--pk-shadow-sm)', border: '1px solid var(--pk-surface-200)' }}>
                        <ul style={{ listStyle: 'none', display: 'grid', gap: '1rem' }}>
                            {[
                                "Divulgação de casas à venda",
                                "Divulgação de terrenos à venda",
                                "Divulgação de casas para aluguel",
                                "Mediação entre proprietário e interessado",
                                "Organização de visitas presenciais",
                                "Gestão de taxas e comissões conforme descrito nos termos"
                            ].map((item, i) => (
                                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    <span style={{ color: 'var(--pk-brand-success)', fontSize: '1.2rem' }}>✔</span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <p style={{ marginTop: '1.5rem', fontStyle: 'italic', color: 'var(--pk-text-tertiary)' }}>
                            O Casa Fácil MZ não é uma imobiliária tradicional, mas sim uma plataforma digital de intermediação e divulgação.
                        </p>
                    </div>
                </section>

            </div>
        </div>
    )
}
