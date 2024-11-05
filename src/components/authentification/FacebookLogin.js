// src/components/FacebookLogin.js

import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setAccessToken, setUser, setUserPages } from '../../redux/actions/authActions'; // Importez setUserPages
import { useNavigate } from 'react-router-dom';

const FacebookLogin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        // Initialiser le SDK Facebook
        window.fbAsyncInit = () => {
            if (typeof window.FB !== 'undefined') {
                window.FB.init({
                    appId: '2155048141556439',
                    autoLogAppEvents: true,
                    xfbml: true,
                    version: 'v21.0'
                });
                console.log("Facebook SDK initialized");
            } else {
                console.error("Facebook SDK not loaded.");
            }
        };

        // Charger le SDK de Facebook
        (function(d, s, id) {
            let js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s); js.id = id;
            js.src = "https://connect.facebook.net/fr_FR/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    }, []);

    const handleLogin = () => {
        window.FB.login(response => {
            if (response.authResponse) {
                const accessToken = response.authResponse.accessToken;
                dispatch(setAccessToken(accessToken));
                window.FB.api('/me/permissions', (permissionsResponse) => {
                    const declinedPermissions = permissionsResponse.data
                        .filter(perm => perm.status === 'declined')
                        .map(perm => perm.permission);
    
                        if (declinedPermissions.length > 0) {
                            console.warn("Les permissions suivantes ont été refusées :", declinedPermissions.join(', '));
                            console.log("Certaines permissions sont manquantes, l'application pourrait ne pas fonctionner complètement.");
                        } else {
                            console.log("Toutes les permissions demandées sont activées, aucun problème détecté.");
                        }
                // Récupérer les informations utilisateur
                window.FB.api('/me?fields=id,name,email,picture', user => {
                    const userData = {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        profilePicture: user.picture.data.url,
                    };
                    dispatch(setUser(userData)); // Stocker l'utilisateur dans Redux
                    console.log("User data stored in Redux:", userData);

                    // Récupérer les pages administrées par l'utilisateur
                    window.FB.api('/me/accounts?fields=id,name,picture,access_token', (pagesResponse) => {
                        if (pagesResponse && !pagesResponse.error) {
                            const pagesData = pagesResponse.data.map(page => ({
                                id: page.id,
                                name: page.name,
                                picture: page.picture.data.url,
                                accessToken: page.access_token, // Token spécifique à chaque page
                            }));
                            dispatch(setUserPages(pagesData)); // Stocker les pages dans Redux
                            console.log("User pages stored in Redux:", pagesData);

                            // Redirigez vers la page des posts après la récupération des données
                            navigate('/postsList');
                        } else {
                            console.error("Erreur lors de la récupération des pages :", pagesResponse.error);
                        }
                    });
                });
            });
                console.log("Access Token:", accessToken);
            } else {
                console.error("Facebook login failed", response);
                alert("Échec de la connexion Facebook. Veuillez réessayer.");
            }
        }, { scope: 'email,publish_video,pages_show_list,pages_read_engagement,pages_manage_posts,pages_read_user_content' });
    };

    return (
        <button className='btn' onClick={handleLogin}>
            Se connecter avec Facebook
        </button>
    );
};

export default FacebookLogin;
