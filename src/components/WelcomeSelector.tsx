'use client'

import Link from 'next/link'

export default function WelcomeSelector() {
    return (
        <section className="welcome-selector" style={{
            padding: '4rem 1.5rem',
            background: 'white',
            textAlign: 'center'
        }}>
            <div className="container">
                <h2 style={{
                    fontSize: '2.5rem',
                    fontWeight: 800,
                    color: 'var(--pk-brand-primary)',
                    marginBottom: '1rem'
                }}>
                    Como podemos ajudar hoje?
                </h2>
                <p style={{
                    color: 'var(--pk-text-secondary)',
                    fontSize: '1.2rem',
                    marginBottom: '3.5rem',
                    maxWidth: '600px',
                    margin: '0 auto 3.5rem'
                }}>
                    Escolha uma das opções abaixo para começar a sua jornada no Casa Fácil MZ.
                </p>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '2rem',
                    maxWidth: '1000px',
                    margin: '0 auto'
                }}>
                    {/* Option 1: Buy/Rent */}
                    <Link href="/properties" className="choice-card" style={{
                        background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
                        padding: '3.5rem 2rem',
                        borderRadius: 'var(--pk-radius-2xl)',
                        textDecoration: 'none',
                        color: 'inherit',
                        border: '2px solid var(--pk-surface-100)',
                        transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        boxShadow: 'var(--pk-shadow-md)',
                        position: 'relative',
                        overflow: 'hidden'
                    }}>
                        <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>🔍</div>
                        <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--pk-brand-primary)', marginBottom: '1rem' }}>
                            Quero Comprar / Alugar
                        </h3>
                        <p style={{ color: 'var(--pk-text-secondary)', lineHeight: 1.6, fontSize: '1.1rem' }}>
                            Veja centenas de imóveis verificados em Tete e encontre o lugar ideal para si.
                        </p>
                        <div style={{
                            marginTop: '2rem',
                            padding: '0.75rem 2rem',
                            background: 'white',
                            border: '2px solid var(--pk-brand-primary)',
                            color: 'var(--pk-brand-primary)',
                            borderRadius: 'var(--pk-radius-lg)',
                            fontWeight: 700,
                            fontSize: '1.1rem'
                        }}>
                            Ver Imóveis
                        </div>
                    </Link>

                    {/* Option 2: Announce */}
                    <Link href="/signup" className="choice-card" style={{
                        background: 'linear-gradient(135deg, var(--pk-brand-primary) 0%, #1e293b 100%)',
                        padding: '3.5rem 2rem',
                        borderRadius: 'var(--pk-radius-2xl)',
                        textDecoration: 'none',
                        color: 'white',
                        transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
                        position: 'relative',
                        overflow: 'hidden'
                    }}>
                        <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>📢</div>
                        <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'white', marginBottom: '1rem' }}>
                            Quero Anunciar Imóvel
                        </h3>
                        <p style={{ opacity: 0.9, lineHeight: 1.6, fontSize: '1.1rem' }}>
                            Venda ou alugue o seu imóvel de forma rápida, segura e sem intermediários.
                        </p>
                        <div style={{
                            marginTop: '2rem',
                            padding: '0.75rem 2rem',
                            background: 'var(--pk-brand-secondary)',
                            color: 'white',
                            borderRadius: 'var(--pk-radius-lg)',
                            fontWeight: 700,
                            fontSize: '1.1rem'
                        }}>
                            Começar Agora
                        </div>
                    </Link>
                </div>
            </div>

            <style jsx>{`
                .choice-card:hover {
                    transform: translateY(-10px);
                    box-shadow: var(--pk-shadow-2xl);
                    border-color: var(--pk-brand-secondary);
                }
                .choice-card:active {
                    transform: translateY(-5px);
                }
            `}</style>
        </section>
    )
}
