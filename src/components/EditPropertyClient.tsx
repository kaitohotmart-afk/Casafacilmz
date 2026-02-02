'use client'

import { updateProperty } from '@/app/dashboard/actions'
import { useActionState } from 'react'
import Link from 'next/link'
import PropertyForm from '@/components/PropertyForm'

export default function EditPropertyClient({ property, isAdmin }: { property: any, isAdmin: boolean }) {
    // Bind the first argument (propertyId) to the action
    const updatePropertyWithId = updateProperty.bind(null, property.id)
    const [state, formAction] = useActionState(updatePropertyWithId as any, { error: null } as any)

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <div style={{ marginBottom: '2rem' }}>
                <Link href="/dashboard" style={{ color: 'var(--pk-text-secondary)', fontSize: '0.9rem' }}>← Voltar</Link>
                <h1 style={{ marginTop: '0.5rem', color: 'var(--pk-brand-primary)' }}>Editar Anúncio</h1>
                <p style={{ color: 'var(--pk-text-secondary)' }}>Atualize os dados do seu imóvel.</p>
            </div>

            <PropertyForm
                initialData={property}
                onSubmit={formAction as any}
                isAdmin={isAdmin}
                error={state?.error}
            />
        </div>
    )
}
