// src/App.js

import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import PostsList from './components/posts/listPost/PostsList';
import Addposts from './components/posts/AddPost/AddPost';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Hero from './components/hero/hero';
import Posts from './components/posts/Posts';

const App = () => {
    

    return (
       
        <Router>
            <div>
                <Routes>
                    <Route path='/' element={<Hero />} />
                    <Route path="postsList" element={<Posts />} />
                    
                </Routes>
            </div>
        </Router>
       
    );
};

export default App;
