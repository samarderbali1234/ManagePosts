import React, { useState ,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPagePosts, addNewPost } from '../../../redux/actions/postActions'; // Importez addNewPost

import "./AddPost.css";

const NewPostForm = () => {
    const [content, setContent] = useState('');
    const [statusMessage, setStatusMessage] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [videoUrl, setVideoUrl] = useState('');
    const dispatch = useDispatch();

    const { pageId, accessToken } = useSelector(state => ({
        pageId: state.auth.pages[0].id,
        accessToken: state.auth.pages[0].accessToken,
    }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!content && !imageUrl && !videoUrl) {
            setStatusMessage('Le contenu de la publication ne peut pas être vide.');
            return;
        }

        try {
            const postData = {
                access_token: accessToken,
            };
            let endpoint = `/${pageId}/feed`;

            if (imageUrl) {
                postData.url = imageUrl;
                endpoint = `/${pageId}/photos`;
                if (content) postData.message = content;
            } else if (videoUrl) {
                postData.file_url = videoUrl;
                endpoint = `/${pageId}/videos`;
                if (content) postData.description = content;
            } else {
                postData.message = content;
            }

            await publishMedia(postData, endpoint);
        } catch (error) {
            setStatusMessage('Erreur de réseau. Veuillez réessayer.');
            console.error('Erreur lors de la tentative de publication :', error);
        }
    };

    const publishMedia = async (postData, endpoint) => {
        try {
            window.FB.api(endpoint, 'POST', postData, (response) => {
                handleResponse(response);
            });
        } catch (error) {
            console.error('Erreur lors de la publication:', error);
        }
    };
    
    
    const handleResponse = (response) => {
        if (response && !response.error) {
            setStatusMessage('Publication réussie sur la page !');
            const newPost = {
                id: response.id,
                message: content,
                full_picture: imageUrl || null,
                attachments: videoUrl ? [{ type: 'video_autoplay', url: videoUrl }] : [],
            };
            setContent('');
            setImageUrl('');
            setVideoUrl('');
            // Ajouter la publication directement dans Redux
            dispatch(addNewPost(newPost));
            dispatch(fetchPagePosts(pageId));
        } else {
            setStatusMessage('Échec de la publication. Veuillez vérifier les permissions ou réessayer.');
            console.error('Erreur lors de la publication:', response.error);
        }
    };

    useEffect(() => {
        if (statusMessage) {
            const timer = setTimeout(() => {
                setStatusMessage(null);
            }, 3000); // 3 secondes

            return () => clearTimeout(timer); // Nettoyer le timer si le composant est démonté ou si statusMessage change
        }
    }, [statusMessage]);

    return (
        <div className="new-post-form">
            <form onSubmit={handleSubmit}>
                <div className="form-row">
                    <textarea
                        placeholder="Quoi de neuf ?"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        rows="1"
                    />
                    <input
                        type="text"
                        placeholder="URL de l'image"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="URL de la vidéo"
                        value={videoUrl}
                        onChange={(e) => setVideoUrl(e.target.value)}
                    />
                </div>

                <button  type="submit">Publier</button>
            </form>
            {statusMessage && <p className='status-message'>{statusMessage}</p>}
        </div>
    );
};

export default NewPostForm;
