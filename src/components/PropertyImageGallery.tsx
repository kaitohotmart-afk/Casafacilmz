'use client'

import { useState } from 'react'

interface PropertyImageGalleryProps {
    images: { image_url: string; id: string }[]
    title: string
}

export default function PropertyImageGallery({ images, title }: PropertyImageGalleryProps) {
    const [activeIndex, setActiveIndex] = useState(0)

    if (!images || images.length === 0) {
        return (
            <div style={{
                height: '400px',
                background: 'var(--pk-surface-100)',
                borderRadius: 'var(--pk-radius-lg)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--pk-text-tertiary)'
            }}>
                Nenhuma imagem disponível
            </div>
        )
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {/* Main Image */}
            <div style={{
                position: 'relative',
                height: '500px',
                borderRadius: 'var(--pk-radius-xl)',
                overflow: 'hidden',
                boxShadow: 'var(--pk-shadow-lg)',
                background: 'var(--pk-surface-50)'
            }}>
                <img
                    src={images[activeIndex].image_url}
                    alt={`${title} - Visualização ${activeIndex + 1}`}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'opacity 0.3s ease'
                    }}
                />

                {/* Navigation Arrows (Optional but nice) */}
                {images.length > 1 && (
                    <>
                        <button
                            onClick={() => setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
                            style={{
                                position: 'absolute',
                                left: '1rem',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                background: 'rgba(255,255,255,0.8)',
                                border: 'none',
                                borderRadius: '50%',
                                width: '40px',
                                height: '40px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontWeight: 'bold',
                                boxShadow: 'var(--pk-shadow-sm)'
                            }}
                        >
                            ←
                        </button>
                        <button
                            onClick={() => setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
                            style={{
                                position: 'absolute',
                                right: '1rem',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                background: 'rgba(255,255,255,0.8)',
                                border: 'none',
                                borderRadius: '50%',
                                width: '40px',
                                height: '40px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontWeight: 'bold',
                                boxShadow: 'var(--pk-shadow-sm)'
                            }}
                        >
                            →
                        </button>
                    </>
                )}
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
                <div style={{
                    display: 'flex',
                    gap: '0.75rem',
                    overflowX: 'auto',
                    paddingBottom: '0.5rem',
                    scrollbarWidth: 'thin'
                }}>
                    {images.map((img, idx) => (
                        <button
                            key={img.id || img.image_url || idx}
                            onClick={() => setActiveIndex(idx)}
                            style={{
                                flex: '0 0 100px',
                                height: '70px',
                                padding: 0,
                                border: idx === activeIndex ? '2px solid var(--pk-brand-secondary)' : '2px solid transparent',
                                borderRadius: 'var(--pk-radius-md)',
                                overflow: 'hidden',
                                cursor: 'pointer',
                                background: 'none',
                                transition: 'all 0.2s ease',
                                opacity: idx === activeIndex ? 1 : 0.6
                            }}
                        >
                            <img
                                src={img.image_url}
                                alt={`Thumbnail ${idx + 1}`}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}
