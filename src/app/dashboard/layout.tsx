import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <header style={{
                background: 'white',
                borderBottom: '1px solid var(--pk-surface-200)',
                padding: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
            }} className="container">
                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                    <Link href="/" style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--pk-brand-primary)' }}>
                        Casa Fácil MZ
                    </Link>
                    <nav style={{ display: 'flex', gap: '1rem' }}>
                        <Link href="/dashboard" style={{ fontWeight: 500 }}>Meus Imóveis</Link>
                    </nav>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span style={{ fontSize: '0.9rem', color: 'var(--pk-text-secondary)' }}>{user.email}</span>
                    <form action="/auth/signout" method="post">
                        <button type="submit" style={{ fontSize: '0.9rem', color: 'var(--pk-danger)', background: 'none', border: 'none', cursor: 'pointer' }}>
                            Sair
                        </button>
                    </form>
                </div>
            </header>

            <main className="container" style={{ flex: 1, padding: '2rem 1rem' }}>
                {children}
            </main>
        </div>
    )
}
