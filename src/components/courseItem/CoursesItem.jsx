import React from 'react';
import './CourseItem.css';
import { NavLink } from 'react-router-dom';


export const CoursesItem = ({data}) => {
  return (
    <NavLink to={'/courses/id-here'} className='course-item' title={'Course Title'}>
        <img src={data.img} alt={data.name} />
        <h3>{data.name}</h3>
        <p>{data.description}</p>
    </NavLink>
  )
}
