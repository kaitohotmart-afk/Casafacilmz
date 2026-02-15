export default function TermsPage() {
    return (
        <div className="container" style={{ padding: '4rem 1rem', maxWidth: '800px' }}>
            <h1 style={{ marginBottom: '2rem', color: 'var(--pk-brand-primary)' }}>Termos de Uso</h1>

            <section style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>4.1 Aceitação dos Termos</h2>
                <p>Ao utilizar o site Casa Fácil MZ, o usuário concorda automaticamente com todos os termos aqui descritos.</p>
            </section>

            <section style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>4.2 Sobre os Anúncios</h2>
                <p>O anunciante declara ser:</p>
                <ul style={{ listStyle: 'disc', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
                    <li>Proprietário legal do imóvel OU</li>
                    <li>Ter autorização direta e comprovável do proprietário</li>
                </ul>
                <p>O Casa Fácil MZ não se responsabiliza por anúncios falsos. Caso seja identificado anúncio irregular, o anúncio poderá ser removido sem aviso prévio.</p>
            </section>

            <section style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>4.3 Proibição de Intermediários Informais</h2>
                <div style={{ background: '#FEF2F2', padding: '1rem', borderLeft: '4px solid var(--pk-danger)' }}>
                    <p style={{ fontWeight: 600, color: 'var(--pk-danger)' }}>❌ Não aceitamos:</p>
                    <ul style={{ listStyle: 'disc', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
                        <li>“Nhonguistas”</li>
                        <li>Afiliados informais</li>
                        <li>Pessoas que anunciam imóveis sem autorização direta do proprietário</li>
                    </ul>
                    <p><strong>👉 O Casa Fácil MZ trabalha exclusivamente com o dono do imóvel.</strong></p>
                </div>
                <p style={{ marginTop: '1rem' }}>
                    Caso o anunciante não seja o proprietário, toda negociação seguirá as taxas padrão do Casa Fácil MZ e não aceitamos disputas posteriores sobre comissões.
                </p>
            </section>

            <section style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>4.4 Taxas e Pagamentos</h2>
                <ul style={{ listStyle: 'disc', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
                    <li><strong>Venda:</strong> 10% de comissão</li>
                    <li><strong>Aluguel:</strong> 1 mês de comissão</li>
                    <li><strong>Visita presencial:</strong> 300 MZN</li>
                </ul>
                <p>As taxas são fixas e não negociáveis.</p>
            </section>

            <section style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>4.5 Limitação de Responsabilidade</h2>
                <p>O Casa Fácil MZ:</p>
                <ul style={{ listStyle: 'disc', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
                    <li>Não garante a conclusão de vendas ou alugueis</li>
                    <li>Não é responsável por acordos feitos fora da plataforma</li>
                    <li>Atua apenas como intermediador e divulgador</li>
                </ul>
            </section>

        </div>
    )
}
