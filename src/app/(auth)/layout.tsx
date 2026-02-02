export default function AuthLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
            <div style={{ width: '100%', maxWidth: '400px', padding: '2rem', background: 'white', borderRadius: 'var(--pk-radius-lg)', boxShadow: 'var(--pk-shadow-lg)' }}>
                {children}
            </div>
        </div>
    )
}
