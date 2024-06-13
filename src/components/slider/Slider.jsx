import { ArrowLeftOutlined, ArrowRightOutlined} from '@mui/icons-material';
import React, { useState } from  'react';
import Html from '../../assets/html.png';
import Js from '../../assets/js.png';
import Java from '../../assets/java.png';
import Python from '../../assets/python.png';
import './Slider.css';
import { NavLink } from 'react-router-dom';

export default function Slider() {
    const [slideIndex, setSlideIndex] = useState(0);
    const handleClick = (direction) => {
        if(direction === "left") {
            setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 3)
        } else {
            setSlideIndex(slideIndex < 3 ? slideIndex + 1 : 0)
        }
    }
  return (
<div className="slider-container">
    <div className="arrow"  onClick={() => handleClick("left")}>
        <ArrowLeftOutlined />
    </div>

   <div className="wrapper" style={{
    transform: `translateX(${slideIndex * -100}vw)`
   }}>
    <div className="slider">
        <div className="image-container">
            <img src={Html} alt="learn-html" />
        </div>
        <div className="info">
            <h1>LEARN HTML</h1>
            <p>
                HTML stands for Hyper Text Tranfer Proctocol and it is used to develop web applications.
            </p>
            <NavLink to={'/courses'} className={'button'} title='Course Documentation'>Explore</NavLink>
        </div>
    </div>

    <div className="slider">
        <div className="image-container">
            <img src={Js} alt="learn-javascript" />
        </div>
        <div className="info">
            <h1>JAVASCRIPT</h1>
            <p>
            JavaScript is the most used programming language in the world. It is used to program the web. 
            </p>
            <NavLink to={'/courses'} className={'button'} title='Javascript Documentation'>Visit Now</NavLink>
        </div>
    </div>

    <div className="slider">
        <div className="image-container">
            <img src={Python} alt="learn-python" />
        </div>
        <div className="info">
            <h1>PYTHON</h1>
            <p>
            The ever-growing importance of data in business has resulted 
            in a quick rise in popularity and demand for Python.
            </p>
            <NavLink to={'/courses'} className={'button'} title='Learn Python'>Visit Now</NavLink>
        </div>
    </div>

    <div className="slider">
        <div className="image-container">
            <img src={Java} alt="learn-java" />
        </div>
        <div className="info">
            <h1>JAVA</h1>
            <p>
            Java as a programming language is omnipresent in web, 
            Android apps, banking and finance software, desktop, and so on.

            </p>
            <NavLink to={'/courses'} className={'button'} title='Learn Java'>Visit Now</NavLink>
        </div>
    </div>
   </div>
    <div className="arrow" onClick={() => handleClick("right")}>
        <ArrowRightOutlined />
    </div>
</div>
  )
}
