'use client'

import { deleteProperty, logFinancialEntry, updatePropertyStatus } from "@/app/dashboard/actions"
import { useTransition, useState } from "react"
import Link from 'next/link'
import { formatCurrency } from "@/utils/format"
import { useRouter } from "next/navigation"
import {
    Users, Home, TrendingUp, MousePointer2, Phone, MessageCircle,
    BarChart3, LayoutDashboard, Settings, LogOut, ChevronRight, Briefcase
} from 'lucide-react'
import "./dashboard.css"

// Sub-components
import MetricCard from "./Dashboard/MetricCard"
import { RevenueTrendChart, TrafficSourcePie } from "./Dashboard/Charts"
import SalesFunnel from "./Dashboard/SalesFunnel"
import UserManagementTable from "./Dashboard/UserManagementTable"

export default function AdminDashboard({ properties, stats, users, currentRange }: {
    properties: any[],
    stats: any,
    users: any[],
    currentRange: string
}) {
    const router = useRouter()
    const [isPending, startTransition] = useTransition()
    const [filter, setFilter] = useState('all')
    const [activeTab, setActiveTab] = useState('overview')
    const [blogImageUrl, setBlogImageUrl] = useState('')
    const [blogUploading, setBlogUploading] = useState(false)

    const handleBlogImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return
        setBlogUploading(true)
        try {
            const formData = new FormData()
            formData.append('file', e.target.files[0])
            const res = await fetch('/api/upload', { method: 'POST', body: formData })
            if (!res.ok) throw new Error('Falha no upload')
            const data = await res.json()
            setBlogImageUrl(data.url)
        } catch (err) {
            alert('Erro ao carregar imagem')
        } finally {
            setBlogUploading(false)
        }
    }

    const statsConfig = [
        { title: 'Faturamento Total', value: formatCurrency(stats.totalRevenue), icon: Briefcase, color: '#10B981', trend: { value: 12, label: 'vs anterior' } },
        { title: 'Visualizações', value: stats.totalVisits, icon: MousePointer2, color: '#8B5CF6', trend: { value: 24, label: 'vs anterior' } },
        { title: 'Leads (WhatsApp/Call)', value: stats.whatsappClicks + stats.callClicks, icon: MessageCircle, color: '#3B82F6', trend: { value: 5, label: 'vs anterior' } },
        { title: 'Utilizadores', value: stats.totalUsers, icon: Users, color: '#F59E0B' },
    ]

    const handleRangeChange = (range: string) => {
        router.push(`/dashboard?range=${range}`)
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Arquivar este imóvel? Ele não será mais visível publicamente.')) return
        startTransition(async () => {
            const res = await deleteProperty(id)
            if (res.error) alert(res.error)
            else router.refresh()
        })
    }

    const handleStatusChange = async (propertyId: string, currentStatus: string) => {
        const nextStatus = currentStatus === 'available' ? 'sold' : 'available'
        if (!confirm(`Mudar status para ${nextStatus === 'sold' ? 'Vendido' : 'Disponível'}?`)) return

        let commission = 0
        if (nextStatus === 'sold') {
            const val = prompt('Valor da comissão (MZN):', '0')
            commission = parseFloat(val || '0')
        }

        startTransition(async () => {
            await updatePropertyStatus(propertyId, nextStatus)
            if (commission > 0) {
                await logFinancialEntry({ property_id: propertyId, type: 'commission', amount: commission, description: 'Comissão de venda' })
            }
            router.refresh()
        })
    }

    const filteredProperties = properties.filter(p => filter === 'all' || p.status === filter)

    return (
        <div className="dashboard-root">
            {/* Main Content */}
            <main style={{ maxWidth: '1400px', margin: '0 auto' }}>
                <header className="dashboard-header">
                    <div className="dashboard-title">
                        <h1>Dashboard <span>Pro</span></h1>
                        <p style={{ color: 'var(--pk-text-tertiary)', marginTop: '0.5rem', fontWeight: 500 }}>Bem-vindo, Admin. Aqui está o desempenho da sua imobiliária.</p>
                    </div>
                    <div className="dashboard-actions">
                        {/* Range Selector */}
                        <select
                            value={currentRange}
                            onChange={(e) => handleRangeChange(e.target.value)}
                            className="range-select"
                        >
                            <option value="today">Hoje</option>
                            <option value="7d">Últimos 7 dias</option>
                            <option value="30d">Últimos 30 dias</option>
                            <option value="all">Todo o tempo</option>
                        </select>
                        <Link href="/dashboard/properties/new" className="btn btn-primary" style={{ boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)' }}>
                            + Novo Imóvel
                        </Link>
                    </div>
                </header>

                {/* Tabs */}
                <div className="dashboard-tabs">
                    {['overview', 'properties', 'users', 'blog'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
                        >
                            {tab === 'overview' ? 'Visão Geral' : tab === 'properties' ? 'Imóveis' : tab === 'users' ? 'Utilizadores' : 'Blog (Dicas)'}
                        </button>
                    ))}
                </div>

                {activeTab === 'overview' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        {/* Metrics Grid */}
                        <div className="metric-grid">
                            {statsConfig.map((item) => (
                                <MetricCard key={item.title} {...item} />
                            ))}
                        </div>

                        {/* Charts Area */}
                        <div className="chart-grid-main">
                            <RevenueTrendChart trends={stats.trends} />
                            <TrafficSourcePie sources={stats.trafficSources} />
                        </div>

                        {/* Funnel & Performance */}
                        <div className="chart-grid-main">
                            <SalesFunnel data={stats.funnel} />
                            <div className="premium-card">
                                <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.5rem' }}>Ranking de Performance</h4>
                                <div className="ranking-list">
                                    {properties.slice(0, 5).map((p, idx) => (
                                        <div key={p.id} className="ranking-item">
                                            <div className="ranking-info">
                                                <span className="ranking-number">#0{idx + 1}</span>
                                                <div style={{ width: '3rem', height: '3rem', borderRadius: 'var(--pk-radius-sm)', overflow: 'hidden', flexShrink: 0 }}>
                                                    {p.property_images?.[0] && <img src={p.property_images[0].image_url} className="property-thumb" alt="" />}
                                                </div>
                                                <div>
                                                    <div style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--pk-text-primary)' }}>{p.title}</div>
                                                    <div style={{ fontSize: '0.75rem', color: 'var(--pk-text-tertiary)' }}>{p.type} • {p.status}</div>
                                                </div>
                                            </div>
                                            <div style={{ textAlign: 'right' }}>
                                                <div style={{ fontWeight: 800, color: '#8b5cf6', fontSize: '0.9rem' }}>{formatCurrency(p.price)}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'properties' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h2 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Gestão de Listagens</h2>
                            <div style={{ display: 'flex', gap: '0.5rem', background: 'white', padding: '0.25rem', borderRadius: 'var(--pk-radius-md)', border: '1px solid var(--pk-surface-100)' }}>
                                {['all', 'available', 'sold', 'archived', 'draft'].map((f) => (
                                    <button
                                        key={f}
                                        onClick={() => setFilter(f)}
                                        style={{
                                            padding: '0.5rem 1rem',
                                            borderRadius: 'var(--pk-radius-sm)',
                                            fontSize: '0.75rem',
                                            fontWeight: 700,
                                            border: 'none',
                                            cursor: 'pointer',
                                            background: filter === f ? '#8b5cf6' : 'transparent',
                                            color: filter === f ? 'white' : 'var(--pk-text-tertiary)',
                                            transition: 'all 0.2s'
                                        }}
                                    >
                                        {f === 'all' ? 'Todos' : f === 'available' ? 'Disponíveis' : f === 'sold' ? 'Vendidos' : f === 'archived' ? 'Arquivados' : 'Rascunhos'}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="admin-table-container">
                            <table className="admin-table">
                                <thead>
                                    <tr>
                                        <th>Imóvel</th>
                                        <th>Proprietário</th>
                                        <th>Status</th>
                                        <th style={{ textAlign: 'right' }}>Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredProperties.map((p) => (
                                        <tr key={p.id}>
                                            <td>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                                    <div style={{ width: '3rem', height: '3rem', borderRadius: '0.5rem', background: '#f3f4f6', overflow: 'hidden', flexShrink: 0 }}>
                                                        {p.property_images?.[0] && <img src={p.property_images[0].image_url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" />}
                                                    </div>
                                                    <div>
                                                        <Link href={`/properties/${p.id}`} style={{ fontWeight: 700, fontSize: '0.875rem' }} target="_blank">{p.title}</Link>
                                                        <div style={{ fontSize: '0.75rem', color: 'var(--pk-text-tertiary)' }}>{formatCurrency(p.price)}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div style={{ fontSize: '0.875rem', fontWeight: 600 }}>{p.external_owner_name || p.profiles?.full_name || 'Desconhecido'}</div>
                                                <div style={{ fontSize: '0.75rem', color: 'var(--pk-text-tertiary)' }}>{p.external_owner_phone || p.profiles?.phone || 'Sem contacto'}</div>
                                            </td>
                                            <td>
                                                <span className={`status-badge ${p.status === 'available' ? 'status-available' : p.status === 'draft' ? 'status-draft' : 'status-sold'}`}>
                                                    {p.status === 'available' ? 'Disponível' : p.status === 'draft' ? 'Rascunho' : 'Vendido/Arquivado'}
                                                </span>
                                            </td>
                                            <td>
                                                <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                                                    <button onClick={() => handleStatusChange(p.id, p.status)} style={{ padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid #e5e7eb', background: 'white', color: '#6b7280', cursor: 'pointer' }}>
                                                        <TrendingUp size={16} />
                                                    </button>
                                                    <Link href={`/dashboard/properties/${p.id}/edit`} style={{ padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid #e5e7eb', background: 'white', color: '#6b7280' }}>
                                                        <BarChart3 size={16} />
                                                    </Link>
                                                    <button onClick={() => handleDelete(p.id)} style={{ padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid #fee2e2', background: 'white', color: '#dc2626', cursor: 'pointer' }}>
                                                        <LogOut size={16} style={{ transform: 'rotate(90deg)' }} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {activeTab === 'users' && (
                    <div style={{ animation: 'fade-in 0.5s ease' }}>
                        <UserManagementTable users={users} />
                    </div>
                )}

                {activeTab === 'blog' && (
                    <div style={{ animation: 'fade-in 0.5s ease', maxWidth: '800px' }}>
                        <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.5rem' }}>Criar Novo Artigo / Dica</h2>
                        <form action={async (formData) => {
                            const { createBlogPost } = await import('@/app/dashboard/actions')
                            if (blogImageUrl) formData.set('image_url', blogImageUrl)
                            const res = await createBlogPost(formData)
                            if (res.error) alert(res.error)
                            else {
                                alert('Artigo publicado com sucesso!')
                                setBlogImageUrl('')
                                router.refresh()
                            }
                        }} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', background: 'white', padding: '2.5rem', borderRadius: '1rem', border: '1px solid var(--pk-surface-200)', boxShadow: 'var(--pk-shadow-sm)' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label style={{ fontWeight: 600, color: 'var(--pk-text-primary)' }}>Título do Artigo</label>
                                <input name="title" required placeholder="Ex: 5 Dicas para Arrendar Casa" style={{ padding: '0.75rem 1rem', borderRadius: '0.5rem', border: '1px solid var(--pk-surface-200)', fontSize: '1rem', width: '100%' }} />
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label style={{ fontWeight: 600, color: 'var(--pk-text-primary)' }}>Imagem de Capa</label>
                                {blogImageUrl ? (
                                    <div style={{ position: 'relative', width: '100%', height: '200px', borderRadius: '0.5rem', overflow: 'hidden' }}>
                                        <img src={blogImageUrl} alt="Capa" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        <button type="button" onClick={() => setBlogImageUrl('')} style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', background: 'var(--pk-danger)', color: 'white', border: 'none', borderRadius: '0.5rem', padding: '0.5rem 1rem', cursor: 'pointer', fontWeight: 600 }}>Remover Imagem</button>
                                        <input type="hidden" name="image_url" value={blogImageUrl} />
                                    </div>
                                ) : (
                                    <div style={{ border: '2px dashed var(--pk-brand-primary)', borderRadius: '0.5rem', padding: '2rem', textAlign: 'center', background: 'var(--pk-surface-100)', cursor: 'pointer' }} onClick={() => document.getElementById('blog-image-upload')?.click()}>
                                        <input type="file" id="blog-image-upload" accept="image/*" style={{ display: 'none' }} onChange={handleBlogImageUpload} />
                                        <p style={{ color: 'var(--pk-brand-primary)', fontWeight: 600, margin: 0 }}>
                                            {blogUploading ? 'A carregar imagem...' : 'Clique para enviar uma foto do seu telemóvel/PC'}
                                        </p>
                                    </div>
                                )}
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label style={{ fontWeight: 600, color: 'var(--pk-text-primary)' }}>Conteúdo (Use emojis e quebras de linha livremente)</label>
                                <textarea name="content" required placeholder="Escreva o seu artigo aqui..." rows={12} style={{ padding: '1rem', borderRadius: '0.5rem', border: '1px solid var(--pk-surface-200)', fontSize: '1rem', width: '100%', resize: 'vertical', fontFamily: 'inherit' }}></textarea>
                            </div>
                            <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start', padding: '0.75rem 2rem', fontSize: '1.1rem' }}>Publicar Artigo</button>
                        </form>
                    </div>
                )}
            </main>
        </div>
    )
}
