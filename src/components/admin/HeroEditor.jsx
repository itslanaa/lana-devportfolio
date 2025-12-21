
import React, { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabaseClient'

const HeroEditor = () => {
    const [content, setContent] = useState({
        greeting: '',
        name: '',
        title: '',
        description: ''
    })
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchHero = async () => {
            const { data } = await supabase.from('hero_content').select('*').eq('active', true).limit(1).single()
            if (data) setContent(data)
        }
        fetchHero()
    }, [])

    const handleChange = (e) => {
        setContent({ ...content, [e.target.name]: e.target.value })
    }

    const handleSave = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const { error } = await supabase.from('hero_content').update(content).eq('id', content.id)
            if (error) throw error
            alert('Hero content updated!')
        } catch (error) {
            alert('Error updating content: ' + error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '20px' }}>Edit Hero Section</h3>
            <form onSubmit={handleSave} style={{ background: 'var(--bg-secondary)', padding: '30px', borderRadius: '15px' }}>
                <div style={{ marginBottom: '20px' }}>
                    <label>Greeting</label>
                    <input type="text" name="greeting" value={content.greeting} onChange={handleChange} className="form-input" style={inputStyle} />
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <label>Name</label>
                    <input type="text" name="name" value={content.name} onChange={handleChange} className="form-input" style={inputStyle} />
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <label>Title</label>
                    <input type="text" name="title" value={content.title} onChange={handleChange} className="form-input" style={inputStyle} />
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <label>Description</label>
                    <textarea name="description" value={content.description} onChange={handleChange} className="form-input" rows="4" style={inputStyle} />
                </div>
                <button type="submit" className="btn-primary" disabled={loading}>
                    {loading ? 'Saving...' : 'Save Changes'}
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

export default HeroEditor
