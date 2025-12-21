
import React, { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { FaTrash, FaPlus } from 'react-icons/fa'

const TestimonialsManager = () => {
    const [testimonials, setTestimonials] = useState([])
    const [newClient, setNewClient] = useState({ client_name: '', logo_url: '' })

    useEffect(() => {
        fetchTestimonials()
    }, [])

    const fetchTestimonials = async () => {
        const { data } = await supabase.from('testimonials').select('*').order('created_at', { ascending: true })
        if (data) setTestimonials(data)
    }

    const handleAdd = async (e) => {
        e.preventDefault()
        const { error } = await supabase.from('testimonials').insert([newClient])
        if (!error) {
            setNewClient({ client_name: '', logo_url: '' })
            fetchTestimonials()
        } else {
            alert('Error adding: ' + error.message)
        }
    }

    const handleDelete = async (id) => {
        if (window.confirm('Delete this client?')) {
            await supabase.from('testimonials').delete().eq('id', id)
            fetchTestimonials()
        }
    }

    return (
        <div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '30px' }}>Manage Clients / Testimonials</h3>

            <form onSubmit={handleAdd} style={{ marginBottom: '30px', background: 'var(--bg-secondary)', padding: '20px', borderRadius: '10px', display: 'flex', gap: '10px', alignItems: 'end' }}>
                <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', marginBottom: '8px' }}>Company Name</label>
                    <input type="text" value={newClient.client_name} onChange={e => setNewClient({ ...newClient, client_name: e.target.value })} className="form-input" style={inputStyle} required />
                </div>
                <div style={{ flex: 2 }}>
                    <label style={{ display: 'block', marginBottom: '8px' }}>Logo URL</label>
                    <input type="text" value={newClient.logo_url} onChange={e => setNewClient({ ...newClient, logo_url: e.target.value })} className="form-input" style={inputStyle} placeholder="https://..." required />
                </div>
                <button type="submit" className="btn-primary" style={{ padding: '12px 20px', height: '44px' }}><FaPlus /> Add</button>
            </form>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
                {testimonials.map(item => (
                    <div key={item.id} style={{ background: 'var(--bg-secondary)', padding: '20px', borderRadius: '10px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <img src={item.logo_url} alt={item.client_name} style={{ height: '40px', objectFit: 'contain', marginBottom: '15px' }} />
                        <h4 style={{ fontSize: '1rem', marginBottom: '10px' }}>{item.client_name}</h4>
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

export default TestimonialsManager
