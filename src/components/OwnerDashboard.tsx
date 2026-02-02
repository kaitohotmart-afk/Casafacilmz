'use client'

import { updateProfilePhone } from '@/app/dashboard/actions'
import { useTransition, useState } from 'react'
import PropertyCard from '@/components/PropertyCard'
import Link from 'next/link'
import { formatCurrency } from '@/utils/format'

export default function OwnerDashboard({ properties, profile, stats }: { properties: any[], profile: any, stats: Record<string, { whatsapp: number, call: number }> }) {
    const [isPending, startTransition] = useTransition()
    const [phone, setPhone] = useState(profile?.phone || '')

    const handleUpdatePhone = async () => {
        if (!phone) return
        startTransition(async () => {
            const res = await updateProfilePhone(phone)
            if (res.error) alert(res.error)
            else alert('Contacto atualizado com sucesso! (Apenas o Admin verá)')
        })
    }

    return (
        <div className="container" style={{ padding: '2rem 1rem' }}>
            {/* Profile Contact Section */}
            <div style={{ background: '#F8FAFC', padding: '1.5rem', borderRadius: 'var(--pk-radius-lg)', border: '1px solid var(--pk-surface-200)', marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                    <h2 style={{ fontSize: '1.2rem', marginBottom: '0.25rem' }}>Seu Contacto para o Admin</h2>
                    <p style={{ fontSize: '0.85rem', color: 'var(--pk-text-tertiary)' }}>Este número **não** aparece no site. É apenas para a nossa equipa entrar em contacto contigo.</p>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Ex: 841234567"
                        style={{ padding: '0.6rem 1rem', borderRadius: 'var(--pk-radius-sm)', border: '1px solid var(--pk-surface-200)', width: '200px' }}
                    />
                    <button
                        onClick={handleUpdatePhone}
                        disabled={isPending}
                        className="btn btn-primary"
                        style={{ fontSize: '0.85rem', padding: '0.6rem 1.25rem' }}
                    >
                        {isPending ? 'Gravar...' : 'Gravar'}
                    </button>
                </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                <div>
                    <h1 style={{ fontSize: '2rem', color: 'var(--pk-text-primary)', marginBottom: '0.5rem' }}>Meus Imóveis</h1>
                    <p style={{ color: 'var(--pk-text-secondary)' }}>Acompanhe o interesse nos seus anúncios.</p>
                </div>
                <Link href="/dashboard/properties/new" className="btn btn-primary" style={{ background: 'var(--pk-brand-secondary)', padding: '0.875rem 1.5rem' }}>
                    + Novo Anúncio
                </Link>
            </div>

            {properties && properties.length > 0 ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2.5rem' }}>
                    {properties.map((property: any) => (
                        <div key={property.id} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <PropertyCard property={property} />
                            <div style={{
                                display: 'flex',
                                gap: '1rem',
                                padding: '1rem',
                                background: 'white',
                                borderRadius: 'var(--pk-radius-md)',
                                border: '1px solid var(--pk-surface-100)',
                                fontSize: '0.9rem',
                                color: 'var(--pk-text-secondary)'
                            }}>
                                <div style={{ flex: 1, textAlign: 'center' }}>
                                    <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#25D366' }}>{stats[property.id]?.whatsapp || 0}</div>
                                    <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 600 }}>Cliques WhatsApp</div>
                                </div>
                                <div style={{ width: '1px', background: 'var(--pk-surface-100)' }}></div>
                                <div style={{ flex: 1, textAlign: 'center' }}>
                                    <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--pk-brand-primary)' }}>{stats[property.id]?.call || 0}</div>
                                    <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 600 }}>Cliques Chamadas</div>
                                </div>
                            </div>
                            <Link
                                href={`/dashboard/properties/${property.id}/edit`}
                                style={{
                                    display: 'block',
                                    textAlign: 'center',
                                    padding: '0.75rem',
                                    background: 'white',
                                    color: 'var(--pk-brand-primary)',
                                    border: '1px solid var(--pk-brand-primary)',
                                    borderRadius: 'var(--pk-radius-md)',
                                    textDecoration: 'none',
                                    fontWeight: 700,
                                    fontSize: '0.9rem',
                                    transition: 'all 0.2s'
                                }}
                            >
                                ✏️ Editar Anúncio
                            </Link>
                        </div>
                    ))}
                </div>
            ) : (
                <div style={{
                    textAlign: 'center',
                    padding: '5rem 2rem',
                    background: 'white',
                    borderRadius: 'var(--pk-radius-lg)',
                    border: '1px dashed var(--pk-surface-300)',
                    boxShadow: 'var(--pk-shadow-sm)'
                }}>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🏠</div>
                    <h3 style={{ marginBottom: '0.5rem' }}>Nenhum anúncio encontrado</h3>
                    <p style={{ color: 'var(--pk-text-secondary)', marginBottom: '2rem' }}>Você ainda não tem imóveis anunciados na plataforma.</p>
                    <Link href="/dashboard/properties/new" className="btn btn-primary">
                        Começar a vender agora
                    </Link>
                </div>
            )}
        </div>
    )
}
