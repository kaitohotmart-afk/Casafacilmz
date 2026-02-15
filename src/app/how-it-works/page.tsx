export default function HowItWorksPage() {
    return (
        <div className="container" style={{ padding: '4rem 1rem' }}>
            <h1 style={{ marginBottom: '3rem', color: 'var(--pk-brand-primary)', textAlign: 'center' }}>Como Funciona</h1>

            <div style={{ display: 'grid', gap: '2rem', maxWidth: '800px', margin: '0 auto' }}>

                {/* Proprietários (Venda) */}
                <div style={{ background: 'white', padding: '2rem', borderRadius: 'var(--pk-radius-md)', boxShadow: 'var(--pk-shadow-sm)', borderLeft: '4px solid var(--pk-brand-primary)' }}>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>🔹 Para Proprietários (Venda)</h2>
                    <ol style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', color: 'var(--pk-text-secondary)' }}>
                        <li>O proprietário cria uma conta.</li>
                        <li>Regista o imóvel (endereço, fotos, descrição).</li>
                        <li>O anúncio é aprovado automaticamente no início.</li>
                        <li style={{ marginTop: '0.5rem', fontWeight: 600 }}>Quando o imóvel for vendido:</li>
                        <ul style={{ listStyle: 'disc', paddingLeft: '1.5rem', marginTop: '0.25rem' }}>
                            <li>O Casa Fácil MZ cobra <strong>10%</strong> do valor da venda.</li>
                            <li>O valor é acordado previamente com o proprietário.</li>
                        </ul>
                    </ol>
                </div>

                {/* Proprietários (Aluguel) */}
                <div style={{ background: 'white', padding: '2rem', borderRadius: 'var(--pk-radius-md)', boxShadow: 'var(--pk-shadow-sm)', borderLeft: '4px solid var(--pk-brand-secondary)' }}>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>🔹 Para Proprietários (Aluguel)</h2>
                    <ol style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', color: 'var(--pk-text-secondary)' }}>
                        <li>O proprietário cadastra o imóvel para aluguel.</li>
                        <li style={{ marginTop: '0.5rem', fontWeight: 600 }}>Quando o imóvel for alugado:</li>
                        <ul style={{ listStyle: 'disc', paddingLeft: '1.5rem', marginTop: '0.25rem' }}>
                            <li>O inquilino paga 3 meses adiantados.</li>
                            <li><strong>1 mês</strong> → Casa Fácil MZ (taxa de serviço).</li>
                            <li><strong>2 meses</strong> → Proprietário.</li>
                        </ul>
                    </ol>
                </div>

                {/* Interessados */}
                <div style={{ background: 'white', padding: '2rem', borderRadius: 'var(--pk-radius-md)', boxShadow: 'var(--pk-shadow-sm)', borderLeft: '4px solid var(--pk-success)' }}>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>🔹 Para Interessados (Compradores/Inquilinos)</h2>
                    <div style={{ color: 'var(--pk-text-secondary)' }}>
                        <p style={{ marginBottom: '0.5rem' }}>Podem navegar livremente no site.</p>
                        <p style={{ marginBottom: '0.5rem', fontWeight: 600 }}>Para visitas presenciais:</p>
                        <ul style={{ listStyle: 'disc', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
                            <li>É cobrada uma <strong>taxa de deslocamento de 300 MZN</strong>.</li>
                        </ul>

                        <p style={{ marginBottom: '0.5rem', fontWeight: 600 }}>Pagamento via:</p>
                        <ul style={{ listStyle: 'disc', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
                            <li>Transferência</li>
                            <li>Ou presencialmente no nosso escritório/ponto de encontro.</li>
                        </ul>

                        <p style={{ fontSize: '0.9rem', fontStyle: 'italic', background: 'var(--pk-surface-100)', padding: '0.75rem', borderRadius: 'var(--pk-radius-sm)' }}>
                            Essa taxa serve para cobrir custos de transporte, organização da visita e evitar visitas falsas ou de má-fé.
                        </p>
                    </div>
                </div>

            </div>
        </div>
    )
}
