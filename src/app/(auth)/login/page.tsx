'use client'

import Link from 'next/link'
import { login } from '@/app/auth/actions'
import { useActionState } from 'react'

export default function LoginPage() {
    const [state, formAction, isPending] = useActionState(login, null)

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ textAlign: 'center' }}>
                <h1 style={{ marginBottom: '0.5rem', color: 'var(--pk-brand-primary)' }}>Casa Fácil MZ</h1>
                <p style={{ color: 'var(--pk-text-secondary)' }}>Login para Anunciantes</p>
            </div>

            <form className="auth-form" action={formAction} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label htmlFor="email" style={{ fontSize: '0.9rem', fontWeight: 500 }}>Email</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="seu@email.com"
                        style={{ padding: '0.75rem', borderRadius: 'var(--pk-radius-sm)', border: '1px solid var(--pk-surface-200)' }}
                    />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label htmlFor="password" style={{ fontSize: '0.9rem', fontWeight: 500 }}>Senha</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        required
                        placeholder="••••••••"
                        style={{ padding: '0.75rem', borderRadius: 'var(--pk-radius-sm)', border: '1px solid var(--pk-surface-200)' }}
                    />
                </div>

                {state?.error && (
                    <div style={{ padding: '0.75rem', background: '#FEF2F2', color: 'var(--pk-danger)', borderRadius: 'var(--pk-radius-sm)', fontSize: '0.9rem' }}>
                        {state.error}
                    </div>
                )}

                <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }} disabled={isPending}>
                    {isPending ? 'Entrando...' : 'Entrar'}
                </button>
            </form>

            <div style={{ textAlign: 'center', fontSize: '0.9rem', color: 'var(--pk-text-secondary)' }}>
                <p>Ainda não tem conta?</p>
                <Link href="/signup" style={{ color: 'var(--pk-brand-primary)', fontWeight: 500 }}>
                    Criar conta de proprietário
                </Link>
            </div>

            <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                <Link href="/" style={{ fontSize: '0.85rem', color: 'var(--pk-text-tertiary)' }}>
                    ← Voltar ao site
                </Link>
            </div>
        </div>
    )
}
