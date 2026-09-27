export default function Loading() {
    return (
        <div className="container" style={{ paddingTop: '100px', minHeight: '80vh' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2.5rem' }}>
                {[1, 2, 3, 4, 5, 6].map(i => (
                    <div key={i} style={{ 
                        background: 'var(--pk-surface-100)', 
                        height: '380px', 
                        borderRadius: 'var(--pk-radius-lg)', 
                        animation: 'pulse 1.5s infinite ease-in-out',
                        border: '1px solid var(--pk-surface-200)'
                    }}></div>
                ))}
            </div>
        </div>
    )
}
