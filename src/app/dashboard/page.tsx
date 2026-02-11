import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'
import OwnerDashboard from '@/components/OwnerDashboard'
import AdminDashboard from '@/components/AdminDashboard'

export default async function DashboardPage() {
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
        .select('*, property_images(id, image_url), profiles:owner_id(id, phone)')
        .order('created_at', { ascending: false })

    if (!isAdmin) {
        query = query.eq('owner_id', user!.id)
    }

    const { data: properties } = await query

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

    // If Admin, fetch stats
    let stats = null
    if (isAdmin) {
        const { count: totalProperties } = await supabase.from('properties').select('*', { count: 'exact', head: true })
        const { count: activeProperties } = await supabase.from('properties').select('*', { count: 'exact', head: true }).eq('status', 'available')
        const { count: totalUsers } = await supabase.from('profiles').select('*', { count: 'exact', head: true })

        const { data: financeData } = await supabase.from('financial_entries').select('type, amount')

        const totalRevenue = financeData?.reduce((acc, curr) => acc + Number(curr.amount), 0) || 0
        const visitRevenue = financeData?.filter(f => f.type === 'visit').reduce((acc, curr) => acc + Number(curr.amount), 0) || 0
        const commissionRevenue = financeData?.filter(f => f.type === 'commission').reduce((acc, curr) => acc + Number(curr.amount), 0) || 0

        // Analytics Stats
        const { data: analyticsData } = await supabase
            .from('analytics_events')
            .select('event_type, source')

        const totalVisits = analyticsData?.filter(e => e.event_type === 'page_view').length || 0
        const totalCalls = analyticsData?.filter(e => e.event_type === 'click_call').length || 0
        const totalWhatsapp = analyticsData?.filter(e => e.event_type === 'click_whatsapp').length || 0

        // Group visits by source
        const visitsBySource = analyticsData
            ?.filter(e => e.event_type === 'page_view')
            .reduce((acc: any, curr) => {
                const source = curr.source || 'direct'
                acc[source] = (acc[source] || 0) + 1
                return acc
            }, {}) || {}

        stats = {
            totalProperties: totalProperties || 0,
            activeProperties: activeProperties || 0,
            totalUsers: totalUsers || 0,
            totalRevenue,
            visitRevenue,
            commissionRevenue,
            analytics: {
                totalVisits,
                totalCalls,
                totalWhatsapp,
                visitsBySource
            }
        }
    }

    if (isAdmin) {
        return <AdminDashboard properties={properties || []} stats={stats} />
    }

    return <OwnerDashboard properties={properties || []} profile={profile} stats={propertyStats} />
}
