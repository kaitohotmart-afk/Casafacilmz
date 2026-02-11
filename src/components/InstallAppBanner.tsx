'use client'

import { useState, useEffect } from 'react'
import { X, Download } from 'lucide-react'

export default function InstallAppBanner() {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        // Show banner after a delay if not dismissed
        const dismissed = localStorage.getItem('install_banner_dismissed')
        if (!dismissed) {
            const timer = setTimeout(() => setIsVisible(true), 3000)
            return () => clearTimeout(timer)
        }
    }, [])

    const handleDismiss = () => {
        setIsVisible(false)
        localStorage.setItem('install_banner_dismissed', 'true')
    }

    const handleInstall = () => {
        // Logic for PWA install or just a link
        console.log('Install clicked')
        // For now, maybe just dismiss or show a message
        alert('Funcionalidade de instalação em breve!')
    }

    if (!isVisible) return null

    return (
        <div style={{
            position: 'fixed',
            bottom: '0',
            left: '0',
            right: '0',
            background: '#000000',
            color: 'white',
            padding: '1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            zIndex: 100,
            boxShadow: '0 -4px 12px rgba(0,0,0,0.15)',
            borderTop: '1px solid #333',
            animation: 'slideUp 0.3s ease-out'
        }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>Instalar App</div>
                <div style={{ fontSize: '0.8rem', color: '#9CA3AF' }}>Instale o Casa Fácil para uma melhor experiência!</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <button
                    onClick={handleInstall}
                    style={{
                        background: '#8B5CF6', // Purple similar to screenshot
                        color: 'white',
                        border: 'none',
                        padding: '0.5rem 1rem',
                        borderRadius: '999px',
                        fontWeight: 600,
                        fontSize: '0.85rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        cursor: 'pointer'
                    }}
                >
                    <Download size={16} />
                    Instalar
                </button>
                <button
                    onClick={handleDismiss}
                    style={{
                        background: 'transparent',
                        border: 'none',
                        color: '#9CA3AF',
                        cursor: 'pointer',
                        padding: '0.25rem'
                    }}
                >
                    <X size={20} />
                </button>
            </div>
            <style jsx>{`
                @keyframes slideUp {
                    from { transform: translateY(100%); }
                    to { transform: translateY(0); }
                }
            `}</style>
        </div>
    )
}
