import { createClient } from '@/utils/supabase/server'
import Navbar from '@/components/Navbar'
import Link from 'next/link'

export default async function BlogIndex() {
    const supabase = await createClient()

    const { data: blogs } = await supabase
        .from('blogs')
        .select('*')
        .order('created_at', { ascending: false })

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#F8FAFC' }}>
            <Navbar />

            <main className="container" style={{ padding: '4rem 0', flex: 1 }}>
                <header style={{ marginBottom: '3rem', textAlign: 'center' }}>
                    <h1 style={{ fontSize: '3rem', color: 'var(--pk-brand-primary)', marginBottom: '1rem', fontWeight: 900 }}>
                        Dicas e Notícias Imobiliárias
                    </h1>
                    <p style={{ color: 'var(--pk-text-secondary)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
                        Fique a par de tudo sobre o mercado imobiliário em Tete e Moçambique.
                    </p>
                </header>

                {blogs && blogs.length > 0 ? (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2.5rem' }}>
                        {blogs.map((post: any) => (
                            <Link href={`/blog/${post.slug}`} key={post.id} style={{ 
                                background: 'white', 
                                borderRadius: 'var(--pk-radius-lg)', 
                                overflow: 'hidden', 
                                boxShadow: 'var(--pk-shadow-sm)',
                                textDecoration: 'none',
                                color: 'inherit',
                                transition: 'transform 0.2s',
                                display: 'flex',
                                flexDirection: 'column'
                            }}>
                                <div style={{ height: '200px', background: 'var(--pk-surface-200)', overflow: 'hidden' }}>
                                    {post.image_url ? (
                                        <img src={post.image_url} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    ) : (
                                        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem' }}>📝</div>
                                    )}
                                </div>
                                <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--pk-brand-secondary)', fontWeight: 700, marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                                        {new Date(post.created_at).toLocaleDateString('pt-PT')}
                                    </div>
                                    <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--pk-brand-primary)', marginBottom: '1rem', lineHeight: 1.4 }}>
                                        {post.title}
                                    </h2>
                                    <p style={{ color: 'var(--pk-text-secondary)', fontSize: '0.95rem', flex: 1, marginBottom: '1.5rem', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                        {post.content.replace(/[#*]/g, '')}
                                    </p>
                                    <div style={{ color: 'var(--pk-brand-secondary)', fontWeight: 700, fontSize: '0.9rem' }}>
                                        Ler mais →
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div style={{ textAlign: 'center', padding: '8rem 0', background: 'white', borderRadius: 'var(--pk-radius-xl)', border: '2px dashed var(--pk-surface-200)' }}>
                        <h2 style={{ color: 'var(--pk-text-secondary)', marginBottom: '1rem' }}>Ainda não temos artigos</h2>
                        <p style={{ color: 'var(--pk-text-tertiary)' }}>Volte em breve para novidades!</p>
                    </div>
                )}
            </main>
        </div>
    )
}
