'use client'

import { createProperty } from '@/app/dashboard/actions'
import { useState, useEffect } from 'react'
import { useActionState } from 'react'
import Link from 'next/link'
import { createClient } from '@/utils/supabase/client'
import PropertyForm from '@/components/PropertyForm'

export default function NewPropertyPage() {
    const [state, formAction] = useActionState(createProperty as any, { error: null } as any)
    const [isAdmin, setIsAdmin] = useState(false)

    useEffect(() => {
        const checkUser = async () => {
            const supabase = createClient()
            const { data: { user } } = await supabase.auth.getUser()
            if (user) {
                const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
                if (profile?.role === 'admin') setIsAdmin(true)
            }
        }
        checkUser()
    }, [])

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <div style={{ marginBottom: '2rem' }}>
                <Link href="/dashboard" style={{ color: 'var(--pk-text-secondary)', fontSize: '0.9rem' }}>← Voltar</Link>
                <h1 style={{ marginTop: '0.5rem', color: 'var(--pk-brand-primary)' }}>Novo Anúncio</h1>
                <p style={{ color: 'var(--pk-text-secondary)' }}>Preencha os dados do imóvel. Lembre-se das regras.</p>
            </div>

            {/* Rules Reminder */}
            <div style={{
                background: '#F8FAFC',
                border: '1px solid var(--pk-surface-200)',
                borderRadius: 'var(--pk-radius-md)',
                padding: '1rem',
                fontSize: '0.85rem',
                color: 'var(--pk-text-secondary)',
                marginBottom: '2rem'
            }}>
                <p style={{ marginBottom: '0.5rem' }}>💡 <strong>Regra de Ouro:</strong> Apenas anúncios directos dos proprietários ou autorizados.</p>
                <p>Taxa de visita fixa: <strong>150 MZN</strong>. Comissão: <strong>10% (Venda) / 1 Mês (Aluguel)</strong>.</p>
            </div>

            <PropertyForm
                onSubmit={formAction as any}
                isAdmin={isAdmin}
                error={state?.error}
            />
        </div>
    )
}
