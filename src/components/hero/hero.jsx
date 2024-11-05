// src/components/Hero.js

import React from 'react';
import './hero.css'; // Import the CSS for styling
import FacebookLogin from '../authentification/FacebookLogin';

const Hero = ({ onLogin }) => {
    return (
        <div className="hero">
               <div className="hero-shape"></div>
            <main className="hero-text">
                <h2 className="main__heading">Gérez vos publications Facebook facilement</h2>
                <FacebookLogin/>
                {/* <button className="btn" onClick={onLogin}>
                    Se connecter avec Facebook
                </button> */}
            </main>
            <section className="hero-image">
                <img src="https://www.hallaminternet.com/wp-content/uploads/2018/04/facebook-advertising.jpg" alt="manage-post-fcb"/>
            </section>
        </div>
    );
};

export default Hero;
