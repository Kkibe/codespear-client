import React from 'react';
import './BlogItem.css';
import { NavLink } from 'react-router-dom';

export default function BlogItem() {
  return (
    <NavLink to={'/blog/id'} className='blog-item' title={"Blog Title"}>
        <div className="date">08 Mar 2024</div>
        <h4>Lorem ipsum do lo sit amet. Lorem ipsum do lo sit amet &raquo;</h4>
        <p>
        Lorem ipsum do lo sit amet. Lorem ipsum do lo sit ametLorem ipsum do lo sit amet.
        Lorem ipsum do lo sit amet. Lorem ipsum do lo sit ametLorem ipsum do lo sit amet. Lorem ipsum do lo sit amet...</p>
    </NavLink>
  )
}
