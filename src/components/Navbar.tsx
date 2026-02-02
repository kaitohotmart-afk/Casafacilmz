'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

export default function Navbar() {
    const pathname = usePathname()
    const [isOpen, setIsOpen] = useState(false)

    return (
        <nav style={{
            background: 'white',
            borderBottom: '1px solid var(--pk-surface-200)',
            position: 'sticky',
            top: 0,
            zIndex: 100,
            padding: '0.75rem 0'
        }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Link href="/" style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--pk-brand-primary)', letterSpacing: '-0.02em' }}>
                    Casa Fácil <span style={{ color: 'var(--pk-brand-secondary)' }}>MZ</span>
                </Link>

                {/* Mobile Quick Actions */}
                <div className="mobile-actions" style={{ display: 'none', gap: '0.5rem', marginLeft: 'auto', marginRight: '0.5rem' }}>
                    <Link href="/login" style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--pk-brand-primary)', border: '1px solid var(--pk-brand-primary)', padding: '0.4rem 0.75rem', borderRadius: 'var(--pk-radius-sm)' }}>
                        Entrar
                    </Link>
                    <Link href="/signup" style={{ fontSize: '0.8rem', fontWeight: 600, color: 'white', background: 'var(--pk-brand-primary)', padding: '0.4rem 0.75rem', borderRadius: 'var(--pk-radius-sm)' }}>
                        Registar
                    </Link>
                </div>

                {/* Desktop Menu */}
                <div className="desktop-menu" style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                    <Link href="/about" style={{ fontWeight: 500, fontSize: '0.95rem', color: pathname === '/about' ? 'var(--pk-brand-secondary)' : 'var(--pk-text-secondary)' }}>Sobre</Link>
                    <Link href="/contact" style={{ fontWeight: 500, fontSize: '0.95rem', color: pathname === '/contact' ? 'var(--pk-brand-secondary)' : 'var(--pk-text-secondary)' }}>Contacto</Link>
                    <Link href="/signup" style={{
                        fontWeight: 600,
                        fontSize: '0.95rem',
                        color: 'var(--pk-text-primary)',
                        background: 'var(--pk-surface-100)',
                        padding: '0.5rem 1rem',
                        borderRadius: 'var(--pk-radius-sm)'
                    }}>
                        Divulgue seu Imóvel
                    </Link>
                    <Link href="/login" className="btn btn-primary" style={{ padding: '0.5rem 1.25rem', fontSize: '0.95rem' }}>
                        Entrar
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="mobile-toggle"
                    onClick={() => setIsOpen(!isOpen)}
                    style={{
                        display: 'none',
                        background: 'none',
                        border: 'none',
                        fontSize: '1.5rem',
                        cursor: 'pointer',
                        padding: '0.5rem'
                    }}
                >
                    {isOpen ? '✕' : '☰'}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '1.5rem',
                    gap: '1.5rem',
                    background: 'white',
                    borderTop: '1px solid var(--pk-surface-100)',
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    right: 0,
                    boxShadow: 'var(--pk-shadow-lg)'
                }}>
                    <Link href="/about" onClick={() => setIsOpen(false)} style={{ color: 'var(--pk-text-primary)', fontWeight: 500 }}>Sobre</Link>
                    <Link href="/contact" onClick={() => setIsOpen(false)} style={{ color: 'var(--pk-text-primary)', fontWeight: 500 }}>Contacto</Link>
                    <Link href="/signup" onClick={() => setIsOpen(false)} style={{ color: 'var(--pk-text-primary)', fontWeight: 500 }}>Divulgue seu Imóvel</Link>
                    <Link href="/login" onClick={() => setIsOpen(false)} className="btn btn-primary">Entrar</Link>
                </div>
            )}

            <style jsx>{`
        @media (max-width: 768px) {
          .desktop-menu {
            display: none !important;
          }
          .mobile-toggle {
            display: block !important;
          }
          .mobile-actions {
            display: flex !important;
          }
        }
      `}</style>
        </nav>
    )
}
