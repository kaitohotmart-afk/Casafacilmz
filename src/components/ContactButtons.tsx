'use client'

import { logInteraction, logEvent } from '@/app/dashboard/actions'

interface ContactButtonsProps {
    propertyId: string
    ownerId: string
    whatsappLink: string
    whatsappNumber: string
    callNumber: string
}

export default function ContactButtons({ propertyId, ownerId, whatsappLink, whatsappNumber, callNumber }: ContactButtonsProps) {

    const handleAction = async (type: 'whatsapp' | 'call') => {
        // Log asynchronously, don't block the user
        logInteraction(propertyId, ownerId, type).catch(err => console.error('Failed to log interaction', err))
        logEvent(`click_${type}`, { propertyId }).catch(err => console.error('Failed to log analytics', err))
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleAction('whatsapp')}
                className="btn"
                style={{
                    background: '#25D366',
                    color: 'white',
                    justifyContent: 'center',
                    padding: '1rem',
                    fontWeight: 700,
                    width: '100%'
                }}
            >
                WhatsApp: {whatsappNumber}
            </a>
            <a
                href={`tel:${callNumber.replace(/\s/g, '')}`}
                onClick={() => handleAction('call')}
                className="btn"
                style={{
                    background: 'white',
                    color: 'var(--pk-brand-primary)',
                    justifyContent: 'center',
                    padding: '1rem',
                    fontWeight: 700,
                    width: '100%'
                }}
            >
                Ligar: {callNumber}
            </a>
        </div>
    )
}
