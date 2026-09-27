'use client'

import { useState } from 'react'
import { useFormStatus } from 'react-dom'
import { createClient } from '@/utils/supabase/client'
import Link from 'next/link'

function SubmitButton({ isEdit }: { isEdit: boolean }) {
    const { pending } = useFormStatus()
    return (
        <button type="submit" className="btn btn-primary" disabled={pending} style={{ width: '100%' }}>
            {pending ? (isEdit ? 'Atualizando...' : 'Publicando...') : (isEdit ? 'Guardar Alterações' : 'Publicar Anúncio')}
        </button>
    )
}

interface PropertyFormProps {
    initialData?: any
    onSubmit: (formData: FormData) => void
    isAdmin?: boolean
    error?: string | null
}

export default function PropertyForm({ initialData, onSubmit, isAdmin, error }: PropertyFormProps) {
    const isEdit = !!initialData
    const [uploading, setUploading] = useState(false)
    const [imageUrls, setImageUrls] = useState<string[]>(initialData?.property_images?.map((img: any) => img.image_url) || [])
    const [uploadError, setUploadError] = useState<string | null>(null)

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (!files || files.length === 0) return

        if (imageUrls.length + files.length > 8) {
            setUploadError('Máximo de 8 fotos permitidas.')
            return
        }

        setUploading(true)
        setUploadError(null)

        const newUrls: string[] = []

        try {
            for (let i = 0; i < files.length; i++) {
                const file = files[i]
                const formData = new FormData()
                formData.append('file', file)
                formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!)

                const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
                const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
                    method: 'POST',
                    body: formData
                })

                if (!res.ok) {
                    const errorData = await res.json()
                    throw new Error(errorData.error?.message || 'Falha no upload da imagem')
                }

                const data = await res.json()
                // Inject watermark transformation into the URL
                const watermarkedUrl = data.secure_url.replace('/upload/', '/upload/l_text:Arial_40_bold:Casa%20Facil%20MZ,co_white,g_south_east,x_20,y_20/')
                newUrls.push(watermarkedUrl)
            }
            setImageUrls(prev => [...prev, ...newUrls])
        } catch (err: any) {
            console.error(err)
            setUploadError(err.message || 'Erro ao fazer upload das imagens. Tente novamente.')
        } finally {
            setUploading(false)
        }
    }

    const removeImage = (index: number) => {
        setImageUrls(prev => prev.filter((_, i) => i !== index))
    }

    return (
        <form action={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', background: 'white', padding: '2rem', borderRadius: 'var(--pk-radius-md)', boxShadow: 'var(--pk-shadow-md)' }}>

            {/* Admin Fields */}
            {isAdmin && (
                <div style={{ background: '#F0F9FF', padding: '1rem', borderRadius: 'var(--pk-radius-sm)', border: '1px solid #BAE6FD', marginBottom: '0.5rem' }}>
                    <h3 style={{ fontSize: '1rem', color: '#0369A1', marginBottom: '0.75rem' }}>Admin: Proprietário Externo</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label htmlFor="externalOwnerName" style={{ fontWeight: 500, fontSize: '0.9rem' }}>Nome (Obrigatório)</label>
                            <input id="externalOwnerName" name="externalOwnerName" type="text" required defaultValue={initialData?.external_owner_name || ''} placeholder="Ex: João da Silva"
                                style={{ padding: '0.6rem', borderRadius: 'var(--pk-radius-sm)', border: '1px solid var(--pk-surface-200)' }} />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label htmlFor="externalOwnerPhone" style={{ fontWeight: 500, fontSize: '0.9rem' }}>Telefone do Dono (Obrigatório)</label>
                            <input id="externalOwnerPhone" name="externalOwnerPhone" type="text" required defaultValue={initialData?.external_owner_phone || ''} placeholder="Ex: +258 84..."
                                style={{ padding: '0.6rem', borderRadius: 'var(--pk-radius-sm)', border: '1px solid var(--pk-surface-200)' }} />
                        </div>
                    </div>
                </div>
            )}

            {/* Title */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label htmlFor="title" style={{ fontWeight: 500 }}>Título do Anúncio</label>
                <input id="title" name="title" type="text" required defaultValue={initialData?.title || ''} placeholder="Ex: Casa T3 no Bairro Matundo"
                    style={{ padding: '0.75rem', borderRadius: 'var(--pk-radius-sm)', border: '1px solid var(--pk-surface-200)' }} />
            </div>

            {/* Type & District */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label htmlFor="type" style={{ fontWeight: 500 }}>Tipo de Negócio</label>
                    <select id="type" name="type" required defaultValue={initialData?.type || 'sale'} style={{ padding: '0.75rem', borderRadius: 'var(--pk-radius-sm)', border: '1px solid var(--pk-surface-200)', background: 'white' }}>
                        <option value="sale">Venda de Casa</option>
                        <option value="rent">Aluguel de Casa</option>
                        <option value="land">Venda de Terreno</option>
                        <option value="house_land">Terreno com Casa (Ambos)</option>
                    </select>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label htmlFor="locationDistrict" style={{ fontWeight: 500 }}>Bairro</label>
                    <input id="locationDistrict" name="locationDistrict" type="text" required defaultValue={initialData?.location_district || ''} placeholder="Ex: Matundo"
                        style={{ padding: '0.75rem', borderRadius: 'var(--pk-radius-sm)', border: '1px solid var(--pk-surface-200)' }} />
                </div>
            </div>

            {/* Price & Status */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label htmlFor="price" style={{ fontWeight: 500 }}>Preço (MZN)</label>
                    <input id="price" name="price" type="number" required defaultValue={initialData?.price || ''} placeholder="Ex: 5000000" min="0" step="1"
                        style={{ padding: '0.75rem', borderRadius: 'var(--pk-radius-sm)', border: '1px solid var(--pk-surface-200)' }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label htmlFor="status" style={{ fontWeight: 500 }}>Status</label>
                    <select id="status" name="status" defaultValue={initialData?.status || 'available'} style={{ padding: '0.75rem', borderRadius: 'var(--pk-radius-sm)', border: '1px solid var(--pk-surface-200)', background: 'white' }}>
                        <option value="available">Disponível</option>
                        <option value="sold">Vendido / Alugado</option>
                        <option value="draft">Rascunho (Oculto)</option>
                    </select>
                </div>
            </div>

            {/* Description */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <label htmlFor="description" style={{ fontWeight: 500 }}>Descrição Detalhada</label>
                    <span style={{ fontSize: '0.75rem', color: 'var(--pk-danger)', fontWeight: 700 }}>⚠️ PROIBIDO NÚMEROS DE TELEFONE</span>
                </div>
                <textarea id="description" name="description" rows={5} required defaultValue={initialData?.description || ''} placeholder="Descreva os detalhes do imóvel... (Não coloque contactos aqui ou o anúncio será removido)"
                    style={{ padding: '0.75rem', borderRadius: 'var(--pk-radius-sm)', border: '1px solid var(--pk-surface-200)', fontFamily: 'inherit' }} />
                <p style={{ fontSize: '0.75rem', color: 'var(--pk-text-tertiary)', marginTop: '-0.25rem' }}>
                    Anúncios com números de telefone na descrição serão <strong>removidos</strong> e a conta <strong>banida</strong>.
                </p>
            </div>

            {/* Images */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontWeight: 500 }}>Fotos do Imóvel (Máx 8)</label>
                <div 
                    onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
                    onDrop={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        if (!uploading && imageUrls.length < 8) {
                            handleFileChange({ target: { files: e.dataTransfer.files } } as any);
                        }
                    }}
                    style={{ 
                        padding: '2rem 1rem', 
                        border: '2px dashed var(--pk-surface-200)', 
                        borderRadius: 'var(--pk-radius-md)', 
                        textAlign: 'center',
                        background: 'var(--pk-surface-50)',
                        transition: 'all 0.2s ease',
                        cursor: 'pointer'
                    }}
                    onClick={() => document.getElementById('file-upload')?.click()}
                >
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleFileChange}
                        disabled={uploading || imageUrls.length >= 8}
                        style={{ display: 'none' }}
                        id="file-upload"
                    />
                    <div style={{ pointerEvents: 'none' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--pk-brand-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ margin: '0 auto 10px auto' }}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                        <p style={{ color: 'var(--pk-brand-primary)', fontWeight: 600, margin: '0 0 4px 0' }}>
                            {uploading ? 'Enviando fotos...' : 'Clique ou arraste fotos para aqui'}
                        </p>
                        <p style={{ color: 'var(--pk-text-tertiary)', fontSize: '0.8rem', margin: 0 }}>PNG, JPG até 5MB</p>
                    </div>
                </div>

                {/* Image Previews */}
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
                    {imageUrls.map((url, idx) => (
                        <div key={idx} style={{ width: '80px', height: '80px', position: 'relative', borderRadius: 'var(--pk-radius-sm)', overflow: 'hidden' }}>
                            <img src={url} alt={`Preview ${idx}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            <input type="hidden" name="imageUrls" value={url} />
                            <button
                                type="button"
                                onClick={() => removeImage(idx)}
                                style={{
                                    position: 'absolute',
                                    top: '2px',
                                    right: '2px',
                                    background: 'rgba(239, 68, 68, 0.8)',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '50%',
                                    width: '20px',
                                    height: '20px',
                                    fontSize: '12px',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                ×
                            </button>
                        </div>
                    ))}
                </div>
                {uploadError && <p style={{ color: 'var(--pk-danger)', fontSize: '0.8rem' }}>{uploadError}</p>}
            </div>

            {error && (
                <div style={{ padding: '1rem', background: '#FEF2F2', color: 'var(--pk-danger)', borderRadius: 'var(--pk-radius-sm)', fontSize: '0.9rem' }}>
                    {error}
                </div>
            )}

            <SubmitButton isEdit={isEdit} />
        </form>
    )
}
