import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPagePosts } from '../../../redux/actions/postActions';
import './postList.css';

const PostsList = () => {
    const dispatch = useDispatch();
    const { posts, loading, nextPage, accessToken, userPages } = useSelector(state => ({
        posts: state.posts?.posts || [],
        loading: state.posts?.loading || false,
        nextPage: state.posts?.nextPage || null,
        accessToken: state.auth?.accessToken,
        userPages: state.auth?.pages || [],
    }));

    const [scrollPosition, setScrollPosition] = useState(0);
    const [selectedPageId, setSelectedPageId] = useState(null);

    useEffect(() => {
        if (userPages.length > 0 && !selectedPageId) {
            setSelectedPageId(userPages[0].id);
        }
    }, [userPages, selectedPageId]);

    useEffect(() => {
        if (selectedPageId && accessToken) {
            dispatch(fetchPagePosts(selectedPageId));
        }
    }, [dispatch, accessToken, selectedPageId]);

    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 200) {
            if (nextPage && !loading) {
                setScrollPosition(window.scrollY);
                dispatch(fetchPagePosts(selectedPageId, nextPage));
            }
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [nextPage, loading]);

    useEffect(() => {
        if (!loading) {
            window.scrollTo(0, scrollPosition);
        }
    }, [loading, scrollPosition]);

    return (
        <div className="posts-list">
            {posts.length === 0 ? (
                <div className="loading-container">
                    <div className="loading-circle"></div>
                </div>
            ) : (
                posts.map(post => {
                    const hasVideo = post.attachments?.data?.some(attachment => attachment.type === 'video_autoplay');
                    return (
                        <div key={post.id} className="post">
                            <div className="post-header">
                                <img
                                    src={userPages.find(page => page.id === selectedPageId)?.picture || "default-image-url.png"}
                                    alt="Page"
                                    className="page-image"
                                    style={{ width: '50px', height: '50px', borderRadius: '50%', marginRight: '10px' }}
                                />
                                <h3>{userPages.find(page => page.id === selectedPageId)?.name || "Nom de la Page"}</h3>
                            </div>
                            <p className="post-message">{post.message}</p>
                            {!hasVideo && post.full_picture && (
                                <img src={post.full_picture} alt="Post" className="post-image" />
                            )}
                            {post.attachments && post.attachments.data && post.attachments.data.map((attachment, index) => (
                                attachment.type === 'video_autoplay' && attachment.url && (
                                    <div key={index} className="post-video">
                                        <iframe
                                            src={`https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(attachment.url)}&show_text=0&width=500`}
                                            width="750"
                                            height="300"
                                            style={{ border: 'none', overflow: 'hidden' }}
                                            allowFullScreen={true}
                                            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                                        ></iframe>
                                    </div>
                                )
                            ))}
                            <div className="post-actions">
                                <button className="like-button">Like</button>
                                <button className="comment-button">Commenter</button>
                                <button className="share-button">Partager</button>
                            </div>
                        </div>
                    );
                })
            )}
            {loading && posts.length > 0 && (
                <div className="loading-container">
                    <div className="loading-dots">
                        <div className="dot"></div>
                        <div className="dot"></div>
                        <div className="dot"></div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PostsList;
