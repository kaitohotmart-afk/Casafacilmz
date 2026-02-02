'use client'

import { Phone, MessageCircle } from 'lucide-react'

export default function FloatingContact() {
  return (
    <div style={{ position: 'fixed', bottom: '2rem', right: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem', zIndex: 50 }}>
      {/* Call Button */}

      <a
        href="tel:+258867443081"
        style={{
          background: 'var(--pk-brand-primary)',
          color: 'white',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: 'var(--pk-shadow-lg)',
          transition: 'transform 0.2s'
        }}
        title="Ligar Agora"
      >
        <Phone size={28} />
      </a>

      {/* WhatsApp Button */}
      <a
        href="https://wa.me/258877771719"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          background: '#25D366',
          color: 'white',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: 'var(--pk-shadow-lg)',
          transition: 'transform 0.2s'
        }}
        title="Fale no WhatsApp"
      >
        <MessageCircle size={32} />
      </a>
    </div>
  )
}
