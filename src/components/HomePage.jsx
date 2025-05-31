// src/components/HomePage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
    const navigate = useNavigate();

    return (
        <div className="homepage-container">
        <header className="homepage-header">
            <div className="logo">📝 Blog Editor</div>
            <nav className="nav">
                <Link to="/product">Product</Link>
                <Link to="/solutions">Solutions</Link>
                <Link to="/resources">Resources</Link>
                <Link to="/pricing">Pricing</Link>
                <Link to="/enterprise">Enterprise</Link>

            <button className="btn login-btn">Login</button>
            <button className="btn get-started-btn">Get Started</button>
            </nav>
        </header>

        <main className="hero-section">
            <h1>Create a blog worth sharing</h1>
            <p>
            Get a full suite of intuitive design features and powerful marketing tools
            to create a unique blog that leaves a lasting impression.
            </p>
            <button className="start-btn" onClick={() => navigate('/editor')}>
            Start Blogging
            </button>
        </main>
        </div>
    );
}

export default HomePage;
