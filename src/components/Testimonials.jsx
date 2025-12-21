
import React, { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'

const Testimonials = () => {
    const [clients, setClients] = useState([
        { id: 1, client_name: 'Google', logo_url: 'https://cdn.worldvectorlogo.com/logos/google-1-1.svg' },
        { id: 2, client_name: 'Spotify', logo_url: 'https://cdn.worldvectorlogo.com/logos/spotify-2.svg' },
        { id: 3, client_name: 'Airbnb', logo_url: 'https://cdn.worldvectorlogo.com/logos/airbnb.svg' },
        { id: 4, client_name: 'Uber', logo_url: 'https://cdn.worldvectorlogo.com/logos/uber-2.svg' },
    ])

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const { data, error } = await supabase.from('testimonials').select('*').order('created_at', { ascending: true })
                if (error) console.error('Error fetching clients:', error)
                if (data && data.length > 0) {
                    setClients(data)
                }
            } catch (err) {
                console.error(err)
            }
        }
        fetchClients()
    }, [])

    return (
        <section className="section" style={{ padding: '60px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
            <div className="container" style={{ textAlign: 'center' }}>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '30px', letterSpacing: '2px', textTransform: 'uppercase', fontSize: '0.9rem' }}>Trusted by over 30+ Companies</p>

                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '40px',
                    flexWrap: 'wrap',
                    opacity: 0.6,
                    alignItems: 'center'
                }}>
                    {clients.map((client, i) => (
                        <div key={i} style={{ filter: 'grayscale(100%)', transition: 'filter 0.3s' }} className="client-logo clickable">
                            <img src={client.logo_url} alt={client.client_name} style={{ height: '30px', objectFit: 'contain' }} />
                        </div>
                    ))}
                </div>
            </div>
            <style>{`
            .client-logo:hover {
                filter: grayscale(0%) !important;
                opacity: 1;
            }
        `}</style>
        </section>
    )
}

export default Testimonials
