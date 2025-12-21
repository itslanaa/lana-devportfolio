
import React, { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { FaTrash, FaPlus } from 'react-icons/fa'

const ServicesManager = () => {
    const [services, setServices] = useState([])
    const [newService, setNewService] = useState({ title: '', description: '', icon: '' })

    useEffect(() => {
        fetchServices()
    }, [])

    const fetchServices = async () => {
        const { data } = await supabase.from('services').select('*').order('created_at', { ascending: true })
        if (data) setServices(data)
    }

    const handleAdd = async (e) => {
        e.preventDefault()
        const { error } = await supabase.from('services').insert([newService])
        if (!error) {
            setNewService({ title: '', description: '', icon: '' })
            fetchServices()
        }
    }

    const handleDelete = async (id) => {
        if (window.confirm('Delete this service?')) {
            await supabase.from('services').delete().eq('id', id)
            fetchServices()
        }
    }

    return (
        <div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '30px' }}>Manage Services</h3>

            <form onSubmit={handleAdd} style={{ marginBottom: '30px', background: 'var(--bg-secondary)', padding: '20px', borderRadius: '10px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '15px' }}>
                    <div>
                        <label>Service Title</label>
                        <input type="text" value={newService.title} onChange={e => setNewService({ ...newService, title: e.target.value })} className="form-input" style={inputStyle} required />
                    </div>
                    <div>
                        <label>Icon Name (e.g. FaCode)</label>
                        <input type="text" value={newService.icon} onChange={e => setNewService({ ...newService, icon: e.target.value })} className="form-input" style={inputStyle} required />
                    </div>
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label>Description</label>
                    <input type="text" value={newService.description} onChange={e => setNewService({ ...newService, description: e.target.value })} className="form-input" style={inputStyle} required />
                </div>
                <button type="submit" className="btn-primary" style={{ padding: '10px 20px' }}><FaPlus /> Add Service</button>
            </form>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
                {services.map(item => (
                    <div key={item.id} style={{ background: 'var(--bg-secondary)', padding: '20px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <h4 style={{ fontSize: '1.1rem', marginBottom: '10px', color: 'var(--accent-secondary)' }}>{item.icon}</h4>
                        <h4 style={{ fontSize: '1.1rem', marginBottom: '10px' }}>{item.title}</h4>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '15px' }}>{item.description}</p>
                        <button onClick={() => handleDelete(item.id)} style={{ background: 'rgba(239, 68, 68, 0.2)', border: 'none', padding: '8px', borderRadius: '5px', color: '#ef4444', cursor: 'pointer', width: '100%' }}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    )
}

const inputStyle = {
    width: '100%',
    padding: '10px',
    background: 'var(--bg-primary)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '8px',
    color: 'white'
}

export default ServicesManager
