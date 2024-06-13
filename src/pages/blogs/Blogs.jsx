import React from 'react';
import BlogItem from '../../components/blogItem/BlogItem';
import './Blogs.css';

export const Blogs = () => {
    return (
        <div className='page blogs'>
            <div className='header'>
                <h1 className='light'>READ FROM HERE</h1>
            </div>
            <div className='posts-container'>
                <BlogItem />
                <BlogItem />
                <BlogItem />
            </div>
        </div>
    );
}
