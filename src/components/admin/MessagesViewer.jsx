
import React, { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabaseClient'

const MessagesViewer = () => {
    const [messages, setMessages] = useState([])
    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => {
        fetchMessages()
    }, [])

    const fetchMessages = async () => {
        const { data } = await supabase.from('contacts').select('*').order('created_at', { ascending: false })
        if (data) setMessages(data)
    }

    const handleDelete = async (id) => {
        if (window.confirm('Delete this message?')) {
            await supabase.from('contacts').delete().eq('id', id)
            fetchMessages()
        }
    }

    const filteredMessages = messages.filter(msg => {
        const term = searchTerm.toLowerCase()
        return msg.name?.toLowerCase().includes(term) ||
            msg.email?.toLowerCase().includes(term) ||
            msg.message?.toLowerCase().includes(term)
    })

    return (
        <div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '30px' }}>Inbox</h3>

            {/* Search Filter */}
            <div style={{ marginBottom: '30px' }}>
                <input
                    type="text"
                    placeholder="Filter messages (name, email, content)..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                        width: '100%',
                        padding: '12px 15px',
                        borderRadius: '10px',
                        border: '1px solid rgba(255,255,255,0.1)',
                        background: 'var(--bg-secondary)',
                        color: 'white',
                        fontSize: '1rem'
                    }}
                />
            </div>

            <div style={{ display: 'grid', gap: '20px' }}>
                {filteredMessages.length === 0 && <p style={{ color: 'var(--text-secondary)' }}>No messages found.</p>}
                {filteredMessages.map(msg => (
                    <div key={msg.id} style={{ background: 'var(--bg-secondary)', padding: '25px', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', alignItems: 'flex-start' }}>
                            <div>
                                <h4 style={{ fontSize: '1.1rem', color: 'var(--accent-primary)', marginBottom: '5px' }}>{msg.name}</h4>
                                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontFamily: 'monospace' }}>{msg.email}</p>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '10px' }}>
                                    {new Date(msg.created_at).toLocaleDateString()}
                                </span>
                                <button
                                    onClick={() => handleDelete(msg.id)}
                                    style={{
                                        background: 'rgba(239, 68, 68, 0.1)',
                                        color: '#ef4444',
                                        border: '1px solid rgba(239, 68, 68, 0.2)',
                                        padding: '5px 10px',
                                        borderRadius: '5px',
                                        fontSize: '0.8rem',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                        <div style={{ background: 'var(--bg-primary)', padding: '15px', borderRadius: '8px', lineHeight: 1.6, color: 'var(--text-primary)' }}>
                            {msg.message}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MessagesViewer
