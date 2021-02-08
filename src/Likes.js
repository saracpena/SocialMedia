import React, { useState, useEffect } from 'react'
// React Animation
import FlipMove from 'react-flip-move'
// CSS
import './Likes.css'

// import db from local db
import Post from './Post'
import { db } from './Firebase'
import Firebase from './Firebase'
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';


function Likes() {

// const user = useSelector(selectUser);
const [posts, setPosts] = useState([]);
useEffect(() => {
    db.collection('posts')
      .orderBy('timestamp', 'desc')
      .onSnapshot((snapshot) => 
        setPosts(
            snapshot.docs.map((doc) => ({
                id: doc.id,
                data: doc.data(),
            }))
        )
    );//real time posts collection when posts are add/deleted
}, []);

// Query db firestore of UIDs get all posts that have current users UID in their likes array


    
    return (
        <div className='likes-navlink'>
         <div className='feed_inputContainer'> Likes Component renders all of the users liked posts</div>
            <div className="feed_input"></div>
            <FlipMove>
            {posts.map(({id, data: {name, description, likes, message, photoURL}}) => (
            <Post 
                key={id}
                name={name}
                description={description}
                likes={likes}
                message={message}
                photoURL={photoURL}
            />
        ))}
            <div className='feed_inputOptions'></div>
        </FlipMove>
        </div>
    )
}

export default Likes