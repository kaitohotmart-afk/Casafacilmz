import { createClient } from '@/utils/supabase/server'
import Navbar from '@/components/Navbar'
import PropertyCard from '@/components/PropertyCard'

export default async function PropertiesPage({
    searchParams,
}: {
    searchParams: Promise<{ type?: string; district?: string }>
}) {
    const { type, district } = await searchParams
    const supabase = await createClient()

    let query = supabase
        .from('properties')
        .select('*, property_images(image_url)')
        .eq('status', 'available')
        .order('created_at', { ascending: false })

    if (type && type !== 'Tipo de Imóvel') {
        query = query.eq('type', type)
    }

    if (district) {
        query = query.ilike('location_district', `%${district}%`)
    }

    const { data: properties } = await query

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar />

            <main className="container" style={{ padding: '4rem 0' }}>
                <header style={{ marginBottom: '3rem' }}>
                    <h1 style={{ fontSize: '2.5rem', color: 'var(--pk-brand-primary)', marginBottom: '0.5rem' }}>
                        {type ? `Imóveis: ${type === 'sale' ? 'Venda de Casa' : type === 'rent' ? 'Aluguel' : type === 'land' ? 'Terrenos' : type === 'house_land' ? 'Terreno com Casa' : 'Todos'}` : 'Todos os Imóveis'}
                    </h1>
                    {district && (
                        <p style={{ color: 'var(--pk-text-secondary)', fontSize: '1.2rem' }}>
                            Resultados em: <strong>{district}</strong>
                        </p>
                    )}
                </header>

                {properties && properties.length > 0 ? (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2.5rem' }}>
                        {properties.map((property: any) => (
                            <PropertyCard key={property.id} property={property} />
                        ))}
                    </div>
                ) : (
                    <div style={{ textAlign: 'center', padding: '8rem 0', background: 'var(--pk-surface-50)', borderRadius: 'var(--pk-radius-xl)', border: '2px dashed var(--pk-surface-200)' }}>
                        <h2 style={{ color: 'var(--pk-text-secondary)', marginBottom: '1rem' }}>Nenhum imóvel encontrado</h2>
                        <p style={{ color: 'var(--pk-text-tertiary)' }}>Tente ajustar os seus filtros de pesquisa.</p>
                    </div>
                )}
            </main>
        </div>
    )
}
