import Link from 'next/link'

export default function Footer() {
    return (
        <footer style={{
            background: '#0F172A',
            color: 'white',
            padding: '5rem 1rem 2rem',
            marginTop: 'auto',
            borderTop: '4px solid var(--pk-brand-secondary)'
        }}>
            <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '4rem' }}>

                <div>
                    <div style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '1.5rem', color: 'white' }}>
                        Casa Fácil <span style={{ color: 'var(--pk-brand-secondary)' }}>MZ</span>
                    </div>
                    <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1rem', lineHeight: 1.7, maxWidth: '300px' }}>
                        A maior e mais confiável plataforma de imóveis em Tete.
                        Conectamos donos e inquilinos com segurança e transparência.
                    </p>
                </div>

                <div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.5rem', color: 'white', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Navegação</h3>
                    <nav style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <Link href="/" style={{ color: 'rgba(255,255,255,0.8)', transition: 'color 0.2s' }}>Início</Link>
                        <Link href="/about" style={{ color: 'rgba(255,255,255,0.8)' }}>Quem Somos</Link>
                        <Link href="/how-it-works" style={{ color: 'rgba(255,255,255,0.8)' }}>Como Funciona</Link>
                        <Link href="/contact" style={{ color: 'rgba(255,255,255,0.8)' }}>Contactos</Link>
                    </nav>
                </div>

                <div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.5rem', color: 'white', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Legal</h3>
                    <nav style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <Link href="/terms" style={{ color: 'rgba(255,255,255,0.8)' }}>Termos de Uso</Link>
                        <Link href="/privacy" style={{ color: 'rgba(255,255,255,0.8)' }}>Política de Privacidade</Link>
                    </nav>
                </div>

                <div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.5rem', color: 'white', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Contacto</h3>
                    <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.95rem', marginBottom: '0.5rem' }}>📍 Cidade de Tete, Moçambique</p>
                    <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.95rem', marginBottom: '0.5rem' }}>📞 +258 86 744 3081</p>
                    <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.95rem' }}>✉️ contacto@casafacilmz.com</p>
                </div>

            </div>

            <div className="container" style={{
                textAlign: 'center',
                marginTop: '5rem',
                paddingTop: '2rem',
                borderTop: '1px solid rgba(255,255,255,0.1)',
                fontSize: '0.9rem',
                color: 'rgba(255,255,255,0.5)'
            }}>
                &copy; {new Date().getFullYear()} Casa Fácil MZ. Todos os direitos reservados.
                <div style={{ marginTop: '0.5rem' }}>
                    Desenvolvido com ❤️ para a Província de Tete.
                </div>
            </div>
        </footer>
    )
}
