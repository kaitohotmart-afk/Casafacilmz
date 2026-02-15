'use server'

import { createClient, createAdminClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

function containsPhoneNumber(text: string): boolean {
    // Regex matches common Mozambican formats and variations
    // - +258 followed by 8x or 21
    // - 82, 83, 84, 85, 86, 87 followed by 7 digits
    // - Includes matches with spaces, dots, or dashes
    const phoneRegex = /(?:\+258|258)?\s*(?:\d{2}|\d{3})\s*\d{3}\s*\d{3,4}/g;
    return phoneRegex.test(text.replace(/[\.\-\s]/g, ''));
}

export async function createProperty(arg1: any, arg2?: any) {
    console.log('--- createProperty CALLED ---');
    console.log('arg1 type:', typeof arg1, arg1 instanceof FormData ? 'is FormData' : 'is not FormData');
    console.log('arg2 type:', typeof arg2, arg2 instanceof FormData ? 'is FormData' : 'is not FormData');

    // Handle Next.js 14/15 useActionState (prevState, formData) 
    // vs standard action (formData)
    let formData: FormData | null = null;

    if (arg2 instanceof FormData) {
        formData = arg2;
    } else if (arg1 instanceof FormData) {
        formData = arg1;
    }

    if (!formData) {
        console.error('CreateProperty: No FormData found!', { arg1, arg2 });
        return { error: 'Dados do formulário não recebidos pelo servidor. Por favor, reinicie o servidor de desenvolvimento (npm run dev).' }
    }

    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
        return { error: 'Usuário não autenticado.' }
    }

    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const price = parseFloat(formData.get('price') as string)
    const locationDistrict = formData.get('locationDistrict') as string
    const type = formData.get('type') as string

    if (containsPhoneNumber(description)) {
        return { error: 'PROIBIDO: Não é permitido colocar números de telefone na descrição. Use apenas os campos oficiais de contacto.' }
    }

    // Admin External Owner Fields
    const externalOwnerName = formData.get('externalOwnerName') as string
    const externalOwnerPhone = formData.get('externalOwnerPhone') as string

    // Check if user is admin if these fields are present? 
    // Ideally we re-verify role here for security, but the fields won't be sent by normal users (hidden in UI) and extra data is harmless if ignored or handled carefully.
    // Let's stricter check:
    let finalExternalName = null
    let finalExternalPhone = null

    const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
    if (profile?.role === 'admin') {
        if (externalOwnerName) finalExternalName = externalOwnerName
        if (externalOwnerPhone) finalExternalPhone = externalOwnerPhone
    }

    // Images are passed as hidden fields or separate argument?
    // Since we are using standard form action, we can collect them from formData if we append them as multiple inputs with same name 'imageUrls'.
    const imageUrls = formData.getAll('imageUrls') as string[]

    if (imageUrls.length === 0) {
        return { error: 'É necessário adicionar pelo menos uma foto.' }
    }
    if (imageUrls.length > 8) {
        return { error: 'Máximo de 8 fotos permitidas.' }
    }

    // 1. Insert Property
    const { data: property, error: propError } = await supabase
        .from('properties')
        .insert({
            owner_id: user.id,
            title,
            description,
            price,
            location_district: locationDistrict,
            type,
            status: 'available',
            external_owner_name: finalExternalName,
            external_owner_phone: finalExternalPhone
        })
        .select()
        .single()

    if (propError) {
        return { error: 'Erro ao criar imóvel: ' + propError.message }
    }

    // 2. Insert Images
    const imageInserts = imageUrls.map((url, index) => ({
        property_id: property.id,
        image_url: url,
        display_order: index
    }))

    const { error: imgError } = await supabase
        .from('property_images')
        .insert(imageInserts)

    if (imgError) {
        // Ideally roll back property creation, but for MVP we might just error out. 
        // Or we could delete the property.
        await supabase.from('properties').delete().eq('id', property.id)
        return { error: 'Erro ao salvar imagens: ' + imgError.message }
    }

    revalidatePath('/dashboard')
    redirect('/dashboard')
}

