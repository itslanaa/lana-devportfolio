
import React, { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { FaTrash, FaEdit, FaPlus } from 'react-icons/fa'

const ProjectManager = () => {
    const [projects, setProjects] = useState([])
    const [editingProject, setEditingProject] = useState(null) // null = list mode, {} = create mode, {id...} = edit mode
    const [formData, setFormData] = useState({ title: '', category: 'Web', image_url: '', stack: '', demo_url: '', repo_url: '' })

    useEffect(() => {
        fetchProjects()
    }, [])

    const fetchProjects = async () => {
        const { data } = await supabase.from('projects').select('*').order('created_at', { ascending: false })
        if (data) setProjects(data)
    }

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure?')) return
        await supabase.from('projects').delete().eq('id', id)
        fetchProjects()
    }

    const handleEdit = (project) => {
        setEditingProject(project)
        setFormData({
            ...project,
            stack: project.stack ? project.stack.join(', ') : ''
        })
    }

    const handleCreate = () => {
        setEditingProject({})
        setFormData({ title: '', category: 'Web', image_url: '', stack: '', demo_url: '', repo_url: '' })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const payload = {
            ...formData,
            stack: formData.stack.split(',').map(s => s.trim())
        }

        if (editingProject.id) {
            await supabase.from('projects').update(payload).eq('id', editingProject.id)
        } else {
            await supabase.from('projects').insert([payload])
        }
        setEditingProject(null)
        fetchProjects()
    }

    if (editingProject) {
        return (
            <div>
                <button onClick={() => setEditingProject(null)} style={{ marginBottom: '20px', color: 'var(--text-secondary)', background: 'transparent', border: 'none', cursor: 'pointer' }}>&larr; Back to List</button>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '20px' }}>{editingProject.id ? 'Edit Project' : 'Add New Project'}</h3>
                <form onSubmit={handleSubmit} style={{ background: 'var(--bg-secondary)', padding: '30px', borderRadius: '15px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                        <div style={{ marginBottom: '20px' }}>
                            <label>Title</label>
                            <input type="text" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} className="form-input" style={inputStyle} required />
                        </div>
                        <div style={{ marginBottom: '20px' }}>
                            <label>Category</label>
                            <select value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} className="form-input" style={inputStyle}>
                                <option value="Web">Web</option>
                                <option value="Mobile">Mobile</option>
                                <option value="Design">Design</option>
                            </select>
                        </div>
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <label>Image URL</label>
                        <input type="text" value={formData.image_url} onChange={e => setFormData({ ...formData, image_url: e.target.value })} className="form-input" style={inputStyle} />
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <label>Tech Stack (comma separated)</label>
                        <input type="text" value={formData.stack} onChange={e => setFormData({ ...formData, stack: e.target.value })} className="form-input" style={inputStyle} placeholder="React, Node.js, etc." />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                        <div style={{ marginBottom: '20px' }}>
                            <label>Demo URL</label>
                            <input type="text" value={formData.demo_url} onChange={e => setFormData({ ...formData, demo_url: e.target.value })} className="form-input" style={inputStyle} />
                        </div>
                        <div style={{ marginBottom: '20px' }}>
                            <label>Repo URL</label>
                            <input type="text" value={formData.repo_url} onChange={e => setFormData({ ...formData, repo_url: e.target.value })} className="form-input" style={inputStyle} />
                        </div>
                    </div>
                    <button type="submit" className="btn-primary">Save Project</button>
                </form>
            </div>
        )
    }

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <h3 style={{ fontSize: '1.5rem' }}>All Projects</h3>
                <button onClick={handleCreate} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px' }}>
                    <FaPlus /> Add New
                </button>
            </div>

            <div style={{ display: 'grid', gap: '20px' }}>
                {projects.map(project => (
                    <div key={project.id} style={{ background: 'var(--bg-secondary)', padding: '20px', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                            <img src={project.image_url || 'https://via.placeholder.com/50'} alt="" style={{ width: '60px', height: '40px', objectFit: 'cover', borderRadius: '5px' }} />
                            <div>
                                <h4 style={{ fontSize: '1.1rem' }}>{project.title}</h4>
                                <span style={{ fontSize: '0.8rem', color: 'var(--accent-secondary)' }}>{project.category}</span>
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <button onClick={() => handleEdit(project)} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', padding: '8px', borderRadius: '5px', color: 'white', cursor: 'pointer' }}><FaEdit /></button>
                            <button onClick={() => handleDelete(project.id)} style={{ background: 'rgba(239, 68, 68, 0.2)', border: 'none', padding: '8px', borderRadius: '5px', color: '#ef4444', cursor: 'pointer' }}><FaTrash /></button>
                        </div>
                    </div>
                ))}
            </div>
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

export default ProjectManager
