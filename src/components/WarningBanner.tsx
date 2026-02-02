export default function WarningBanner() {
    return (
        <div style={{ background: '#FFF7ED', borderBottom: '1px solid #FED7AA', padding: '0.75rem', fontSize: '0.9rem', color: '#9A3412', textAlign: 'center' }}>
            <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <span>💡 O Casa Fácil MZ não aceita anúncios de terceiros sem autorização do proprietário.</span>
                <span>💡 Trabalhamos diretamente com os donos dos imóveis para sua maior segurança.</span>
            </div>
        </div>
    )
}
