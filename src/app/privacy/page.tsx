export default function PrivacyPage() {
    return (
        <div className="container" style={{ padding: '4rem 1rem', maxWidth: '800px' }}>
            <h1 style={{ marginBottom: '2rem', color: 'var(--pk-brand-primary)' }}>Política de Privacidade</h1>

            <div style={{ lineHeight: 1.8, color: 'var(--pk-text-secondary)' }}>
                <p style={{ marginBottom: '1rem' }}>
                    Coletamos apenas os dados necessários para o funcionamento da plataforma:
                </p>
                <ul style={{ listStyle: 'disc', paddingLeft: '1.5rem', marginBottom: '2rem' }}>
                    <li>Nome</li>
                    <li>Contacto</li>
                    <li>Endereço do imóvel</li>
                    <li>Fotografias do imóvel</li>
                </ul>

                <h2 style={{ fontSize: '1.3rem', marginBottom: '1rem', color: 'var(--pk-text-primary)' }}>Uso dos Dados</h2>
                <p style={{ marginBottom: '1rem' }}>Os dados:</p>
                <ul style={{ listStyle: 'disc', paddingLeft: '1.5rem', marginBottom: '2rem' }}>
                    <li>Não são vendidos</li>
                    <li>Não são partilhados com terceiros sem consentimento</li>
                    <li>São usados apenas para fins comerciais dentro da plataforma</li>
                </ul>

                <p>
                    Utilizamos medidas técnicas para proteger as informações armazenadas.
                </p>
            </div>
        </div>
    )
}
