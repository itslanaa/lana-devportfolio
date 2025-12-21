
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import Projects from './components/Projects'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import CustomCursor from './components/CustomCursor'
import Login from './pages/Login'
import AdminDashboard from './pages/AdminDashboard'
import ProtectedRoute from './components/ProtectedRoute'
import './styles/index.css'

// Public Layout Component
const PublicLayout = () => {
    return (
        <>
            <Navbar />
            <main>
                <section id="home">
                    <Hero />
                </section>
                <section id="about">
                    <About />
                </section>
                <section id="services">
                    <Services />
                </section>
                <section id="projects">
                    <Projects />
                </section>
                <section id="testimonials">
                    <Testimonials />
                </section>
                <section id="contact">
                    <Contact />
                </section>
            </main>
        </>
    )
}

function App() {
    return (
        <Router>
            <div className="app-container">
                <CustomCursor />
                <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<PublicLayout />} />
                    <Route path="/login" element={<Login />} />

                    {/* Admin Routes */}
                    <Route element={<ProtectedRoute />}>
                        <Route path="/admin" element={<AdminDashboard />} />
                    </Route>
                </Routes>
            </div>
        </Router>
    )
}

export default App
