
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaGithub, FaExternalLinkAlt, FaYoutube } from 'react-icons/fa'
import { supabase } from '../lib/supabaseClient'

const Projects = () => {
    const [filter, setFilter] = useState('All')
    const [visibleCount, setVisibleCount] = useState(6)
    const [projects, setProjects] = useState([
        { id: 1, title: 'E-Commerce Platform', category: 'Web', image_url: 'https://via.placeholder.com/600x400?text=E-Commerce', stack: ['React', 'Node.js', 'Supabase'], is_pinned: true },
        { id: 2, title: 'Fitness Tracker App', category: 'Mobile', image_url: 'https://via.placeholder.com/600x400?text=Mobile+App', stack: ['Flutter', 'Firebase'], is_pinned: false },
        { id: 3, title: 'Modern Portfolio Design', category: 'Design', image_url: 'https://via.placeholder.com/600x400?text=UI+Design', stack: ['Figma', 'Adobe XD'], is_pinned: false },
    ])

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const { data, error } = await supabase
                    .from('projects')
                    .select('*')
                    .order('is_pinned', { ascending: false })
                    .order('order', { ascending: true })
                if (error) console.error('Error fetching projects:', error)
                if (data && data.length > 0) {
                    setProjects(data)
                }
            } catch (err) {
                console.error(err)
            }
        }
        fetchProjects()
    }, [])

    const filteredProjects = filter === 'All'
        ? projects
        : projects.filter(p => p.category === filter)

    const displayedProjects = filteredProjects.slice(0, visibleCount)

    const handleLoadMore = () => {
        setVisibleCount(prev => prev + 6)
    }

    // Reset visible count when filter changes
    useEffect(() => {
        setVisibleCount(6)
    }, [filter])
    const categories = ['All', 'Web', 'Mobile', 'Design']

    return (
        <section className="section" style={{ background: 'var(--bg-secondary)' }}>
            <div className="container">
                <div className="section-header" style={{ textAlign: 'center', marginBottom: '50px' }}>
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>Featured <span className="text-gradient">Projects</span></h2>
                    <p style={{ color: 'var(--text-secondary)' }}>Check out some of my recent work</p>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '40px', flexWrap: 'wrap' }}>
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className="clickable"
                            style={{
                                padding: '8px 20px',
                                borderRadius: '20px',
                                border: 'none',
                                background: filter === cat ? 'var(--accent-primary)' : 'rgba(255,255,255,0.05)',
                                color: filter === cat ? 'white' : 'var(--text-secondary)',
                                transition: 'all 0.3s',
                                fontWeight: 500
                            }}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <motion.div layout style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '30px' }}>
                    <AnimatePresence mode='popLayout'>
                        {displayedProjects.map(project => (
                            <motion.div
                                layout
                                key={project.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                                className="clickable"
                                style={{
                                    background: 'var(--bg-primary)',
                                    borderRadius: '15px',
                                    overflow: 'hidden',
                                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                                    border: '1px solid rgba(255,255,255,0.05)'
                                }}
                            >
                                <div style={{ height: '200px', overflow: 'hidden', position: 'relative' }}>
                                    <img
                                        src={project.image_url}
                                        alt={project.title}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
                                        onMouseOver={e => e.currentTarget.style.transform = 'scale(1.1)'}
                                        onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                                    />
                                </div>
                                <div style={{ padding: '20px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                                        <span style={{ fontSize: '0.8rem', color: 'var(--accent-secondary)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 'bold' }}>{project.category}</span>
                                        <div style={{ display: 'flex', gap: '10px' }}>
                                            {project.youtube_url && (
                                                <a href={project.youtube_url} target="_blank" rel="noopener noreferrer">
                                                    <FaYoutube style={{ color: '#ff0000', fontSize: '1.2rem', cursor: 'pointer' }} />
                                                </a>
                                            )}
                                            {project.repo_url && (
                                                <a href={project.repo_url} target="_blank" rel="noopener noreferrer">
                                                    <FaGithub style={{ color: 'var(--text-secondary)', cursor: 'none' }} />
                                                </a>
                                            )}
                                            {project.demo_url && (
                                                <a href={project.demo_url} target="_blank" rel="noopener noreferrer">
                                                    <FaExternalLinkAlt style={{ color: 'var(--text-secondary)', cursor: 'none' }} />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                    <h3 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>{project.title}</h3>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                        {project.stack && project.stack.map(tech => (
                                            <span key={tech} style={{
                                                fontSize: '0.75rem',
                                                padding: '4px 10px',
                                                background: 'rgba(255,255,255,0.05)',
                                                borderRadius: '10px',
                                                color: 'var(--text-secondary)'
                                            }}>
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {filteredProjects.length > visibleCount && (
                    <div style={{ textAlign: 'center', marginTop: '40px' }}>
                        <button
                            onClick={handleLoadMore}
                            style={{
                                padding: '12px 30px',
                                background: 'var(--accent-primary)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '25px',
                                fontSize: '1rem',
                                cursor: 'pointer',
                                transition: 'transform 0.3s'
                            }}
                            onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
                            onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                        >
                            Load More
                        </button>
                    </div>
                )}
            </div>
        </section>
    )
}

export default Projects
