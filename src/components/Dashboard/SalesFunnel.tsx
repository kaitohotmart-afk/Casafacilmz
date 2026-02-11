'use client'

interface FunnelStep {
    name: string
    value: number
}

export default function SalesFunnel({ data }: { data: FunnelStep[] }) {
    const maxValue = Math.max(...data.map(d => d.value), 1)

    return (
        <div className="premium-card h-full">
            <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.5rem' }}>Funil de Conversão</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {data.map((step, index) => {
                    const width = (step.value / maxValue) * 100
                    return (
                        <div key={step.name} style={{ position: 'relative' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '0.25rem' }}>
                                <span style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--pk-text-secondary)' }}>{step.name}</span>
                                <span style={{ fontSize: '0.875rem', fontWeight: 700 }}>{step.value}</span>
                            </div>
                            <div style={{ width: '100%', background: 'var(--pk-surface-100)', height: '2rem', borderRadius: '0.5rem', overflow: 'hidden' }}>
                                <div
                                    style={{
                                        height: '100%',
                                        background: 'linear-gradient(90deg, #8b5cf6, #6366f1)',
                                        width: `${width}%`,
                                        transition: 'width 0.5s ease-in-out'
                                    }}
                                />
                            </div>
                            {index < data.length - 1 && (
                                <div style={{
                                    position: 'absolute',
                                    left: '50%',
                                    bottom: '-1.25rem',
                                    transform: 'translateX(-50%)',
                                    fontSize: '0.65rem',
                                    fontWeight: 800,
                                    color: 'var(--pk-text-tertiary)',
                                    backgroundColor: 'white',
                                    padding: '0 0.5rem',
                                    zIndex: 1
                                }}>
                                    {((data[index + 1].value / step.value) * 100 || 0).toFixed(1)}% CR
                                </div>
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
