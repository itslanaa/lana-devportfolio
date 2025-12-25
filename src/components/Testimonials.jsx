
import React, { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'

const Testimonials = () => {
    const [companies, setCompanies] = useState([])
    const [testimonials, setTestimonials] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data, error } = await supabase.from('testimonials').select('*').order('created_at', { ascending: true })
                if (error) console.error('Error fetching data:', error)
                if (data && data.length > 0) {
                    setCompanies(data.filter(item => item.type === 'company'))
                    setTestimonials(data.filter(item => item.type === 'testimonial'))
                }
            } catch (err) {
                console.error(err)
            }
        }
        fetchData()
    }, [])

    return (
        <section className="section" style={{ padding: '80px 0', borderBottom: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden' }}>
            <div className="container">
                <h2 style={{ fontSize: '2.5rem', marginBottom: '50px', textAlign: 'center' }}>What Clients <span className="text-gradient">Say</span></h2>

                {/* Marquee Testimonials */}
                {testimonials.length > 0 && (
                    <div className="marquee-container" style={{ marginBottom: '80px', position: 'relative' }}>
                        <div className="marquee-track">
                            {[...testimonials, ...testimonials].map((item, i) => (
                                <div key={i} className="testimonial-card">
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
                                        <img
                                            src={item.image_url || 'https://via.placeholder.com/50'}
                                            alt={item.client_name}
                                            style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--accent-primary)' }}
                                        />
                                        <div>
                                            <h4 style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>{item.client_name}</h4>
                                            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 'bold' }}>{item.job_title}</p>
                                        </div>
                                    </div>
                                    <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', fontStyle: 'italic' }}>"{item.feedback}"</p>
                                    <div style={{ position: 'absolute', top: '20px', right: '20px', opacity: 0.1, fontSize: '3rem', color: 'var(--accent-primary)' }}>"</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Trusted Companies */}
                {companies.length > 0 && (
                    <div style={{ textAlign: 'center' }}>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '30px', letterSpacing: '2px', textTransform: 'uppercase', fontSize: '0.9rem' }}>Trusted by Industry Leaders</p>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            gap: '50px',
                            flexWrap: 'wrap',
                            alignItems: 'center'
                        }}>
                            {companies.map((client, i) => (
                                <div key={i} className="client-logo">
                                    <img src={client.logo_url} alt={client.client_name} style={{ height: '35px', objectFit: 'contain', filter: 'grayscale(100%)', opacity: 0.6, transition: 'all 0.3s' }} />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <style>{`
                .marquee-container {
                    width: 100%;
                    overflow: hidden;
                    mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
                }
                .marquee-track {
                    display: flex;
                    gap: 30px;
                    width: max-content;
                    animation: marquee 40s linear infinite; /* Adjusted speed for infinite variable length */
                }
                .marquee-track:hover {
                    animation-play-state: paused;
                }
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .testimonial-card {
                    width: 400px;
                    background: var(--bg-secondary);
                    padding: 30px;
                    border-radius: 15px;
                    border: 1px solid rgba(255,255,255,0.05);
                    position: relative;
                    flex-shrink: 0;
                }
                .client-logo img:hover {
                    filter: grayscale(0%) !important;
                    opacity: 1 !important;
                    transform: scale(1.1);
                }
                @media (max-width: 768px) {
                    .testimonial-card {
                        width: 300px;
                    }
                }
            `}</style>
        </section>
    )
}

export default Testimonials
