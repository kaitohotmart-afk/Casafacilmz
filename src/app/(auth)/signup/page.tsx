'use client'

import Link from 'next/link'

export default function SignupPage() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', textAlign: 'center' }}>
            <div>
                <h1 style={{ marginBottom: '0.5rem', color: 'var(--pk-brand-primary)' }}>Casa Fácil MZ</h1>
                <p style={{ color: 'var(--pk-text-secondary)' }}>Cadastro de novos imóveis</p>
            </div>

            <div style={{
                background: '#FFF7ED',
                border: '1px solid #FED7AA',
                borderRadius: 'var(--pk-radius-md)',
                padding: '2rem',
                fontSize: '1rem',
                color: '#9A3412'
            }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: '#7C2D12' }}>Atenção: Acesso Restrito</h3>
                <p style={{ marginBottom: '1.5rem' }}>
                    O cadastro autônomo de imóveis foi desativado para garantir a máxima qualidade e segurança para nossos clientes.
                </p>
                <p style={{ marginBottom: '1.5rem' }}>
                    Se deseja anunciar seu imóvel, entre em contato diretamente com nossa equipe. Um administrador irá até o local para tirar fotos profissionais e publicar o anúncio no site.
                </p>
                
                <a href="https://wa.me/258877771719?text=Ol%C3%A1%2C%20gostaria%20de%20divulgar%20meu%20im%C3%B3vel%20no%20site%20Casa%20F%C3%A1cil%20MZ." target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ display: 'inline-block', padding: '1rem 2rem' }}>
                    Falar com Administrador
                </a>
            </div>

            <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                <Link href="/login" style={{ color: 'var(--pk-brand-primary)', fontWeight: 500, display: 'block', marginBottom: '1rem' }}>
                    Já sou administrador
                </Link>
                <Link href="/" style={{ fontSize: '0.85rem', color: 'var(--pk-text-tertiary)' }}>
                    ← Voltar ao site
                </Link>
            </div>
        </div>
    )
}
