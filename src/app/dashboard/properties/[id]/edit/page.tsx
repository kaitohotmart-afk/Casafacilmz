import { createClient } from '@/utils/supabase/server'
import { notFound, redirect } from 'next/navigation'
import EditPropertyClient from '@/components/EditPropertyClient'

export default async function EditPropertyPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const supabase = await createClient()

    // Auth & Permission Check
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) redirect('/login')

    const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
    const isAdmin = profile?.role === 'admin'

    const { data: property, error } = await supabase
        .from('properties')
        .select('*, property_images(image_url)')
        .eq('id', id)
        .single()

    if (!property || error) {
        return notFound()
    }

    // Only owner or admin can edit
    if (property.owner_id !== user.id && !isAdmin) {
        return redirect('/dashboard')
    }

    return (
        <EditPropertyClient
            property={property}
            isAdmin={isAdmin}
        />
    )
}
