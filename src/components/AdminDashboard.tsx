'use client'

import { deleteProperty, logFinancialEntry, updatePropertyStatus } from "@/app/dashboard/actions"
import { useTransition, useState } from "react"
import Link from 'next/link'
import { formatCurrency } from "@/utils/format"
import { useRouter } from "next/navigation"

export default function AdminDashboard({ properties, stats }: { properties: any[], stats: any }) {
    const router = useRouter()
    const [isPending, startTransition] = useTransition()
    const [filter, setFilter] = useState('all')

    const handleDelete = async (id: string) => {
        if (!confirm('Tem certeza que deseja remover este imóvel definitivamente?')) return
        startTransition(async () => {
            const res = await deleteProperty(id)
            if (res.error) {
                alert(res.error)
            } else {
                alert('Imóvel removido com sucesso do banco de dados!')
                router.refresh()
            }
        })
    }

    const handleLogVisit = async (propertyId: string) => {
        startTransition(async () => {
            const res = await logFinancialEntry({
                property_id: propertyId,
                type: 'visit',
                amount: 150,
                description: 'Taxa de visita'
            })
            if (res.error) alert(res.error)
            else alert('Visita registada: +150 MZN')
        })
    }

    const handleStatusChange = async (propertyId: string, currentStatus: string) => {
        const nextStatus = currentStatus === 'available' ? 'sold' : 'available'
        const label = nextStatus === 'sold' ? 'Vendido/Alugado' : 'Disponível'

        if (!confirm(`Mudar status para ${label}?`)) return

        let commission = 0
        if (nextStatus === 'sold') {
            const val = prompt('Digite o valor da comissão recebida (MZN):', '0')
            commission = parseFloat(val || '0')
        }

        startTransition(async () => {
            const res = await updatePropertyStatus(propertyId, nextStatus)
            if (res.error) {
                alert(res.error)
                return
            }

            if (commission > 0) {
                await logFinancialEntry({
                    property_id: propertyId,
                    type: 'commission',
                    amount: commission,
                    description: `Comissão de fecho (${label})`
                })
            }
        })
    }

    const filteredProperties = properties.filter(p => {
        if (filter === 'all') return true
        return p.status === filter
    })

    return (
        <div className="container" style={{ padding: '3rem 1.5rem' }}>
            <div style={{ marginBottom: '3rem', borderBottom: '1px solid var(--pk-surface-200)', paddingBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                    <h1 style={{ fontSize: '2.5rem', color: 'var(--pk-brand-primary)', marginBottom: '0.5rem', fontWeight: 800 }}>Admin <span style={{ color: 'var(--pk-brand-secondary)' }}>Dashboard</span></h1>
                    <p style={{ color: 'var(--pk-text-secondary)', fontSize: '1.1rem' }}>Controlo total: Imóveis, Utilizadores e <span style={{ color: 'var(--pk-success)', fontWeight: 700 }}>Financeiro</span>.</p>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <Link href="/dashboard/properties/new" className="btn btn-primary" style={{ fontSize: '0.9rem' }}>+ Novo Imóvel</Link>
                </div>
            </div>

            {/* Financial Overview */}
            <h2 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '1.5rem' }}>Resumo Financeiro</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '4rem' }}>
                <div className="admin-stat-card" style={{ borderLeft: '4px solid var(--pk-success)' }}>
                    <div style={{ color: 'var(--pk-text-tertiary)', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.5rem' }}>Faturamento Total</div>
                    <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--pk-success)' }}>{formatCurrency(stats.totalRevenue)}</div>
                </div>
                <div className="admin-stat-card" style={{ borderLeft: '4px solid var(--pk-brand-secondary)' }}>
                    <div style={{ color: 'var(--pk-text-tertiary)', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.5rem' }}>Taxas de Visita (150 MZN)</div>
                    <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--pk-brand-secondary)' }}>{formatCurrency(stats.visitRevenue)}</div>
                </div>
                <div className="admin-stat-card" style={{ borderLeft: '4px solid #6366F1' }}>
                    <div style={{ color: 'var(--pk-text-tertiary)', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.5rem' }}>Comissões</div>
                    <div style={{ fontSize: '2rem', fontWeight: 800, color: '#6366F1' }}>{formatCurrency(stats.commissionRevenue)}</div>
                </div>
            </div>

            {/* Core Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '4rem', opacity: 0.8 }}>
                <div className="admin-stat-card-mini">
                    <strong>{stats.totalProperties}</strong> Imóveis
                </div>
                <div className="admin-stat-card-mini">
                    <strong>{stats.activeProperties}</strong> Activos
                </div>
                <div className="admin-stat-card-mini">
                    <strong>{stats.totalUsers}</strong> Utilizadores
                </div>
            </div>

            {/* Listings Section */}
            <div style={{ background: 'white', borderRadius: 'var(--pk-radius-lg)', boxShadow: 'var(--pk-shadow-lg)', border: '1px solid var(--pk-surface-200)', overflow: 'hidden' }}>
                <div style={{ padding: '2rem', borderBottom: '1px solid var(--pk-surface-100)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                    <h2 style={{ fontSize: '1.4rem', fontWeight: 700 }}>Gestão de Imóveis</h2>
                    <div style={{ display: 'flex', gap: '0.5rem', background: 'var(--pk-surface-050)', padding: '0.25rem', borderRadius: 'var(--pk-radius-sm)' }}>
                        <button onClick={() => setFilter('all')} style={{ padding: '0.5rem 1rem', border: 'none', background: filter === 'all' ? 'white' : 'transparent', borderRadius: 'var(--pk-radius-sm)', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem', boxShadow: filter === 'all' ? 'var(--pk-shadow-sm)' : 'none' }}>Todos</button>
                        <button onClick={() => setFilter('available')} style={{ padding: '0.5rem 1rem', border: 'none', background: filter === 'available' ? 'white' : 'transparent', borderRadius: 'var(--pk-radius-sm)', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem', boxShadow: filter === 'available' ? 'var(--pk-shadow-sm)' : 'none' }}>Disponíveis</button>
                        <button onClick={() => setFilter('sold')} style={{ padding: '0.5rem 1rem', border: 'none', background: filter === 'sold' ? 'white' : 'transparent', borderRadius: 'var(--pk-radius-sm)', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem', boxShadow: filter === 'sold' ? 'var(--pk-shadow-sm)' : 'none' }}>Vendidos</button>
                    </div>
                </div>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead style={{ background: 'var(--pk-surface-050)', textAlign: 'left' }}>
                            <tr>
                                <th style={{ padding: '1.25rem 2rem', color: 'var(--pk-text-secondary)', fontWeight: 600 }}>Imóvel</th>
                                <th style={{ padding: '1.25rem', color: 'var(--pk-text-secondary)', fontWeight: 600 }}>Preço</th>
                                <th style={{ padding: '1.25rem', color: 'var(--pk-text-secondary)', fontWeight: 600 }}>Proprietário</th>
                                <th style={{ padding: '1.25rem', color: 'var(--pk-text-secondary)', fontWeight: 600 }}>Status</th>
                                <th style={{ padding: '1.25rem 2rem', color: 'var(--pk-text-secondary)', fontWeight: 600, textAlign: 'right' }}>Gestão de Valor</th>
                                <th style={{ padding: '1.25rem 2rem', color: 'var(--pk-text-secondary)', fontWeight: 600, textAlign: 'right' }}>Acções</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProperties.map(p => (
                                <tr key={p.id} style={{ borderBottom: '1px solid var(--pk-surface-100)', transition: 'background 0.2s' }}>
                                    <td style={{ padding: '1.5rem 2rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                                            <div style={{ width: '60px', height: '60px', borderRadius: 'var(--pk-radius-md)', background: 'var(--pk-surface-100)', flexShrink: 0, overflow: 'hidden' }}>
                                                {p.property_images?.[0] && (
                                                    <img src={p.property_images[0].image_url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                )}
                                            </div>
                                            <div>
                                                <Link href={`/properties/${p.id}`} style={{ fontWeight: 700, color: 'var(--pk-text-primary)' }} target="_blank">
                                                    {p.title}
                                                </Link>
                                                <div style={{ fontSize: '0.85rem', color: 'var(--pk-text-tertiary)', marginTop: '0.25rem' }}>📍 {p.location_district} • {p.profiles?.full_name || p.external_owner_name}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td style={{ padding: '1.5rem 1.25rem', fontWeight: 700, color: 'var(--pk-brand-primary)' }}>{formatCurrency(p.price)}</td>
                                    <td style={{ padding: '1.5rem 1.25rem' }}>
                                        <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>{p.external_owner_name || 'Usuário Site'}</div>
                                        <div style={{ fontSize: '0.8rem', color: 'var(--pk-text-tertiary)' }}>{p.external_owner_phone || p.profiles?.phone || 'Sem contacto'}</div>
                                    </td>
                                    <td style={{ padding: '1.5rem 1.25rem' }}>
                                        <button
                                            onClick={() => handleStatusChange(p.id, p.status)}
                                            disabled={isPending}
                                            style={{
                                                padding: '0.5rem 1rem',
                                                borderRadius: 'var(--pk-radius-sm)',
                                                fontSize: '0.8rem',
                                                fontWeight: 700,
                                                border: '1px solid',
                                                cursor: 'pointer',
                                                background: p.status === 'available' ? 'white' : '#F3F4F6',
                                                borderColor: p.status === 'available' ? 'var(--pk-brand-secondary)' : '#D1D5DB',
                                                color: p.status === 'available' ? 'var(--pk-brand-secondary)' : '#4B5563',
                                                transition: 'all 0.2s'
                                            }}
                                        >
                                            {p.status === 'available' ? 'Marcar como Vendido' : 'Reativar Imóvel'}
                                        </button>
                                        <div style={{ marginTop: '0.5rem', fontSize: '0.7rem', fontWeight: 600, color: p.status === 'available' ? 'var(--pk-success)' : 'var(--pk-danger)' }}>
                                            {p.status === 'available' ? '● DISPONÍVEL' : '● VENDIDO/ALUGADO'}
                                        </div>
                                    </td>
                                    <td style={{ padding: '1.5rem 2rem', textAlign: 'right' }}>
                                        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                                            <Link
                                                href={`/dashboard/properties/${p.id}/edit`}
                                                style={{
                                                    padding: '0.5rem 1rem',
                                                    borderRadius: 'var(--pk-radius-sm)',
                                                    fontSize: '0.8rem',
                                                    fontWeight: 600,
                                                    background: 'white',
                                                    color: 'var(--pk-text-primary)',
                                                    border: '1px solid var(--pk-surface-200)',
                                                    textDecoration: 'none'
                                                }}
                                            >
                                                Editar
                                            </Link>
                                            <button
                                                onClick={() => handleLogVisit(p.id)}
                                                disabled={isPending}
                                                style={{
                                                    background: 'var(--pk-brand-secondary)',
                                                    color: 'white',
                                                    border: 'none',
                                                    padding: '0.5rem 1rem',
                                                    borderRadius: 'var(--pk-radius-sm)',
                                                    fontSize: '0.8rem',
                                                    fontWeight: 600,
                                                    cursor: 'pointer',
                                                    boxShadow: 'var(--pk-shadow-sm)'
                                                }}
                                            >
                                                + Registar Visita
                                            </button>
                                        </div>
                                    </td>
                                    <td style={{ padding: '1.5rem 2rem', textAlign: 'right' }}>
                                        <button
                                            onClick={() => handleDelete(p.id)}
                                            disabled={isPending}
                                            style={{
                                                color: 'var(--pk-danger)',
                                                background: 'transparent',
                                                border: 'none',
                                                cursor: 'pointer',
                                                fontSize: '0.85rem',
                                            }}
                                        >
                                            Remover
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <style jsx>{`
                .admin-stat-card {
                    background: white;
                    padding: 2rem;
                    border-radius: var(--pk-radius-lg);
                    box-shadow: var(--pk-shadow-md);
                    border: 1px solid var(--pk-surface-200);
                }
                .admin-stat-card-mini {
                    background: white;
                    padding: 1rem 1.5rem;
                    border-radius: var(--pk-radius-md);
                    border: 1px solid var(--pk-surface-200);
                    font-size: 0.9rem;
                    color: var(--pk-text-secondary);
                }
                tr:hover {
                    background: var(--pk-surface-050);
                }
            `}</style>
        </div>
    )
}
