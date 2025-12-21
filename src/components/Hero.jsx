
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-scroll'
import { supabase } from '../lib/supabaseClient'

const Hero = () => {
    const [content, setContent] = useState({
        greeting: "Hello, I'm",
        name: "John Doe",
        title: "Software Developer",
        description: "I build accessible, pixel-perfect, and performant web experiences. Passionate about creating digital solutions that help businesses grow."
    })

    // Typewriter effect state
    const [displayedName, setDisplayedName] = useState('')

    // Infinite Looping Typing Effect
    useEffect(() => {
        if (!content.name) return

        let i = 0
        let isDeleting = false
        let typingTimeout

        const type = () => {
            const fullText = content.name

            if (!isDeleting && i <= fullText.length) {
                // Typing
                setDisplayedName(fullText.substring(0, i))
                i++
                if (i > fullText.length) {
                    isDeleting = true
                    setTimeout(type, 2000) // Pause at end
                    return
                }
                typingTimeout = setTimeout(type, 150)
            } else if (isDeleting && i >= 0) {
                // Deleting
                setDisplayedName(fullText.substring(0, i))
                i--
                if (i < 0) {
                    isDeleting = false
                    i = 0
                    setTimeout(type, 500) // Pause before restarting
                    return
                }
                typingTimeout = setTimeout(type, 100)
            }
        }

        type()

        return () => clearTimeout(typingTimeout)
    }, [content.name])

    useEffect(() => {
        const fetchHero = async () => {
            try {
                const { data, error } = await supabase.from('hero_content').select('*').eq('active', true).limit(1).single()
                if (error && error.code !== 'PGRST116') console.error('Error fetching hero:', error)
                if (data) setContent(data)
            } catch (err) {
                console.error(err)
            }
        }
        fetchHero()
    }, [])

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    }

    return (
        <section className="hero-section" style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            position: 'relative',
            overflow: 'hidden',
            paddingTop: '80px'
        }}>
            {/* Background Decorative Elements */}
            <div style={{
                position: 'absolute',
                top: '-10%',
                right: '-10%',
                width: '600px',
                height: '600px',
                background: 'radial-gradient(circle, rgba(124,58,237,0.15) 0%, rgba(10,14,23,0) 70%)',
                borderRadius: '50%',
                zIndex: -1
            }}></div>
            <div style={{
                position: 'absolute',
                bottom: '10%',
                left: '-5%',
                width: '400px',
                height: '400px',
                background: 'radial-gradient(circle, rgba(6,182,212,0.1) 0%, rgba(10,14,23,0) 70%)',
                borderRadius: '50%',
                zIndex: -1
            }}></div>

            <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '50px', alignItems: 'center', width: '100%' }}>

                {/* Left Content */}
                <motion.div
                    className="hero-content"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.h3 variants={itemVariants} style={{
                        color: 'var(--accent-secondary)',
                        fontSize: '1.2rem',
                        fontWeight: 600,
                        letterSpacing: '2px',
                        marginBottom: '15px',
                        textTransform: 'uppercase'
                    }}>
                        {content.title}
                    </motion.h3>

                    <motion.h1 variants={itemVariants} style={{
                        fontSize: '4rem',
                        marginBottom: '20px',
                        lineHeight: 1.1
                    }}>
                        {content.greeting} <br />
                        <span className="text-gradient">{displayedName}</span>
                        <motion.span
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ repeat: Infinity, duration: 0.8 }}
                            style={{ display: 'inline-block', width: '4px', height: '1em', background: 'var(--accent-primary)', marginLeft: '5px', verticalAlign: 'middle' }}
                        />
                    </motion.h1>

                    <motion.p variants={itemVariants} style={{
                        fontSize: '1.1rem',
                        color: 'var(--text-secondary)',
                        marginBottom: '40px',
                        maxWidth: '500px',
                        lineHeight: 1.6
                    }}>
                        {content.description}
                    </motion.p>

                    <motion.div variants={itemVariants} style={{ display: 'flex', gap: '20px' }}>
                        <button className="btn-primary clickable" onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}>
                            Hire Me
                        </button>
                        <button className="btn-outline clickable" onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}>
                            View Portfolio
                        </button>
                    </motion.div>
                </motion.div>

                {/* Right Content - Illustration */}
                <motion.div
                    className="hero-image"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}
                >
                    <div style={{
                        position: 'relative',
                        width: '100%',
                        height: '500px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <div style={{
                            width: '400px',
                            height: '300px',
                            background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
                            borderRadius: '20px',
                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                            position: 'relative',
                            border: '1px solid rgba(255,255,255,0.1)',
                            overflow: 'hidden'
                        }}>
                            <div style={{ height: '30px', background: '#334155', display: 'flex', alignItems: 'center', padding: '0 15px', gap: '8px' }}>
                                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444' }}></div>
                                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f59e0b' }}></div>
                                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#22c55e' }}></div>
                            </div>
                            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                <div style={{ width: '60%', height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px' }}></div>
                                <div style={{ width: '40%', height: '8px', background: 'rgba(124, 58, 237, 0.4)', borderRadius: '4px', marginLeft: '20px' }}></div>
                                <div style={{ width: '70%', height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', marginLeft: '20px' }}></div>
                                <div style={{ width: '50%', height: '8px', background: 'rgba(6, 182, 212, 0.4)', borderRadius: '4px', marginLeft: '20px' }}></div>
                                <div style={{ width: '30%', height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px' }}></div>
                            </div>
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                style={{
                                    position: 'absolute',
                                    top: '50px',
                                    right: '-20px',
                                    background: 'rgba(124, 58, 237, 0.2)',
                                    backdropFilter: 'blur(5px)',
                                    padding: '10px 20px',
                                    borderRadius: '10px',
                                    border: '1px solid rgba(124, 58, 237, 0.4)',
                                    color: '#e2e8f0',
                                    fontWeight: 'bold',
                                    boxShadow: '0 10px 20px rgba(0,0,0,0.2)'
                                }}
                            >
                                &lt;React /&gt;
                            </motion.div>
                            <motion.div
                                animate={{ y: [0, 15, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                style={{
                                    position: 'absolute',
                                    bottom: '40px',
                                    left: '-30px',
                                    background: 'rgba(6, 182, 212, 0.2)',
                                    backdropFilter: 'blur(5px)',
                                    padding: '10px 20px',
                                    borderRadius: '10px',
                                    border: '1px solid rgba(6, 182, 212, 0.4)',
                                    color: '#e2e8f0',
                                    fontWeight: 'bold',
                                    boxShadow: '0 10px 20px rgba(0,0,0,0.2)'
                                }}
                            >
                                Supabase
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </div>
            <style>{`
         @media (max-width: 900px) {
           .container { grid-template-columns: 1fr !important; text-align: center; }
           .hero-content { margin-bottom: 50px; }
           .hero-content h1 { font-size: 3rem !important; }
           .hero-content p { margin: 0 auto 40px auto !important; }
           .hero-content > div { justify-content: center; }
         }
       `}</style>
        </section>
    )
}

export default Hero
