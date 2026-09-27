import { createClient } from '@/utils/supabase/server'
import Navbar from '@/components/Navbar'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import ShareButton from '@/components/ShareButton'

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const supabase = await createClient()

    const { data: post } = await supabase
        .from('blogs')
        .select('*')
        .eq('slug', slug)
        .single()

    if (!post) {
        notFound()
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'white' }}>
            <Navbar />

            {post.image_url && (
                <div style={{ width: '100%', height: '400px', position: 'relative', background: 'var(--pk-surface-200)' }}>
                    <img src={post.image_url} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }}></div>
                </div>
            )}

            <main className="container" style={{ padding: '4rem 0', flex: 1, maxWidth: '800px', margin: '0 auto', marginTop: post.image_url ? '-100px' : '0', position: 'relative', zIndex: 10 }}>
                <div style={{ background: 'white', padding: post.image_url ? '3rem' : '0', borderRadius: 'var(--pk-radius-xl)', boxShadow: post.image_url ? 'var(--pk-shadow-lg)' : 'none' }}>
                    <div style={{ marginBottom: '2rem' }}>
                        <Link href="/blog" style={{ color: 'var(--pk-brand-secondary)', fontWeight: 600, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                            ← Voltar às Dicas
                        </Link>
                        <div style={{ fontSize: '0.9rem', color: 'var(--pk-text-tertiary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem' }}>
                            {new Date(post.created_at).toLocaleDateString('pt-PT', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </div>
                        <h1 style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--pk-brand-primary)', lineHeight: 1.2 }}>
                            {post.title}
                        </h1>
                    </div>

                    <div style={{ whiteSpace: 'pre-wrap', lineHeight: 1.8, fontSize: '1.1rem', color: 'var(--pk-text-secondary)' }}>
                        {post.content}
                    </div>

                    <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid var(--pk-surface-200)', textAlign: 'center' }}>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem', color: 'var(--pk-brand-primary)' }}>Achou esta dica útil?</h3>
                        <p style={{ color: 'var(--pk-text-secondary)', marginBottom: '1rem' }}>Partilhe com os seus amigos e ajude mais pessoas a encontrar o seu lar ideal com segurança!</p>
                        <ShareButton 
                            title={post.title} 
                            text="Olha esta dica incrível da Casa Fácil MZ:" 
                            url={`/blog/${post.slug}`} 
                        />
                    </div>
                </div>
            </main>
        </div>
    )
}
