export default function ContactPage() {
    return (
        <div className="container" style={{ padding: '4rem 1rem' }}>
            <h1 style={{ marginBottom: '3rem', color: 'var(--pk-brand-primary)', textAlign: 'center' }}>Contacte-nos</h1>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', maxWidth: '1000px', margin: '0 auto' }}>

                <div style={{ background: 'white', padding: '2rem', borderRadius: 'var(--pk-radius-md)', boxShadow: 'var(--pk-shadow-sm)' }}>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Nossa Localização</h2>
                    <p style={{ marginBottom: '0.5rem', fontSize: '1.1rem' }}>📍 <strong>Tete / Chingodzi</strong> – Moçambique</p>
                    <p style={{ color: 'var(--pk-text-secondary)', marginTop: '1rem' }}>
                        O Casa Fácil MZ atua inicialmente de forma local, com visitas presenciais organizadas mediante agendamento.
                    </p>
                    <p style={{ color: 'var(--pk-text-secondary)', marginTop: '0.5rem' }}>
                        Para encontros presenciais, o local será informado após o contacto inicial.
                    </p>
                </div>

                <div style={{ background: 'white', padding: '2rem', borderRadius: 'var(--pk-radius-md)', boxShadow: 'var(--pk-shadow-sm)' }}>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Canais de Atendimento</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div>
                            <span style={{ display: 'block', fontSize: '0.9rem', color: 'var(--pk-text-tertiary)' }}>Telefone / WhatsApp</span>
                            <a href="https://wa.me/258877771719" style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--pk-brand-primary)' }}>+258 87 777 1719</a>
                        </div>
                        <div>
                            <span style={{ display: 'block', fontSize: '0.9rem', color: 'var(--pk-text-tertiary)' }}>Email</span>
                            <a href="mailto:contato@casafacilmz.com" style={{ fontSize: '1.1rem' }}>contato@casafacilmz.com</a>
                        </div>
                    </div>

                    <div style={{ marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid var(--pk-surface-100)' }}>
                        <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>Horário de atendimento</h3>
                        <p>Segunda a Sexta — 08h às 17h</p>
                    </div>
                </div>

            </div>
        </div>
    )
}
