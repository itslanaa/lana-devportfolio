
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaLinkedin, FaGithub, FaDribbble, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa'
import { supabase } from '../lib/supabaseClient'

const Contact = () => {
    // Form and Info State
    const [formData, setFormData] = useState({ name: '', email: '', message: '' })
    const [contactInfo, setContactInfo] = useState({
        email: 'support@km-dev.or.id',
        phone: '+62 812 1814 5937',
        address: 'Bogor, Indonesia',
        linkedin_url: '#',
        github_url: '#',
        dribbble_url: '#'
    })
    const [isSubmitting, setIsSubmitting] = useState(false)

    // Fetch Contact Info
    useEffect(() => {
        const fetchContactInfo = async () => {
            try {
                const { data, error } = await supabase.from('contact_info').select('*').limit(1).single()
                if (error && error.code !== 'PGRST116') console.error('Error fetching contact info:', error)
                if (data) setContactInfo(data)
            } catch (err) {
                console.error(err)
            }
        }
        fetchContactInfo()
    }, [])

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)
        try {
            const { error } = await supabase.from('contacts').insert([formData])
            if (error) {
                console.error(error)
                alert('Failed to send message.')
            } else {
                setFormData({ name: '', email: '', message: '' })
                alert('Message sent successfully!')
            }
        } catch (err) {
            console.error(err)
            alert('Message received! (Demo Mode)')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <footer className="section" style={{ background: 'var(--bg-primary)', position: 'relative', overflow: 'hidden' }}>
            <div style={{
                position: 'absolute',
                bottom: '-20%',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '80%',
                height: '400px',
                background: 'radial-gradient(ellipse at center, rgba(124, 58, 237, 0.15) 0%, rgba(10, 14, 23, 0) 70%)',
                zIndex: 0,
                pointerEvents: 'none'
            }}></div>

            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="contact-grid"
                    style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '60px', marginBottom: '80px' }}
                >
                    <div className="contact-info">
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>Let's <span className="text-gradient">Talk</span></h2>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '40px', maxWidth: '400px' }}>
                            Have a project in mind or want to collaborate? Feel free to contact me.
                            I am always open to discussing new projects, creative ideas or opportunities to be part of your visions.
                        </p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '40px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                <div style={{ padding: '12px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', color: 'var(--accent-primary)' }}><FaEnvelope /></div>
                                <div>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Email</p>
                                    <a href={`mailto:${contactInfo.email}`} style={{ fontSize: '1.1rem', fontWeight: 500 }}>{contactInfo.email}</a>
                                </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                <div style={{ padding: '12px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', color: 'var(--accent-primary)' }}><FaPhone /></div>
                                <div>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Phone</p>
                                    <p style={{ fontSize: '1.1rem', fontWeight: 500 }}>{contactInfo.phone}</p>
                                </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                <div style={{ padding: '12px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', color: 'var(--accent-primary)' }}><FaMapMarkerAlt /></div>
                                <div>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Location</p>
                                    <p style={{ fontSize: '1.1rem', fontWeight: 500 }}>{contactInfo.address}</p>
                                </div>
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '15px' }}>
                            {contactInfo.linkedin_url && <a href={contactInfo.linkedin_url} target="_blank" rel="noopener noreferrer" className="social-icon clickable" style={{ padding: '12px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '50%', color: 'white', transition: 'all 0.3s' }}><FaLinkedin /></a>}
                            {contactInfo.github_url && <a href={contactInfo.github_url} target="_blank" rel="noopener noreferrer" className="social-icon clickable" style={{ padding: '12px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '50%', color: 'white', transition: 'all 0.3s' }}><FaGithub /></a>}
                            {contactInfo.dribbble_url && <a href={contactInfo.dribbble_url} target="_blank" rel="noopener noreferrer" className="social-icon clickable" style={{ padding: '12px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '50%', color: 'white', transition: 'all 0.3s' }}><FaDribbble /></a>}
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} style={{ background: 'var(--bg-secondary)', padding: '40px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)' }}>
                        {/* Inputs ... (Same as before) */}
                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', marginBottom: '10px', color: 'var(--text-secondary)' }}>Your Name</label>
                            <input type="text" name="name" value={formData.name} onChange={handleChange} className="form-input clickable" placeholder="Kaka Maulana" required style={{ width: '100%', padding: '15px', background: 'var(--bg-primary)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: 'white', fontSize: '1rem' }} />
                        </div>
                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', marginBottom: '10px', color: 'var(--text-secondary)' }}>Your Email</label>
                            <input type="email" name="email" value={formData.email} onChange={handleChange} className="form-input clickable" placeholder="kaka@km-dev.or.id" required style={{ width: '100%', padding: '15px', background: 'var(--bg-primary)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: 'white', fontSize: '1rem' }} />
                        </div>
                        <div style={{ marginBottom: '30px' }}>
                            <label style={{ display: 'block', marginBottom: '10px', color: 'var(--text-secondary)' }}>Message</label>
                            <textarea name="message" value={formData.message} onChange={handleChange} className="form-input clickable" placeholder="Tell me about your project..." rows="4" required style={{ width: '100%', padding: '15px', background: 'var(--bg-primary)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: 'white', fontSize: '1rem', resize: 'none' }} />
                        </div>
                        <button type="submit" disabled={isSubmitting} className="btn-primary clickable" style={{ width: '100%', opacity: isSubmitting ? 0.7 : 1 }}>
                            {isSubmitting ? 'Sending...' : 'Send Message'}
                        </button>
                    </form>
                </motion.div>
            </div>

            <div style={{
                textAlign: 'center',
                padding: '20px 0',
                borderTop: '1px solid rgba(255,255,255,0.05)',
                color: 'var(--text-secondary)',
                fontSize: '0.9rem',
                marginTop: '40px',
                position: 'relative',
                zIndex: 1
            }}>
                <p>
                    &copy; 2025 - Made with <span style={{ color: '#ef4444' }}>&hearts;</span> by <strong>Kaka Maulana Abdillah</strong>.
                    Powered by <a href="https://km-dev.or.id" target="_blank" rel="noopener noreferrer" style={{ fontWeight: 'bold', color: 'var(--accent-secondary)' }}>KM Developer</a>.
                </p>
            </div>
        </footer>
    )
}


// Styles moved to global CSS
export default Contact
