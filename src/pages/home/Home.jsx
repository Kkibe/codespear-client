import React from 'react';
import './Home.css';
import Java from '../../assets/java.png';
import JavaScript from '../../assets/js.png';
import Cover from '../../assets/cover.png';
import Slider from '../../components/slider/Slider';
import { CoursesItem } from '../../components/courseItem/CoursesItem';
import { NavLink } from 'react-router-dom';
import { courses } from '../../data';

export const Home = () => {
  return (
    <div className='home page'>
      <Slider />
      <div className="featured">
        <h2>Learn web development</h2>
        <div className='wrapper'>
            <div className='item'>
                <img src={Java} title='learn-java' alt='java'/>
                <hr/>
                <p >
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
                <NavLink to={'#'} className="button" title='Learn HTML'>Learn HTML</NavLink>
            </div>
            <div className='item'>
                <img src={Java} alt='learn-java' />
                <hr/>
                <p >
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam.
                </p>
                <NavLink to={'#'} className="button" title='Learn Java'>Learn Java</NavLink>
            </div>
            <div className='item'>
                <img src={JavaScript} alt='learn-javascript'/>
                <hr/>
                <p >
                  JavaScript can be connected to the objects of its environment.
                </p>
                <NavLink to={'#'} className="button" title='Learn Javascript'>Learn More</NavLink>
            </div>
            <div className='item'>
                <img src={Cover} alt='learn-web-dev'/>
                <hr/>
                <p >
                  JavaScript can be connected to the objects of its environment.
                </p>
                <NavLink to={'#'} className="button" title='Web Dev Full Course'>Get Full Course &raquo;</NavLink>
            </div>
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
