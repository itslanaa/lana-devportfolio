
import React, { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabaseClient'

const AboutEditor = () => {
    const [content, setContent] = useState({
        bio: '',
        years_experience: '',
        projects_completed: '',
        image_url: '',
        cv_url: ''
    })
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchAbout = async () => {
            const { data } = await supabase.from('about_content').select('*').eq('active', true).limit(1).single()
            if (data) setContent(data)
        }
        fetchAbout()
    }, [])

    const handleChange = (e) => {
        setContent({ ...content, [e.target.name]: e.target.value })
    }

    const handleSave = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const { error } = await supabase.from('about_content').update(content).eq('id', content.id)
            if (error) throw error
            alert('About content updated!')
        } catch (error) {
            alert('Error updating content: ' + error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '20px' }}>Edit About Section</h3>
            <form onSubmit={handleSave} style={{ background: 'var(--bg-secondary)', padding: '30px', borderRadius: '15px' }}>
                <div style={{ marginBottom: '20px' }}>
                    <label>Bio</label>
                    <textarea name="bio" value={content.bio} onChange={handleChange} className="form-input" rows="5" style={inputStyle} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div style={{ marginBottom: '20px' }}>
                        <label>Years Experience</label>
                        <input type="text" name="years_experience" value={content.years_experience} onChange={handleChange} className="form-input" style={inputStyle} />
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <label>Projects Completed</label>
                        <input type="text" name="projects_completed" value={content.projects_completed} onChange={handleChange} className="form-input" style={inputStyle} />
                    </div>
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <label>Image URL</label>
                    <input type="text" name="image_url" value={content.image_url || ''} onChange={handleChange} className="form-input" style={inputStyle} placeholder="https://..." />
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <label>CV URL (Download Link)</label>
                    <input type="text" name="cv_url" value={content.cv_url || ''} onChange={handleChange} className="form-input" style={inputStyle} placeholder="https://.../my-cv.pdf" />
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

export default AboutEditor
