
import React, { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabaseClient'

const ContactEditor = () => {
    const [info, setInfo] = useState({
        email: '',
        phone: '',
        address: '',
        linkedin_url: '',
        github_url: '',
        dribbble_url: ''
    })
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        fetchInfo()
    }, [])

    const fetchInfo = async () => {
        const { data } = await supabase.from('contact_info').select('*').limit(1).single()
        if (data) setInfo(data)
    }

    const handleChange = (e) => {
        setInfo({ ...info, [e.target.name]: e.target.value })
    }

    const handleSave = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const { error } = await supabase.from('contact_info').update(info).eq('id', info.id)
            if (error) throw error
            alert('Contact Info updated!')
        } catch (error) {
            alert('Error: ' + error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '30px' }}>Contact Settings</h3>
            <form onSubmit={handleSave} style={{ background: 'var(--bg-secondary)', padding: '30px', borderRadius: '15px', maxWidth: '600px' }}>
                <div style={{ marginBottom: '20px' }}>
                    <label>Email Address</label>
                    <input type="email" name="email" value={info.email} onChange={handleChange} className="form-input" style={inputStyle} />
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <label>Phone Number</label>
                    <input type="text" name="phone" value={info.phone} onChange={handleChange} className="form-input" style={inputStyle} />
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <label>Address / Location</label>
                    <input type="text" name="address" value={info.address} onChange={handleChange} className="form-input" style={inputStyle} />
                </div>

                <hr style={{ borderColor: 'rgba(255,255,255,0.1)', margin: '30px 0' }} />
                <h4 style={{ marginBottom: '20px', color: 'var(--accent-secondary)' }}>Social Links</h4>

                <div style={{ marginBottom: '20px' }}>
                    <label>LinkedIn URL</label>
                    <input type="text" name="linkedin_url" value={info.linkedin_url || ''} onChange={handleChange} className="form-input" style={inputStyle} />
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <label>GitHub URL</label>
                    <input type="text" name="github_url" value={info.github_url || ''} onChange={handleChange} className="form-input" style={inputStyle} />
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <label>Dribbble URL (or other)</label>
                    <input type="text" name="dribbble_url" value={info.dribbble_url || ''} onChange={handleChange} className="form-input" style={inputStyle} />
                </div>

                <button type="submit" className="btn-primary" disabled={loading} style={{ width: '100%' }}>
                    {loading ? 'Saving...' : 'Save Settings'}
                </button>
            </form>
        </div>
    )
}

const inputStyle = {
    width: '100%',
    padding: '12px',
    marginTop: '8px',
    background: 'var(--bg-primary)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '8px',
    color: 'white'
}

export default ContactEditor
