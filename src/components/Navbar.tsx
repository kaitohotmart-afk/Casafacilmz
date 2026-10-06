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

                <div className="mobile-actions" style={{ display: 'none', gap: '0.5rem', marginLeft: 'auto', marginRight: '0.5rem' }}>
                </div>

                {/* Desktop Menu */}
                <div className="desktop-menu" style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                    <Link href="/blog" style={{ fontWeight: 500, fontSize: '0.95rem', color: pathname === '/blog' ? 'var(--pk-brand-secondary)' : 'var(--pk-text-secondary)' }}>Dicas</Link>
                    <Link href="/about" style={{ fontWeight: 500, fontSize: '0.95rem', color: pathname === '/about' ? 'var(--pk-brand-secondary)' : 'var(--pk-text-secondary)' }}>Sobre</Link>
                    <Link href="/contact" style={{ fontWeight: 500, fontSize: '0.95rem', color: pathname === '/contact' ? 'var(--pk-brand-secondary)' : 'var(--pk-text-secondary)' }}>Contacto</Link>
                    <a href="https://wa.me/258877771719?text=Ol%C3%A1%2C%20gostaria%20de%20divulgar%20meu%20im%C3%B3vel%20no%20site%20Casa%20F%C3%A1cil%20MZ." target="_blank" rel="noopener noreferrer" style={{
                        fontWeight: 700,
                        fontSize: '0.95rem',
                        color: 'white',
                        background: 'var(--pk-brand-secondary)',
                        padding: '0.6rem 1.2rem',
                        borderRadius: 'var(--pk-radius-md)',
                        boxShadow: '0 4px 10px rgba(234, 88, 12, 0.3)',
                        transition: 'all 0.2s ease',
                    }}>
                        Divulgar Casa
                    </a>
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
                    <Link href="/blog" onClick={() => setIsOpen(false)} style={{ color: 'var(--pk-text-primary)', fontWeight: 500 }}>Dicas</Link>
                    <Link href="/about" onClick={() => setIsOpen(false)} style={{ color: 'var(--pk-text-primary)', fontWeight: 500 }}>Sobre</Link>
                    <Link href="/contact" onClick={() => setIsOpen(false)} style={{ color: 'var(--pk-text-primary)', fontWeight: 500 }}>Contacto</Link>
                    <a href="https://wa.me/258877771719?text=Ol%C3%A1%2C%20gostaria%20de%20divulgar%20meu%20im%C3%B3vel%20no%20site%20Casa%20F%C3%A1cil%20MZ." target="_blank" rel="noopener noreferrer" onClick={() => setIsOpen(false)} style={{ color: 'white', background: 'var(--pk-brand-secondary)', padding: '1rem', textAlign: 'center', borderRadius: 'var(--pk-radius-md)', fontWeight: 700, boxShadow: '0 4px 10px rgba(234, 88, 12, 0.3)' }}>Divulgar Casa</a>
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