export async function updateProperty(propertyId: string, arg1: any, arg2?: any) {
    let formData: FormData | null = null;
    if (arg2 instanceof FormData) formData = arg2;
    else if (arg1 instanceof FormData) formData = arg1;

    if (!formData) return { error: 'Dados não recebidos.' }

    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { error: 'Não autenticado.' }

    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const price = parseFloat(formData.get('price') as string)
    const locationDistrict = formData.get('locationDistrict') as string
    const type = formData.get('type') as string
    const status = formData.get('status') as string

    if (containsPhoneNumber(description)) {
        return { error: 'PROIBIDO: Não é permitido colocar números de telefone na descrição. Use apenas os campos oficiais de contacto.' }
    }

    // Admin External Owner Fields
    const externalOwnerName = formData.get('externalOwnerName') as string
    const externalOwnerPhone = formData.get('externalOwnerPhone') as string

    const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
    const isAdmin = profile?.role === 'admin'

    // Verify ownership or admin
    const { data: existingProp } = await supabase.from('properties').select('owner_id').eq('id', propertyId).single()
    if (!existingProp || (existingProp.owner_id !== user.id && !isAdmin)) {
        return { error: 'Acesso negado ou imóvel não encontrado.' }
    }

    const updateData: any = {
        title,
        description,
        price,
        location_district: locationDistrict,
        type,
        status: status || 'available'
    }

    if (isAdmin) {
        updateData.external_owner_name = externalOwnerName || null
        updateData.external_owner_phone = externalOwnerPhone || null
    }

    const { error: propError } = await supabase
        .from('properties')
        .update(updateData)
        .eq('id', propertyId)

    if (propError) return { error: 'Erro ao atualizar: ' + propError.message }

    // Update Images if provided (simplified: replace all if new ones provided, or just keep same if empty)
    const imageUrls = formData.getAll('imageUrls') as string[]
    if (imageUrls.length > 0) {
        // Delete old images
        await supabase.from('property_images').delete().eq('property_id', propertyId)

        // Insert new ones
        const imageInserts = imageUrls.map((url, index) => ({
            property_id: propertyId,
            image_url: url,
            display_order: index
        }))
        await supabase.from('property_images').insert(imageInserts)
    }

    revalidatePath('/dashboard')
    revalidatePath(`/properties/${propertyId}`)
    redirect('/dashboard')
}

