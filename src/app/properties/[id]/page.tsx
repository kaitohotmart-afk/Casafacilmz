import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Navbar from '@/components/Navbar'
import PropertyImageGallery from '@/components/PropertyImageGallery'
import ContactButtons from '@/components/ContactButtons'
import { formatCurrency } from '@/utils/format'

export const revalidate = 60

export default async function PropertyDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const supabase = await createClient()

    const { data: property, error } = await supabase
        .from('properties')
        .select(`
            *,
            property_images(id, image_url)
        `)
        .eq('id', id)
        .single()

    if (error) {
        console.error('Erro ao buscar imóvel:', error)
        notFound()
    }

    if (!property) {
        notFound()
    }

    // Define WhatsApp message and links
    const whatsappNumber = '877771719'
    const callNumber = '+258 86 744 3081'
    const whatsappText = `Olá, vim pelo site Casa Fácil MZ e tenho interesse no imóvel: ${property.title} (${property.location_district})`
    const whatsappLink = `https://wa.me/258${whatsappNumber}?text=${encodeURIComponent(whatsappText)}`

    return (
        <div style={{ paddingBottom: '5.2rem' }}>
            <Navbar />

            <main className="container" style={{ maxWidth: '1100px', marginTop: '3rem' }}>
                <Link href="/" style={{
                    color: 'var(--pk-text-secondary)',
                    fontSize: '0.95rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    marginBottom: '2rem',
                    fontWeight: 500
                }}>
                    ← Voltar para lista de imóveis
                </Link>

                {/* Header Section */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1.5rem' }}>
                    <div>
                        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.75rem', fontWeight: 800 }}>{property.title}</h1>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                            <span style={{ fontSize: '1.1rem', color: 'var(--pk-text-secondary)' }}>📍 {property.location_district}</span>
                            <span style={{
                                background: 'var(--pk-surface-100)',
                                padding: '0.35rem 0.875rem',
                                borderRadius: '99px',
                                fontSize: '0.85rem',
                                fontWeight: 600,
                                color: 'var(--pk-text-secondary)'
                            }}>
                                {property.type === 'sale' ? 'Venda de Casa' :
                                    property.type === 'rent' ? 'Aluguel' :
                                        property.type === 'land' ? 'Terreno' :
                                            'Terreno com Casa'}
                            </span>
                            {property.status !== 'available' && (
                                <span style={{
                                    background: 'var(--pk-danger)',
                                    color: 'white',
                                    padding: '0.35rem 1rem',
                                    borderRadius: 'var(--pk-radius-sm)',
                                    fontSize: '0.9rem',
                                    fontWeight: 800,
                                    textTransform: 'uppercase',
                                    boxShadow: '0 4px 10px rgba(220, 38, 38, 0.3)'
                                }}>
                                    {property.status === 'sold' ? 'Vendido / Indisponível' : property.status}
                                </span>
                            )}
                        </div>
                    </div>
                    <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--pk-brand-secondary)' }}>
                        {formatCurrency(property.price)}
                    </div>
                </div>

                {/* Professional Gallery */}
                <div style={{ marginBottom: '4rem' }}>
                    <PropertyImageGallery
                        images={property.property_images || []}
                        title={property.title}
                    />
                </div>

                <div className="property-detail-grid">
                    {/* Details Column */}
                    <div className="details-col">
                        <section style={{ marginBottom: '3rem' }}>
                            <h2 style={{ fontSize: '1.6rem', marginBottom: '1.5rem', borderBottom: '2px solid var(--pk-surface-100)', paddingBottom: '0.75rem' }}>
                                Descrição do Imóvel
                            </h2>
                            <div style={{ whiteSpace: 'pre-line', color: 'var(--pk-text-secondary)', lineHeight: 1.8, fontSize: '1.1rem' }}>
                                {property.description}
                            </div>
                        </section>
                    </div>

                    {/* Sidebar / Contact Column */}
                    <div className="contact-col">
                        <div style={{
                            background: 'var(--pk-brand-primary)',
                            color: 'white',
                            padding: '2.5rem',
                            borderRadius: 'var(--pk-radius-lg)',
                            boxShadow: 'var(--pk-shadow-xl)',
                            position: 'sticky',
                            top: '6rem'
                        }}>
                            <h3 style={{ fontSize: '1.4rem', color: 'white', marginBottom: '1.5rem' }}>Contactar Agora</h3>

                            <ContactButtons
                                propertyId={property.id}
                                ownerId={property.owner_id}
                                whatsappLink={whatsappLink}
                                whatsappNumber={whatsappNumber}
                                callNumber={callNumber}
                            />

                            <div style={{
                                marginTop: '2rem',
                                padding: '1.5rem',
                                background: 'rgba(255,255,255,0.05)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: 'var(--pk-radius-md)',
                                fontSize: '0.9rem'
                            }}>
                                <p style={{ fontWeight: 700, marginBottom: '0.75rem', color: 'var(--pk-brand-secondary)' }}>Termos e Taxas:</p>
                                <ul style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', color: 'rgba(255,255,255,0.8)' }}>
                                    <li>Visita: <strong>300 MZN</strong> (taxa para transporte e evitar curiosos)</li>
                                    <li>Segurança: <strong>Trabalhamos directos com donos</strong></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
