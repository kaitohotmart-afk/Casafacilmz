'use client'

import Link from 'next/link'
import { formatCurrency } from '@/utils/format'

interface PropertyCardProps {
    property: {
        id: string
        title: string
        price: number
        location_district: string
        type: string
        property_images?: { image_url: string }[]
    }
}

export default function PropertyCard({ property }: PropertyCardProps) {
    const isSale = property.type === 'sale'
    const isLand = property.type === 'land'

    return (
        <Link href={`/properties/${property.id}`} style={{ display: 'block', transition: 'all 0.3s ease' }}>
            <div className="property-card" style={{
                background: 'white',
                borderRadius: 'var(--pk-radius-lg)',
                overflow: 'hidden',
                boxShadow: 'var(--pk-shadow-md)',
                height: '100%',
                border: '1px solid var(--pk-surface-200)',
                display: 'flex',
                flexDirection: 'column'
            }}>
                <div style={{ height: '240px', background: 'var(--pk-surface-200)', position: 'relative' }}>
                    {property.property_images?.[0]?.image_url ? (
                        <img
                            src={property.property_images[0].image_url}
                            alt={property.title}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    ) : (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--pk-text-tertiary)' }}>
                            Sem foto disponível
                        </div>
                    )}

                    {/* Badges */}
                    <div style={{
                        position: 'absolute',
                        top: '1rem',
                        left: '1rem',
                        display: 'flex',
                        gap: '0.5rem'
                    }}>
                        <span style={{
                            background: 'rgba(15, 23, 42, 0.8)',
                            backdropFilter: 'blur(4px)',
                            color: 'white',
                            padding: '0.35rem 0.75rem',
                            borderRadius: 'var(--pk-radius-sm)',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            textTransform: 'uppercase'
                        }}>
                            {property.type === 'land' ? 'Terreno' :
                                property.type === 'house_land' ? 'Terreno + Casa' :
                                    property.type === 'sale' ? 'Venda' : 'Aluguel'}
                        </span>
                    </div>

                    <div style={{
                        position: 'absolute',
                        bottom: '1rem',
                        left: '1rem',
                        background: 'white',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '99px',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        color: 'var(--pk-text-primary)',
                        boxShadow: 'var(--pk-shadow-sm)'
                    }}>
                        📍 {property.location_district}
                    </div>
                </div>

                <div style={{ padding: '1.5rem', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                        <h3 style={{
                            fontSize: '1.15rem',
                            marginBottom: '0.75rem',
                            lineHeight: 1.4,
                            color: 'var(--pk-text-primary)',
                            fontWeight: 700
                        }}>
                            {property.title}
                        </h3>
                    </div>

                    <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--pk-brand-secondary)' }}>
                            {formatCurrency(property.price)}
                            {!isSale && !isLand && <span style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--pk-text-tertiary)' }}>/mês</span>}
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
        .property-card:hover {
          transform: translateY(-8px);
          box-shadow: var(--pk-shadow-xl);
          border-color: var(--pk-surface-300);
        }
      `}</style>
        </Link>
    )
}
