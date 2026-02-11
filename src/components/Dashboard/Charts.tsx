'use client'

import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, BarChart, Bar, Legend
} from 'recharts'

interface ChartsProps {
    trends: any[]
    sources: any[]
}

const COLORS = ['#8B5CF6', '#3B82F6', '#10B981', '#F59E0B', '#EF4444']

export function RevenueTrendChart({ trends }: { trends: any[] }) {
    return (
        <div className="premium-card" style={{ height: '400px' }}>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '2rem' }}>Tendência de Faturamento</h4>
            <ResponsiveContainer width="100%" height="80%">
                <AreaChart data={trends}>
                    <defs>
                        <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.1} />
                            <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                    <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9CA3AF' }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9CA3AF' }} />
                    <Tooltip
                        contentStyle={{
                            borderRadius: '12px',
                            border: 'none',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                            fontSize: '14px'
                        }}
                    />
                    <Area type="monotone" dataKey="revenue" stroke="#8B5CF6" strokeWidth={2} fillOpacity={1} fill="url(#colorRev)" />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    )
}

export function TrafficSourcePie({ sources }: { sources: any[] }) {
    return (
        <div className="premium-card" style={{ height: '400px' }}>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '2rem' }}>Origem de Tráfego</h4>
            <ResponsiveContainer width="100%" height="80%">
                <PieChart>
                    <Pie
                        data={sources}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                    >
                        {sources.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend verticalAlign="bottom" height={36} />
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}
