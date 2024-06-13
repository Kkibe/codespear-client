import React from 'react';
import './Courses.css';
import { NavLink } from 'react-router-dom';
import { KeyboardArrowDown } from '@mui/icons-material';
import { CoursesItem } from '../../components/courseItem/CoursesItem';
import { courses } from '../../data';

export const Courses = () => {
  const handleScroll = () => {
    window.scrollTo({
        top: 465,
        left: 0,
        behavior: 'smooth'
    })
  }
  
  return (
    <div className='page'>
        <div className="tags">
          <NavLink to='/courses?tags=CSS' title='Javascript'>JavaScript</NavLink>
          <NavLink to='/' title='python'>Python</NavLink>
          <NavLink to='/' title='Java'>Java</NavLink>
          <NavLink to='/' title='C'>C</NavLink>
          <NavLink to='/' title='C++'>C++</NavLink>
          <NavLink to='/' title='jQuey'>jQuery</NavLink>
          <NavLink to='/' title='PHP'>PHP</NavLink>
          <NavLink to='/' title='MySQL'>MySQL</NavLink>
        </div>
        <div className='flyer'>
            <h2>Explore Technologies</h2>
            <div className='button' onClick={handleScroll}>
              <KeyboardArrowDown />
            </div>
        </div>
        <h2>Trending Technologies</h2>
        <div className="courses-container">
          {courses.map(course => {
            return (
              <CoursesItem data={course} key={course.id}/>
            )
          })}
        </div>
    </div>
  )
}