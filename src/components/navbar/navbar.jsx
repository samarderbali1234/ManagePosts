// src/components/Navbar.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAccessToken, setUser } from '../../redux/actions/authActions';
import { Link, useNavigate } from 'react-router-dom'; 
import './Navbar.css'; // Assurez-vous d'importer le fichier CSS

const Navbar = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);
    const accessToken = useSelector(state => state.auth.accessToken);

    const navigate = useNavigate();
    const handleLogout = () => {
        dispatch(setAccessToken(null));
        dispatch(setUser(null));

        
        if (!user && !accessToken) {
            console.log('Utilisateur déjà déconnecté ou session non trouvée.');
        } else {
            console.log('Déconnexion réussie, utilisateur supprimé ');
        }
        navigate('/');
    };

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <h1>Test</h1> {/* Remplacez par le logo */}
            </div>
            
            <div className="navbar-buttons">
              
                    <>
                        <span>Bonjour, {user.name}</span>
                        <button className="btn logout" onClick={handleLogout}>Déconnexion</button>
                    </>
               
            </div>
        </nav>
    );
};

export default Navbar;
