
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '../lib/supabaseClient'

const About = () => {
    const [content, setContent] = useState({
        bio: "I am a passionate software developer with a strong focus on building scalable web and mobile applications. With a background in both frontend aesthetics and backend logic, I create seamless digital experiences. My approach blends technical expertise with creative problem-solving.",
        years_experience: "5+",
        projects_completed: "50+",
        image_url: null,
        cv_url: null
    })

    useEffect(() => {
        const fetchAbout = async () => {
            try {
                const { data, error } = await supabase.from('about_content').select('*').eq('active', true).limit(1).single()
                if (error && error.code !== 'PGRST116') console.error('Error fetching about:', error)
                if (data) setContent(data)
            } catch (err) {
                console.error(err)
            }
        }
        fetchAbout()
    }, [])

    return (
        <section className="section" style={{ background: 'var(--bg-secondary)' }}>
            <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '50px', alignItems: 'center' }}>

                {/* Left - Image */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    style={{ position: 'relative' }}
                >
                    <div style={{
                        position: 'absolute',
                        top: '-20px',
                        left: '-20px',
                        width: '100%',
                        height: '100%',
                        border: '2px solid var(--accent-primary)',
                        zIndex: 0,
                        borderRadius: '10px'
                    }}></div>
                    <div style={{
                        width: '100%',
                        height: '400px',
                        background: '#1e293b',
                        borderRadius: '10px',
                        zIndex: 1,
                        position: 'relative',
                        overflow: 'hidden',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#64748b'
                    }}>
                        {content.image_url ? (
                            <img src={content.image_url} alt="About Me" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                            <span>[Minimalist Desk Photo Placeholder]</span>
                        )}
                    </div>
                </motion.div>

                {/* Right - Content */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>About <span className="text-gradient">Me</span></h2>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '20px', fontSize: '1.05rem' }}>
                        {content.bio}
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '30px' }}>
                        <div>
                            <h4 style={{ color: 'var(--accent-secondary)', fontSize: '2rem', marginBottom: '5px' }}>{content.years_experience}</h4>
                            <p style={{ color: 'var(--text-secondary)' }}>Years Experience</p>
                        </div>
                        <div>
                            <h4 style={{ color: 'var(--accent-secondary)', fontSize: '2rem', marginBottom: '5px' }}>{content.projects_completed}</h4>
                            <p style={{ color: 'var(--text-secondary)' }}>Projects Completed</p>
                        </div>
                    </div>
                    {content.cv_url && (
                        <a href={content.cv_url} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ display: 'inline-block', textDecoration: 'none' }}>
                            Download CV
                        </a>
                    )}
                </motion.div>

            </div>
            <style>{`
         @media (max-width: 900px) {
           .container { grid-template-columns: 1fr !important; }
         }
       `}</style>
        </section>
    )
}

export default About
