
import React, { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'
import { FaTrash, FaPlus, FaGripVertical } from 'react-icons/fa'

const NavigationManager = () => {
    const [links, setLinks] = useState([])
    const [newLink, setNewLink] = useState({ name: '', url: '' })

    useEffect(() => {
        fetchLinks()
    }, [])

    const fetchLinks = async () => {
        const { data } = await supabase.from('navigation').select('*').order('order', { ascending: true })
        if (data) setLinks(data)
    }

    const handleDragEnd = async (result) => {
        if (!result.destination) return

        const items = Array.from(links)
        const [reorderedItem] = items.splice(result.source.index, 1)
        items.splice(result.destination.index, 0, reorderedItem)

        setLinks(items)

        // Update order in DB
        const updates = items.map((item, index) => ({
            id: item.id,
            name: item.name,
            url: item.url,
            order: index
        }))

        for (const item of updates) {
            await supabase.from('navigation').update({ order: item.order }).eq('id', item.id)
        }
    }

    const handleAdd = async (e) => {
        e.preventDefault()
        const maxOrder = links.length > 0 ? Math.max(...links.map(l => l.order)) : 0
        const { error } = await supabase.from('navigation').insert([{ ...newLink, order: maxOrder + 1 }])
        if (!error) {
            setNewLink({ name: '', url: '' })
            fetchLinks()
        }
    }

    const handleDelete = async (id) => {
        if (window.confirm('Delete this link?')) {
            await supabase.from('navigation').delete().eq('id', id)
            fetchLinks()
        }
    }

    return (
        <div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '30px' }}>Manage Navigation</h3>

            <form onSubmit={handleAdd} style={{ marginBottom: '30px', background: 'var(--bg-secondary)', padding: '20px', borderRadius: '10px', display: 'flex', gap: '10px' }}>
                <input type="text" placeholder="Name (e.g. Home)" value={newLink.name} onChange={e => setNewLink({ ...newLink, name: e.target.value })} className="form-input" style={inputStyle} required />
                <input type="text" placeholder="URL (e.g. #home)" value={newLink.url} onChange={e => setNewLink({ ...newLink, url: e.target.value })} className="form-input" style={inputStyle} required />
                <button type="submit" className="btn-primary" style={{ padding: '0 20px', whiteSpace: 'nowrap' }}><FaPlus /> Add</button>
            </form>

            <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="navigation">
                    {(provided) => (
                        <div {...provided.droppableProps} ref={provided.innerRef} style={{ display: 'grid', gap: '10px' }}>
                            {links.map((link, index) => (
                                <Draggable key={link.id} draggableId={link.id.toString()} index={index}>
                                    {(provided) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            style={{
                                                background: 'var(--bg-secondary)',
                                                padding: '15px',
                                                borderRadius: '8px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                border: '1px solid rgba(255,255,255,0.05)',
                                                ...provided.draggableProps.style
                                            }}
                                        >
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                                <div {...provided.dragHandleProps} style={{ color: 'var(--text-secondary)', cursor: 'grab' }}><FaGripVertical /></div>
                                                <div>
                                                    <span style={{ fontWeight: 'bold' }}>{link.name}</span>
                                                    <span style={{ marginLeft: '10px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{link.url}</span>
                                                </div>
                                            </div>
                                            <button onClick={() => handleDelete(link.id)} style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer' }}><FaTrash /></button>
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
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

export default NavigationManager
