'use client'

import Link from 'next/link'
import { signup } from '@/app/auth/actions'
import { useActionState } from 'react'

export default function SignupPage() {
    const [state, formAction, isPending] = useActionState(signup, null)

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ textAlign: 'center' }}>
                <h1 style={{ marginBottom: '0.5rem', color: 'var(--pk-brand-primary)' }}>Casa Fácil MZ</h1>
                <p style={{ color: 'var(--pk-text-secondary)' }}>Crie sua conta e comece a divulgar</p>
            </div>

            {/* Platform Rules & Fees */}
            <div style={{
                background: '#FFF7ED',
                border: '1px solid #FED7AA',
                borderRadius: 'var(--pk-radius-md)',
                padding: '1.25rem',
                fontSize: '0.9rem',
                color: '#9A3412'
            }}>
                <h3 style={{ fontSize: '1rem', marginBottom: '0.75rem', color: '#7C2D12' }}>Informações Importantes:</h3>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', paddingLeft: '1.25rem' }}>
                    <li><strong>Transparência:</strong> O Casa Fácil MZ não aceita anúncios de terceiros sem autorização do proprietário.</li>
                    <li><strong>Segurança:</strong> Trabalhamos diretamente com os donos para garantir a veracidade dos imóveis.</li>
                    <li><strong>Taxa de Visita:</strong> Cobramos <strong>150 MZN</strong> por cada visita agendada (manutenção da plataforma).</li>
                    <li><strong>Comissão:</strong> Cobramos <strong>10%</strong> em vendas e <strong>1 mês</strong> em aluguéis após o fecho.</li>
                </ul>
            </div>

            <form className="auth-form" action={formAction} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label htmlFor="fullName" style={{ fontSize: '0.9rem', fontWeight: 500 }}>Nome Completo</label>
                    <input
                        id="fullName"
                        name="fullName"
                        type="text"
                        required
                        style={{ padding: '0.75rem', borderRadius: 'var(--pk-radius-sm)', border: '1px solid var(--pk-surface-200)' }}
                    />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label htmlFor="phone" style={{ fontSize: '0.9rem', fontWeight: 500 }}>Telefone / WhatsApp</label>
                    <input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        placeholder="+258 84 123 4567"
                        style={{ padding: '0.75rem', borderRadius: 'var(--pk-radius-sm)', border: '1px solid var(--pk-surface-200)' }}
                    />
                </div>

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

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.9rem' }}>
                    <input
                        id="acceptedTerms"
                        name="acceptedTerms"
                        type="checkbox"
                        required
                        style={{ marginTop: '0.2rem' }}
                    />
                    <label htmlFor="acceptedTerms" style={{ color: 'var(--pk-text-secondary)', lineHeight: '1.4' }}>
                        Li e concordo com os <Link href="/terms" target="_blank" style={{ color: 'var(--pk-brand-primary)', textDecoration: 'underline' }}>Termos de Uso</Link> e regras da plataforma. Declaro ser o dono direto dos imóveis que anunciarei.
                    </label>
                </div>

                {state?.error && (
                    <div style={{ padding: '0.75rem', background: '#FEF2F2', color: 'var(--pk-danger)', borderRadius: 'var(--pk-radius-sm)', fontSize: '0.9rem' }}>
                        {state.error}
                    </div>
                )}
                {state?.success && (
                    <div style={{ padding: '0.75rem', background: '#ECFDF5', color: 'var(--pk-success)', borderRadius: 'var(--pk-radius-sm)', fontSize: '0.9rem' }}>
                        {state.success}
                    </div>
                )}

                <button type="submit" className="btn btn-primary" style={{ marginTop: '0.5rem' }} disabled={isPending}>
                    {isPending ? 'Criando Conta...' : 'Criar Conta'}
                </button>
            </form>

            <div style={{ textAlign: 'center', fontSize: '0.9rem', color: 'var(--pk-text-secondary)' }}>
                <p>Já tem conta?</p>
                <Link href="/login" style={{ color: 'var(--pk-brand-primary)', fontWeight: 500 }}>
                    Fazer Login
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
