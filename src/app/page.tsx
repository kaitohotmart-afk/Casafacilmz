import { createClient } from '@/utils/supabase/server'
import Navbar from '@/components/Navbar'
import PropertyCard from '@/components/PropertyCard'
import Link from 'next/link'

export const revalidate = 60

export default async function Home() {
  const supabase = await createClient()

  const { data: properties } = await supabase
    .from('properties')
    .select('*, property_images(image_url)')
    .eq('status', 'available')
    .order('created_at', { ascending: false })
    .limit(6)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>

      <Navbar />

      {/* Hero Section */}
      <section style={{
        position: 'relative',
        height: '500px',
        display: 'flex',
        alignItems: 'center',
        color: 'white',
        marginBottom: 'var(--pk-section-gap)',
        overflow: 'hidden'
      }}>
        {/* Background Image with Overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: -2
        }} />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to right, rgba(15, 23, 42, 0.98), rgba(15, 23, 42, 0.7))',
          zIndex: -1
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: '800px' }}>
            <h1 style={{
              fontSize: '3.5rem',
              lineHeight: 1.1,
              marginBottom: '1.5rem',
              color: 'white',
              fontWeight: 800,
              textShadow: '0 4px 15px rgba(0,0,0,1), 0 2px 5px rgba(0,0,0,0.8)'
            }}>
              Seu novo lar em <br />
              <span style={{ color: 'var(--pk-brand-secondary)' }}>Tete</span> está aqui.
            </h1>
            <p style={{
              fontSize: '1.3rem',
              marginBottom: '3rem',
              opacity: 1,
              fontWeight: 600,
              lineHeight: 1.6,
              color: '#F1F5F9',
              textShadow: '0 2px 10px rgba(0,0,0,1)'
            }}>
              A plataforma mais completa e segura para comprar, vender <br />
              ou alugar imóveis na província de Tete.
            </p>

            {/* Quick Search / Filter Bar */}
            <form action="/properties" method="GET" style={{
              background: 'white',
              padding: '0.75rem',
              borderRadius: 'var(--pk-radius-lg)',
              display: 'flex',
              gap: '1rem',
              boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.3)',
              maxWidth: '750px',
              flexWrap: 'wrap'
            }}>
              <div style={{ flex: 1, minWidth: '150px' }}>
                <select name="type" style={{ width: '100%', padding: '0.8rem', border: '1px solid var(--pk-surface-200)', borderRadius: 'var(--pk-radius-md)', fontWeight: 600, background: 'white' }}>
                  <option value="">Tipo de Imóvel</option>
                  <option value="sale">Casa</option>
                  <option value="rent">Aluguel</option>
                  <option value="land">Terreno</option>
                  <option value="house_land">Terreno com Casa</option>
                </select>
              </div>
              <div style={{ flex: 1, minWidth: '200px' }}>
                <input
                  name="district"
                  type="text"
                  placeholder="Escreva o Bairro (ex: Matundo)"
                  style={{ width: '100%', padding: '0.8rem', border: '1px solid var(--pk-surface-200)', borderRadius: 'var(--pk-radius-md)', fontWeight: 500 }}
                />
              </div>
              <button type="submit" className="btn btn-primary" style={{ padding: '0 2.5rem', fontWeight: 700 }}>
                Procurar
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Category Quick Links */}
      <section className="container" style={{ marginBottom: '5rem', marginTop: '-3rem', position: 'relative', zIndex: 10 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', maxWidth: '1000px', margin: '0 auto' }}>
          {[
            { title: 'Casas à Venda', icon: '🏠', type: 'sale' },
            { title: 'Casas de Aluguer', icon: '🔑', type: 'rent' },
            { title: 'Terrenos (+ Casa)', icon: '🏗️', type: 'land' }
          ].map((cat, i) => (
            <Link key={i} href={`/properties?type=${cat.type}`} style={{
              background: 'white',
              padding: '2.5rem 2rem',
              borderRadius: 'var(--pk-radius-lg)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textDecoration: 'none',
              color: 'inherit',
              boxShadow: 'var(--pk-shadow-md)',
              border: '1px solid var(--pk-surface-100)',
              transition: 'all 0.3s ease',
              textAlign: 'center'
            }}>
              <span style={{ fontSize: '3rem', marginBottom: '1.2rem' }}>{cat.icon}</span>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem', color: 'var(--pk-brand-primary)', fontWeight: 700 }}>{cat.title}</h3>
              <div style={{ fontSize: '0.95rem', color: 'var(--pk-brand-secondary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                Ver anúncios <span>→</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Properties */}
      <section id="recent" className="container" style={{ marginBottom: '5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem' }}>
          <div>
            <h2 style={{ fontSize: '2.2rem', marginBottom: '0.5rem', fontWeight: 800 }}>Imóveis Recentes</h2>
            <p style={{ color: 'var(--pk-text-secondary)', fontSize: '1.1rem' }}>As melhores oportunidades seleccionadas para si.</p>
          </div>
          <Link href="/properties" style={{ color: 'var(--pk-brand-secondary)', fontWeight: 600, fontSize: '0.95rem' }}>
            Ver todos os imóveis →
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2.5rem' }}>
          {properties?.map((property: any) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        {(!properties || properties.length === 0) && (
          <div style={{ textAlign: 'center', padding: '5rem 0', color: 'var(--pk-text-tertiary)' }}>
            Nenhum imóvel disponível no momento.
          </div>
        )}
      </section>

      {/* How it Works Section (Detailed & Clear) */}
      <section id="how-it-works" style={{ background: 'var(--pk-surface-50)', padding: '6rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <h2 style={{ fontSize: '2.8rem', color: 'var(--pk-brand-primary)', marginBottom: '1.2rem', fontWeight: 800 }}>Como Funciona o Casa Fácil MZ?</h2>
            <p style={{ color: 'var(--pk-text-secondary)', maxWidth: '700px', margin: '0 auto', fontSize: '1.2rem', lineHeight: 1.6 }}>
              Queremos que sua experiência seja segura e transparente. Conheça as nossas regras fundamentais:
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem' }}>
            <div style={{ background: 'white', padding: '3rem 2.5rem', borderRadius: 'var(--pk-radius-2xl)', boxShadow: 'var(--pk-shadow-lg)', border: '1px solid var(--pk-surface-100)' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>💡</div>
              <h3 style={{ fontSize: '1.5rem', color: 'var(--pk-brand-primary)', fontWeight: 700, marginBottom: '1rem' }}>Anúncios Directos (Sem Intermediários)</h3>
              <p style={{ color: 'var(--pk-text-secondary)', lineHeight: '1.7', fontSize: '1.05rem' }}>
                Para evitar burlas e taxas inflacionadas, <strong>não aceitamos anúncios de terceiros ("Nhonguistas")</strong>. Trabalhamos exclusivamente com os proprietários legais ou pessoas com autorização directa. Isso garante que o preço que você vê é o preço real.
              </p>
            </div>

            <div style={{ background: 'white', padding: '3rem 2.5rem', borderRadius: 'var(--pk-radius-2xl)', boxShadow: 'var(--pk-shadow-lg)', border: '1px solid var(--pk-surface-100)' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>💰</div>
              <h3 style={{ fontSize: '1.5rem', color: 'var(--pk-brand-primary)', fontWeight: 700, marginBottom: '1rem' }}>Visitas Agendadas (150 MZN)</h3>
              <p style={{ color: 'var(--pk-text-secondary)', lineHeight: '1.7', fontSize: '1.05rem' }}>
                Cobramos uma taxa fixa de <strong>150 MZN por visita</strong>. Este valor cobre os nossos custos de <strong>transporte</strong> e serve para <strong>evitar curiosos</strong>, garantindo que apenas clientes realmente interessados e prontos para fechar negócio visitem o seu imóvel.
              </p>
            </div>

            <div style={{ background: 'white', padding: '3rem 2.5rem', borderRadius: 'var(--pk-radius-2xl)', boxShadow: 'var(--pk-shadow-lg)', border: '1px solid var(--pk-surface-100)' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>🤝</div>
              <h3 style={{ fontSize: '1.5rem', color: 'var(--pk-brand-primary)', fontWeight: 700, marginBottom: '1rem' }}>Comissões no Sucesso</h3>
              <p style={{ color: 'var(--pk-text-secondary)', lineHeight: '1.7', fontSize: '1.05rem' }}>
                O nosso lucro vem do seu sucesso. Cobramos <strong>10% para Vendas</strong> de imóveis e o valor de <strong>1 Mês para Alugueres</strong>. Esta taxa é paga apenas após o fecho do contrato, cobrindo todo o marketing e segurança da transação.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Modern CTA Section */}
      <section className="container" style={{ padding: '6rem 0' }}>
        <div style={{
          background: 'linear-gradient(135deg, var(--pk-brand-primary) 0%, #172554 100%)',
          padding: '6rem 4rem',
          borderRadius: 'var(--pk-radius-3xl)',
          color: 'white',
          textAlign: 'center',
          boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.4)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <h2 style={{ fontSize: '3rem', marginBottom: '1.5rem', fontWeight: 800 }}>Deseja vender ou alugar o seu imóvel?</h2>
            <p style={{ fontSize: '1.3rem', opacity: 0.9, marginBottom: '3.5rem', maxWidth: '750px', margin: '0 auto 3.5rem', lineHeight: 1.6 }}>
              Junte-se à maior e mais segura comunidade imobiliária de Tete. Publicação simples, rápida e com resultados reais.
            </p>
            <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/signup" className="btn btn-primary" style={{ background: 'var(--pk-brand-secondary)', padding: '1.5rem 4rem', fontSize: '1.2rem', borderRadius: 'var(--pk-radius-lg)', fontWeight: 700 }}>
                Anunciar Agora
              </Link>
              <Link href="/contact" className="btn" style={{ border: '2px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.05)', color: 'white', padding: '1.5rem 4rem', fontSize: '1.2rem', borderRadius: 'var(--pk-radius-lg)', fontWeight: 600 }}>
                Falar Connosco
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
