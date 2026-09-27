'use client'

import { Share2 } from 'lucide-react'

export default function ShareButton({ title, text, url }: { title: string, text: string, url: string }) {
    const handleShare = async () => {
        const fullUrl = `${window.location.origin}${url}`

        if (navigator.share) {
            try {
                await navigator.share({
                    title: title,
                    text: text,
                    url: fullUrl
                })
            } catch (err) {
                console.log('Erro ao partilhar', err)
            }
        } else {
            // Fallback to WhatsApp link if Web Share API is not available
            const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${title} - ${fullUrl}`)}`
            window.open(whatsappUrl, '_blank')
        }
    }

    return (
        <button 
            onClick={handleShare}
            style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '0.5rem', 
                background: 'var(--pk-brand-primary)', 
                color: 'white', 
                padding: '0.75rem 1.5rem', 
                borderRadius: '2rem', 
                fontWeight: 700, 
                border: 'none', 
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(17, 24, 39, 0.2)',
                marginTop: '2rem',
                fontSize: '1rem'
            }}
        >
            <Share2 size={20} />
            Partilhar esta Dica
        </button>
    )
}
