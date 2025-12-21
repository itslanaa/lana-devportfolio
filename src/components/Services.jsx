
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaCode, FaMobileAlt, FaPaintBrush, FaServer, FaDatabase, FaCloud } from 'react-icons/fa'
import { supabase } from '../lib/supabaseClient'

// Icon mapping helper
const getIcon = (iconName) => {
    switch(iconName) {
        case 'FaCode': return <FaCode size={40} />;
        case 'FaMobileAlt': return <FaMobileAlt size={40} />;
        case 'FaPaintBrush': return <FaPaintBrush size={40} />;
        case 'FaServer': return <FaServer size={40} />;
        case 'FaDatabase': return <FaDatabase size={40} />;
        case 'FaCloud': return <FaCloud size={40} />;
        default: return <FaCode size={40} />;
    }
}

const Services = () => {
  const [services, setServices] = useState([
    {
      id: 1,
      title: 'Web Development',
      icon: 'FaCode',
      desc: 'Building responsive websites using HTML, CSS, JS, React, and PHP Laravel.',
      color: '#7c3aed'
    },
    {
      id: 2,
      title: 'Mobile Apps',
      icon: 'FaMobileAlt',
      desc: 'Developing cross-platform mobile applications with Flutter and React Native.',
      color: '#ec4899'
    },
    {
      id: 3,
      title: 'UI/UX Design',
      icon: 'FaPaintBrush',
      desc: 'Designing intuitive and aesthetic user interfaces for web and mobile.',
      color: '#06b6d4'
    }
  ])

  useEffect(() => {
    const fetchServices = async () => {
        try {
            const { data, error } = await supabase.from('services').select('*').order('order', { ascending: true })
            if (error) console.error('Error fetching services:', error)
            if (data && data.length > 0) {
                 setServices(data)
            }
        } catch (err) {
            console.error(err)
        }
    }
    fetchServices()
  }, [])

  return (
    <section className="section">
      <div className="container">
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-header" 
            style={{ textAlign: 'center', marginBottom: '60px' }}
        >
            <h2 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>Specialized <span className="text-gradient">In</span></h2>
            <p style={{ color: 'var(--text-secondary)' }}>My expertise and services</p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            {services.map((service, index) => (
                <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 }}
                    className="service-card clickable"
                    whileHover={{ y: -10 }}
                    style={{
                        background: 'var(--bg-secondary)',
                        padding: '40px',
                        borderRadius: '20px',
                        textAlign: 'center',
                        border: '1px solid rgba(255,255,255,0.05)',
                        transition: 'border-color 0.3s'
                    }}
                >
                    <div style={{ 
                        width: '80px', 
                        height: '80px', 
                        background: `rgba(255,255,255,0.03)`, 
                        borderRadius: '50%', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        margin: '0 auto 25px auto',
                        color: service.color || 'var(--accent-primary)'
                    }}>
                        {typeof service.icon === 'string' ? getIcon(service.icon) : service.icon}
                    </div>
                    <h3 style={{ marginBottom: '15px', fontSize: '1.5rem' }}>{service.title}</h3>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>{service.desc || service.description}</p>
                </motion.div>
            ))}
        </div>
      </div>
    </section>
  )
}

export default Services
