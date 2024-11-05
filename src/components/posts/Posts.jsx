import React from 'react'
import Navbar from '../navbar/navbar'
import AddPost from './AddPost/AddPost';
import PostsList from './listPost/PostsList';
export default function Posts() {
  return (
    <div>
     <Navbar/>
     <AddPost/> 
     <PostsList/>
    </div>
  )
}
