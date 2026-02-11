'use client'

import { LucideIcon } from 'lucide-react'

interface MetricCardProps {
    title: string
    value: string | number
    icon: LucideIcon
    trend?: {
        value: number
        label: string
    }
    color?: string
}

export default function MetricCard({ title, value, icon: Icon, trend, color = 'var(--pk-brand-primary)' }: MetricCardProps) {
    const isPositive = trend && trend.value > 0

    return (
        <div className="premium-card">
            <div className="card-header-icon">
                <div className="icon-box" style={{ background: `${color}10`, color }}>
                    <Icon size={24} />
                </div>
                {trend && (
                    <span className={`trend-badge ${isPositive ? 'trend-up' : 'trend-down'}`}>
                        {isPositive ? '+' : ''}{trend.value}% {trend.label}
                    </span>
                )}
            </div>
            <div>
                <p style={{ color: 'var(--pk-text-tertiary)', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.25rem' }}>{title}</p>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--pk-text-primary)' }}>{value}</h3>
            </div>
        </div>
    )
}
