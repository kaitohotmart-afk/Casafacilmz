import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'
import OwnerDashboard from '@/components/OwnerDashboard'
import AdminDashboard from '@/components/AdminDashboard'
import { getDashboardStats, getUsers } from './actions'

interface Props {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function DashboardPage({ searchParams }: Props) {
    const params = await searchParams
    const range = (params.range as any) || '30d'

    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    // Get user profile to check role
    const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user!.id)
        .single()

    const isAdmin = profile?.role === 'admin'

    // Build query for properties
    let query = supabase
        .from('properties')
        .select('*, property_images(id, image_url), profiles:owner_id(id, phone, full_name)')
        .order('created_at', { ascending: false })

    if (!isAdmin) {
        query = query.eq('owner_id', user!.id)
    }

    const { data: properties } = await query

    // If Admin, fetch stats and users
    let adminStats = null
    let allUsers: any[] = []
    let adminError = null

    if (isAdmin) {
        try {
            const statsRes = await getDashboardStats(range)
            if (statsRes.error) throw new Error(statsRes.error)
            adminStats = statsRes.stats

            const usersRes = await getUsers()
            if (usersRes.error) throw new Error(usersRes.error)
            allUsers = usersRes.users || []

            // Add some basic counts that aren't range-bound for the overview
            const { count: totalProperties } = await supabase.from('properties').select('*', { count: 'exact', head: true })
            const { count: activeProperties } = await supabase.from('properties').select('*', { count: 'exact', head: true }).eq('status', 'available')

            adminStats = {
                ...adminStats,
                totalProperties: totalProperties || 0,
                activeProperties: activeProperties || 0,
                totalUsers: allUsers.length
            }
        } catch (err: any) {
            console.error('Fatal error loading admin dashboard:', err)
            adminError = err.message
        }
    }

    // Fetch Interaction Stats for non-admins (Owners)
    let propertyStats: Record<string, { whatsapp: number, call: number }> = {}
    if (!isAdmin && properties) {
        const { data: logs } = await supabase
            .from('interaction_logs')
            .select('property_id, type')
            .in('property_id', properties.map(p => p.id))

        properties.forEach(p => {
            const propLogs = logs?.filter(l => l.property_id === p.id) || []
            propertyStats[p.id] = {
                whatsapp: propLogs.filter(l => l.type === 'whatsapp').length,
                call: propLogs.filter(l => l.type === 'call').length
            }
        })
    }

    if (isAdmin) {
        if (adminError) {
            return (
                <div style={{ padding: '4rem 1rem', textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
                    <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', padding: '2.5rem', borderRadius: '1rem', color: '#991B1B' }}>
                        <h1 style={{ fontSize: '1.5rem', marginBottom: '1rem', fontWeight: 800 }}>⚠️ Configuração Necessária</h1>
                        <p style={{ marginBottom: '1.5rem', lineHeight: 1.6 }}>Ocorreu um erro ao carregar o dashboard administrativo. Isso geralmente acontece por falta de configuração no servidor.</p>
                        <div style={{ background: 'white', padding: '1rem', borderRadius: '0.5rem', textAlign: 'left', fontSize: '0.9rem', marginBottom: '1.5rem', border: '1px solid #FECACA' }}>
                            <strong>Detalhe técnico:</strong><br />
                            <code>{adminError}</code>
                        </div>
                        <p style={{ fontSize: '0.875rem', opacity: 0.8 }}>Por favor, adicione a <code>SUPABASE_SERVICE_ROLE_KEY</code> nas variáveis de ambiente do projeto para resolver este erro.</p>
                    </div>
                </div>
            )
        }
        return <AdminDashboard
            properties={properties || []}
            stats={adminStats}
            users={allUsers}
            currentRange={range}
        />
    }

    return <OwnerDashboard properties={properties || []} profile={profile} stats={propertyStats} />
}
