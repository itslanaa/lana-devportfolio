import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '../lib/supabaseClient'
import { useNavigate } from 'react-router-dom'
import { FaSignOutAlt, FaUserEdit, FaProjectDiagram, FaEnvelope, FaBars, FaStar, FaCogs, FaTools } from 'react-icons/fa'
// Import sub-components
import HeroEditor from '../components/admin/HeroEditor'
import ProjectManager from '../components/admin/ProjectManager'
import MessagesViewer from '../components/admin/MessagesViewer'
import AboutEditor from '../components/admin/AboutEditor'
import NavigationManager from '../components/admin/NavigationManager'
import TestimonialsManager from '../components/admin/TestimonialsManager'
import ContactEditor from '../components/admin/ContactEditor'
import ServicesManager from '../components/admin/ServicesManager'

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('hero')
    const navigate = useNavigate()

    const handleLogout = async () => {
        await supabase.auth.signOut()
        navigate('/login')
    }

    const renderContent = () => {
        switch (activeTab) {
            case 'hero': return <HeroEditor />
            case 'about': return <AboutEditor />
            case 'services': return <ServicesManager />
            case 'projects': return <ProjectManager />
            case 'testimonials': return <TestimonialsManager />
            case 'contact': return <ContactEditor />
            case 'navigation': return <NavigationManager />
            case 'messages': return <MessagesViewer />
            default: return <HeroEditor />
        }
    }

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-primary)' }}>
            {/* Sidebar */}
            <div style={{
                width: '280px',
                background: 'var(--bg-secondary)',
                borderRight: '1px solid rgba(255,255,255,0.05)',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column'
            }}>
                <h2 style={{ marginBottom: '30px', fontSize: '1.2rem', paddingLeft: '10px' }}>Admin <span className="text-gradient">Panel</span></h2>

                <div style={{ flex: 1, overflowY: 'auto' }}>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', paddingLeft: '10px', marginBottom: '10px', textTransform: 'uppercase' }}>Content</p>
                    <SidebarButton active={activeTab === 'hero'} onClick={() => setActiveTab('hero')} icon={<FaUserEdit />} label="Hero Section" />
                    <SidebarButton active={activeTab === 'about'} onClick={() => setActiveTab('about')} icon={<FaUserEdit />} label="About Me" />
                    <SidebarButton active={activeTab === 'services'} onClick={() => setActiveTab('services')} icon={<FaTools />} label="Services" />
                    <SidebarButton active={activeTab === 'projects'} onClick={() => setActiveTab('projects')} icon={<FaProjectDiagram />} label="Projects" />
                    <SidebarButton active={activeTab === 'testimonials'} onClick={() => setActiveTab('testimonials')} icon={<FaStar />} label="Testimonials" />

                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', paddingLeft: '10px', marginTop: '20px', marginBottom: '10px', textTransform: 'uppercase' }}>Settings</p>
                    <SidebarButton active={activeTab === 'navigation'} onClick={() => setActiveTab('navigation')} icon={<FaBars />} label="Navigation (DnD)" />
                    <SidebarButton active={activeTab === 'contact'} onClick={() => setActiveTab('contact')} icon={<FaCogs />} label="Contact Info" />

                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', paddingLeft: '10px', marginTop: '20px', marginBottom: '10px', textTransform: 'uppercase' }}>Inquiries</p>
                    <SidebarButton active={activeTab === 'messages'} onClick={() => setActiveTab('messages')} icon={<FaEnvelope />} label="Messages" />
                </div>

                <button onClick={handleLogout} style={{ ...navButtonStyle, color: '#ef4444', marginTop: '20px' }}>
                    <FaSignOutAlt style={{ marginRight: '10px' }} /> Logout
                </button>
            </div>

            {/* Main Content */}
            <div style={{ flex: 1, padding: '40px', overflowY: 'auto', height: '100vh' }}>
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {renderContent()}
                </motion.div>
            </div>
        </div>
    )
}

const SidebarButton = ({ active, onClick, icon, label }) => (
    <button
        onClick={onClick}
        style={{
            ...navButtonStyle,
            background: active ? 'var(--accent-primary)' : 'transparent',
            fontWeight: active ? 'bold' : 'normal'
        }}
    >
        <span style={{ marginRight: '10px', display: 'flex', alignItems: 'center' }}>{icon}</span> {label}
    </button>
)

const navButtonStyle = {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    padding: '12px 15px',
    marginBottom: '5px',
    border: 'none',
    borderRadius: '10px',
    color: 'white',
    fontSize: '0.95rem',
    cursor: 'pointer',
    transition: 'all 0.2s',
    textAlign: 'left'
}

export default AdminDashboard
