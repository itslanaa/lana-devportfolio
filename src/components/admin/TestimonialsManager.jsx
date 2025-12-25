import React, { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { FaTrash, FaPlus, FaEdit, FaTimes } from 'react-icons/fa'

const TestimonialsManager = () => {
    const [testimonials, setTestimonials] = useState([])
    const [activeType, setActiveType] = useState('company') // 'company' or 'testimonial'
    const [formData, setFormData] = useState({ client_name: '', logo_url: '', job_title: '', image_url: '', feedback: '', type: 'company' })
    const [editingId, setEditingId] = useState(null)

    useEffect(() => {
        fetchTestimonials()
    }, [])

    const fetchTestimonials = async () => {
        const { data } = await supabase.from('testimonials').select('*').order('created_at', { ascending: true })
        if (data) setTestimonials(data)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const payload = { ...formData, type: activeType }

        // Validation per type
        if (activeType === 'company' && (!payload.client_name || !payload.logo_url)) {
            return alert('Please fill in Company Name and Logo URL')
        }
        if (activeType === 'testimonial' && (!payload.client_name || !payload.feedback)) {
            return alert('Please fill in Name and Feedback')
        }

        if (editingId) {
            // Update
            const { error } = await supabase.from('testimonials').update(payload).eq('id', editingId)
            if (!error) {
                resetForm()
                fetchTestimonials()
            } else {
                alert('Error updating: ' + error.message)
            }
        } else {
            // Insert
            const { error } = await supabase.from('testimonials').insert([payload])
            if (!error) {
                resetForm()
                fetchTestimonials()
            } else {
                alert('Error adding: ' + error.message)
            }
        }
    }

    const resetForm = () => {
        setFormData({ client_name: '', logo_url: '', job_title: '', image_url: '', feedback: '', type: activeType })
        setEditingId(null)
    }

    const handleEdit = (item) => {
        setEditingId(item.id)
        setFormData({
            client_name: item.client_name || '',
            logo_url: item.logo_url || '',
            job_title: item.job_title || '',
            image_url: item.image_url || '',
            feedback: item.feedback || '',
            type: item.type
        })
        setActiveType(item.type)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const handleDelete = async (id) => {
        if (window.confirm('Delete this item?')) {
            await supabase.from('testimonials').delete().eq('id', id)
            fetchTestimonials()
        }
    }

    const filteredItems = testimonials.filter(item => item.type === activeType)

    return (
        <div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '30px' }}>Manage Social Proof</h3>

            <div style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
                <button
                    onClick={() => { setActiveType('company'); resetForm(); }}
                    style={{
                        padding: '10px 20px',
                        borderRadius: '20px',
                        border: 'none',
                        background: activeType === 'company' ? 'var(--accent-primary)' : 'rgba(255,255,255,0.05)',
                        color: activeType === 'company' ? 'white' : 'var(--text-secondary)'
                    }}
                >
                    Trusted Companies
                </button>
                <button
                    onClick={() => { setActiveType('testimonial'); resetForm(); }}
                    style={{
                        padding: '10px 20px',
                        borderRadius: '20px',
                        border: 'none',
                        background: activeType === 'testimonial' ? 'var(--accent-primary)' : 'rgba(255,255,255,0.05)',
                        color: activeType === 'testimonial' ? 'white' : 'var(--text-secondary)'
                    }}
                >
                    Customer Testimonials
                </button>
            </div>

            <form onSubmit={handleSubmit} style={{ marginBottom: '30px', background: 'var(--bg-secondary)', padding: '20px', borderRadius: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h4 style={{ margin: 0 }}>{editingId ? 'Edit Item' : `Add New ${activeType === 'company' ? 'Company' : 'Testimonial'}`}</h4>
                    {editingId && <button type="button" onClick={resetForm} style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}><FaTimes /> Cancel Edit</button>}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '8px' }}>{activeType === 'company' ? 'Company Name' : 'Customer Name'}</label>
                        <input type="text" value={formData.client_name} onChange={e => setFormData({ ...formData, client_name: e.target.value })} className="form-input" style={inputStyle} required />
                    </div>

                    {activeType === 'company' ? (
                        <div>
                            <label style={{ display: 'block', marginBottom: '8px' }}>Logo URL</label>
                            <input type="text" value={formData.logo_url} onChange={e => setFormData({ ...formData, logo_url: e.target.value })} className="form-input" style={inputStyle} placeholder="https://..." required />
                        </div>
                    ) : (
                        <div>
                            <label style={{ display: 'block', marginBottom: '8px' }}>Job Title (e.g., CEO of X)</label>
                            <input type="text" value={formData.job_title} onChange={e => setFormData({ ...formData, job_title: e.target.value })} className="form-input" style={inputStyle} />
                        </div>
                    )}
                </div>

                {activeType === 'testimonial' && (
                    <>
                        <div style={{ marginBottom: '15px' }}>
                            <label style={{ display: 'block', marginBottom: '8px' }}>Profile Image URL (Optional)</label>
                            <input type="text" value={formData.image_url} onChange={e => setFormData({ ...formData, image_url: e.target.value })} className="form-input" style={inputStyle} placeholder="https://..." />
                        </div>
                        <div style={{ marginBottom: '15px' }}>
                            <label style={{ display: 'block', marginBottom: '8px' }}>Feedback / Quote</label>
                            <textarea rows="3" value={formData.feedback} onChange={e => setFormData({ ...formData, feedback: e.target.value })} className="form-input" style={{ ...inputStyle, resize: 'none' }} required />
                        </div>
                    </>
                )}

                <button type="submit" className="btn-primary" style={{ padding: '12px 20px' }}>
                    {editingId ? 'Update Item' : <><FaPlus style={{ marginRight: '8px' }} /> Add Item</>}
                </button>
            </form>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
                {filteredItems.map(item => (
                    <div key={item.id} style={{ background: 'var(--bg-secondary)', padding: '20px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.05)', position: 'relative' }}>
                        <div style={{ position: 'absolute', top: '10px', right: '10px', display: 'flex', gap: '5px' }}>
                            <button onClick={() => handleEdit(item)} style={{ background: 'rgba(255, 255, 255, 0.1)', border: 'none', padding: '8px', borderRadius: '5px', color: 'var(--text-primary)', cursor: 'pointer' }} title="Edit">
                                <FaEdit />
                            </button>
                            <button onClick={() => handleDelete(item.id)} style={{ background: 'rgba(239, 68, 68, 0.2)', border: 'none', padding: '8px', borderRadius: '5px', color: '#ef4444', cursor: 'pointer' }} title="Delete">
                                <FaTrash />
                            </button>
                        </div>

                        {item.type === 'company' ? (
                            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                                <img src={item.logo_url} alt={item.client_name} style={{ height: '40px', objectFit: 'contain', marginBottom: '15px' }} />
                                <h4 style={{ fontSize: '1rem' }}>{item.client_name}</h4>
                            </div>
                        ) : (
                            <div style={{ marginTop: '20px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
                                    <img src={item.image_url || 'https://via.placeholder.com/50'} alt={item.client_name} style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
                                    <div>
                                        <h4 style={{ fontSize: '1rem' }}>{item.client_name}</h4>
                                        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{item.job_title}</p>
                                    </div>
                                </div>
                                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontStyle: 'italic' }}>"{item.feedback}"</p>
                            </div>
                        )}
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