export async function deleteProperty(propertyId: string) {
    console.log('--- deleteProperty START ---', propertyId)
    const supabase = await createClient()

    // Auth Check
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
        console.warn('deleteProperty: Not authenticated')
        return { error: 'Not authenticated' }
    }

    // Role Check
    const { data: profile, error: profileError } = await supabase.from('profiles').select('role').eq('id', user.id).single()
    console.log('deleteProperty: Profile fetch result:', { role: profile?.role, error: profileError })

    if (profileError || profile?.role !== 'admin') {
        return { error: 'Não autorizado: Sua conta não tem permissão de administrador.' }
    }

    try {
        // Diagnostic check: Can we even see this property?
        console.log('deleteProperty: Checking visibility for prop:', propertyId)
        const { data: visibleProp, error: visibleError } = await supabase
            .from('properties')
            .select('id, owner_id')
            .eq('id', propertyId)
            .single()

        console.log('deleteProperty: Visibility check result:', { visibleProp, error: visibleError })

        if (visibleError || !visibleProp) {
            return { error: 'O imóvel não foi encontrado ou você não tem permissão para visualizá-lo (RLS SELECT).' }
        }

        const adminSupabase = await createAdminClient()

        console.log('deleteProperty: Deleting images for prop:', propertyId)
        const { count: imgCount, error: err1 } = await adminSupabase
            .from('property_images')
            .delete({ count: 'exact' })
            .eq('property_id', propertyId)
        console.log(`deleteProperty: Removed ${imgCount} images. Error:`, err1)

        console.log('deleteProperty: Deleting interaction logs...')
        const { count: logCount, error: err2 } = await adminSupabase
            .from('interaction_logs')
            .delete({ count: 'exact' })
            .eq('property_id', propertyId)
        console.log(`deleteProperty: Removed ${logCount} logs. Error:`, err2)

        console.log('deleteProperty: Deleting financial entries...')
        const { count: finCount, error: err3 } = await adminSupabase
            .from('financial_entries')
            .delete({ count: 'exact' })
            .eq('property_id', propertyId)
        console.log(`deleteProperty: Removed ${finCount} financial entries. Error:`, err3)

        console.log('deleteProperty: Finally deleting property row...')
        const { count: propCount, error: propError } = await adminSupabase
            .from('properties')
            .delete({ count: 'exact' })
            .eq('id', propertyId)

        if (propError) {
            console.error('Error deleting property row:', propError)
            return { error: 'Erro no banco de dados ao remover imóvel: ' + propError.message }
        }

        console.log(`deleteProperty: Removed ${propCount} property rows.`)

        if (propCount === 0) {
            return { error: 'O imóvel não foi encontrado ou já foi removido.' }
        }

        console.log('deleteProperty: SUCCESS')
        revalidatePath('/dashboard')
        revalidatePath('/')
        revalidatePath('/properties', 'layout')
        return { success: true, count: propCount }
    } catch (e: any) {
        console.error('deleteProperty: FATAL ERROR:', e)
        return { error: 'Erro fatal: ' + e.message }
    }
}

export async function logFinancialEntry(data: { property_id?: string, type: 'visit' | 'commission' | 'other', amount: number, description?: string }) {
    const supabase = await createClient()

    // Auth & Admin Check
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { error: 'Não autenticado' }

    const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
    if (profile?.role !== 'admin') return { error: 'Não autorizado' }

    const adminSupabase = await createAdminClient()
    const { error } = await adminSupabase.from('financial_entries').insert(data)

    if (error) return { error: error.message }

    revalidatePath('/dashboard')
    return { success: true }
}

export async function updatePropertyStatus(propertyId: string, status: string) {
    const supabase = await createClient()

    // Auth & Admin Check
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { error: 'Não autenticado' }

    const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
    if (profile?.role !== 'admin') return { error: 'Não autorizado' }

    const adminSupabase = await createAdminClient()
    const { error } = await adminSupabase.from('properties').update({ status }).eq('id', propertyId)

    if (error) return { error: error.message }

    revalidatePath('/dashboard')
    return { success: true }
}

export async function logInteraction(propertyId: string, ownerId: string, type: 'whatsapp' | 'call') {
    const supabase = await createClient()

    const { error } = await supabase.from('interaction_logs').insert({
        property_id: propertyId,
        owner_id: ownerId,
        type
    })

    if (error) {
        console.error('Error logging interaction:', error)
        return { error: error.message }
    }

    return { success: true }
}

export async function updateProfilePhone(phone: string) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { error: 'Não autenticado' }

    const { error } = await supabase
        .from('profiles')
        .update({ phone })
        .eq('id', user.id)

    if (error) return { error: error.message }

    revalidatePath('/dashboard')
    return { success: true }
}

export async function logEvent(eventType: string, metadata: any = {}) {
    const supabase = await createClient()

    // Optionally get user if available, but not strictly required for public events
    // const { data: { user } } = await supabase.auth.getUser()

    const { error } = await supabase.from('analytics_events').insert({
        event_type: eventType,
        metadata,
        created_at: new Date().toISOString()
    })

    if (error) {
        console.error('Error logging analytics event:', error)
        return { error: error.message }
    }

    return { success: true }
}

