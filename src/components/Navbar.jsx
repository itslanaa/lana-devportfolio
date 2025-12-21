
import React, { useState, useEffect } from 'react'
import { Link } from 'react-scroll'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '../lib/supabaseClient'
import { FaBars, FaTimes } from 'react-icons/fa'

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)

    // Default links
    const [navLinks, setNavLinks] = useState([
        { name: 'Home', to: 'home' },
        { name: 'About', to: 'about' },
        { name: 'Services', to: 'services' },
        { name: 'Projects', to: 'projects' },
        { name: 'Contact', to: 'contact' },
    ])

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) setScrolled(true)
            else setScrolled(false)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // Fetch dynamic links
    useEffect(() => {
        const fetchLinks = async () => {
            try {
                const { data, error } = await supabase.from('navigation').select('*').order('order', { ascending: true })
                if (data && data.length > 0) setNavLinks(data)
            } catch (err) {
                console.error(err)
            }
        }
        fetchLinks()
    }, [])

    const toggleMenu = () => setMenuOpen(!menuOpen)

    return (
        <nav className={`fixed w-full z-50`}
            style={{
                position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 1000,
                transition: 'all 0.3s ease',
                backgroundColor: scrolled ? 'rgba(10, 14, 23, 0.95)' : 'transparent',
                padding: scrolled ? '15px 0' : '25px 0',
                borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : 'none',
                backdropFilter: scrolled ? 'blur(10px)' : 'none'
            }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="logo clickable"
                    onClick={() => window.scrollTo(0, 0)}
                    style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)', cursor: 'pointer' }}
                >
                    <span className="text-gradient">LANA</span>DEVPORTFOLIO
                </motion.div>

                {/* Desktop Menu */}
                <div className="desktop-menu" style={{ display: 'flex', gap: '30px' }}>
                    {navLinks.map((link, index) => (
                        <motion.div
                            key={link.id || link.name}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Link
                                activeClass="active"
                                to={link.url ? link.url.replace('#', '') : link.to}
                                spy={true}
                                smooth={true}
                                offset={-70}
                                duration={500}
                                style={{
                                    color: 'var(--text-secondary)',
                                    fontWeight: 500,
                                    fontSize: '0.95rem',
                                    transition: 'color 0.3s',
                                    cursor: 'pointer'
                                }}
                                className="nav-item"
                                onMouseEnter={(e) => e.target.style.color = 'var(--accent-primary)'}
                                onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}
                            >
                                {link.name}
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* Mobile Toggle */}
                <div className="mobile-toggle clickable" onClick={toggleMenu} style={{ color: 'white', fontSize: '1.5rem', cursor: 'pointer' }}>
                    {menuOpen ? <FaTimes /> : <FaBars />}
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        style={{
                            background: 'rgba(10, 14, 23, 0.98)',
                            borderBottom: '1px solid rgba(255,255,255,0.1)',
                            overflow: 'hidden'
                        }}
                    >
                        <ul style={{ display: 'flex', flexDirection: 'column', padding: '20px', gap: '20px', alignItems: 'center', listStyle: 'none' }}>
                            {navLinks.map((link) => (
                                <li key={link.id || link.name}>
                                    <Link
                                        to={link.url ? link.url.replace('#', '') : link.to}
                                        smooth={true}
                                        offset={-70}
                                        duration={500}
                                        onClick={() => setMenuOpen(false)}
                                        style={{ color: 'white', fontSize: '1.1rem', fontWeight: 500, cursor: 'pointer' }}
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>

            <style>{`
                @media (max-width: 768px) {
                    .desktop-menu { display: none !important; }
                    .mobile-toggle { display: block !important; }
                }
                @media (min-width: 769px) {
                    .mobile-toggle { display: none !important; }
                }
            `}</style>
        </nav>
    )
}

export default Navbar