export async function getUsers() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { error: 'Não autenticado' }

    const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
    if (profile?.role !== 'admin') return { error: 'Não autorizado' }

    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
    if (!serviceRoleKey) {
        console.error('ERROR: SUPABASE_SERVICE_ROLE_KEY is missing')
        return { error: 'Configuração do servidor incompleta (Service Role missing)' }
    }

    try {
        const adminSupabase = await createAdminClient()
        const { data: users, error } = await adminSupabase
            .from('profiles')
            .select('*')
            .order('updated_at', { ascending: false })

        if (error) throw error
        return { users }
    } catch (err: any) {
        console.error('Error in getUsers:', err)
        return { error: 'Falha ao carregar utilizadores: ' + (err.message || 'Erro desconhecido') }
    }
}

export async function getDashboardStats(range: 'today' | '7d' | '30d' | 'all' = '30d') {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { error: 'Não autenticado' }

    const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
    if (profile?.role !== 'admin') return { error: 'Não autorizado' }

    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
    if (!serviceRoleKey) {
        console.error('ERROR: SUPABASE_SERVICE_ROLE_KEY is missing')
        return { error: 'Configuração do servidor incompleta (Service Role missing)' }
    }

    try {
        const adminSupabase = await createAdminClient()

        const now = new Date()
        let startDate = new Date(0) // Default to all time

        if (range === 'today') {
            startDate = new Date(now.setHours(0, 0, 0, 0))
        } else if (range === '7d') {
            startDate = new Date(now.setDate(now.getDate() - 7))
        } else if (range === '30d') {
            startDate = new Date(now.setDate(now.getDate() - 30))
        }

        const startIso = startDate.toISOString()

        // 1. Fetch Analytics Events
        const { data: events } = await adminSupabase
            .from('analytics_events')
            .select('*')
            .gte('created_at', startIso)

        // 2. Fetch Financial Entries
        const { data: financials } = await adminSupabase
            .from('financial_entries')
            .select('*')
            .gte('created_at', startIso)

        // 3. Fetch Interaction Logs
        const { data: interactions } = await adminSupabase
            .from('interaction_logs')
            .select('*')
            .gte('created_at', startIso)

        // Aggregations
        const totalVisits = events?.filter(e => e.event_type === 'page_view').length || 0
        const whatsappClicks = events?.filter(e => e.event_type === 'click_whatsapp').length || 0
        const callClicks = events?.filter(e => e.event_type === 'click_call').length || 0
        const totalRevenue = financials?.reduce((sum, f) => sum + f.amount, 0) || 0

        // Traffic Sources
        const sourcesMap: Record<string, number> = {}
        events?.filter(e => e.event_type === 'page_view').forEach(e => {
            const s = e.source || 'Direto'
            sourcesMap[s] = (sourcesMap[s] || 0) + 1
        })
        const trafficSources = Object.entries(sourcesMap).map(([name, value]) => ({ name, value }))

        // Trends (Daily)
        const dailyMap: Record<string, { date: string, visits: number, revenue: number }> = {}
        events?.filter(e => e.event_type === 'page_view').forEach(e => {
            const d = new Date(e.created_at).toLocaleDateString()
            if (!dailyMap[d]) dailyMap[d] = { date: d, visits: 0, revenue: 0 }
            dailyMap[d].visits++
        })
        financials?.forEach(f => {
            const d = new Date(f.created_at).toLocaleDateString()
            if (!dailyMap[d]) dailyMap[d] = { date: d, visits: 0, revenue: 0 }
            dailyMap[d].revenue += f.amount
        })

        const trends = Object.values(dailyMap).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

        return {
            stats: {
                totalVisits,
                whatsappClicks,
                callClicks,
                totalRevenue,
                trafficSources,
                trends,
                funnel: [
                    { name: 'Visitas', value: totalVisits },
                    { name: 'Contactos', value: whatsappClicks + callClicks },
                    { name: 'Vendas/Ganhos', value: financials?.length || 0 }
                ]
            }
        }
    } catch (err: any) {
        console.error('Error in getDashboardStats:', err)
        return { error: 'Falha ao carregar estatísticas: ' + (err.message || 'Erro desconhecido') }
    }
}
