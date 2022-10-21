import { ArrowLeftOutlined, ArrowRightOutlined} from '@mui/icons-material';
import React, { useEffect, useState } from  'react';
import styled from 'styled-components';
import Html from '../assets/html.png';
import Js from '../assets/js.png';
import Java from '../assets/java.png';
import Python from '../assets/python.png';

const Container = styled.div`
    width: 100%;
    height: 300px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    position: relative;
    overflow: hidden;
    background: #ebf4fc;

    .arrow{
        width: 50px;
        height: 50px;
        background: #f9f9f9;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        top: 0;
        bottom: 0;
        margin: auto;
        cursor: pointer;
        z-index: 10;
        color: #7e7e7e;

        &:first-of-type{
            left: 10px;
        }

        &:last-of-type{
            right: 10px;
        }

        &:hover{
            background: #ccc;
        }
    }

    .wrapper{
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        .slider{
            width: 100vw;
            min-width: 100vw;
            height: 100%;
            display: flex;
            align-items: center;

            .image-container{
                flex: 1;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                img{
                    
                    height: 90%;
                    object-fit: fill;
                    object-position: center;
                }
            }

            .info{
                height: 100%;
                flex: 1;
                padding: 50px;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: space-evenly;
                color: #2c2b2b;

                h1{
                    font-size: 40px;
                }

                p{
                    margin: 30px 0px;
                    font-size: 20px;
                    font-weight: 500;
                    letter-spacing: 3px;
                }

                button{
                    font-size: 18px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    border: none;
                    color: #fff;
                    background: #06729c;
                    padding: 10px;
            
                    &:hover{
                        color: #06729c;
                        background: #fff;
                        border: 1px solid #06729c;
                    }
                }
            }
        }
    }
`

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
<Container className="slider">
    <div className="arrow"  onClick={() => handleClick("left")}>
        <ArrowLeftOutlined />
    </div>

   <div className="wrapper" style={{
    transform: `translateX(${slideIndex * -100}vw)`
   }}>
    <div className="slider">
        <div className="image-container">
            <img src={Html} alt="" />
        </div>
        <div className="info">
            <h1>HTML</h1>
            <p>
                 Relax and play platform games like famous Nokia snake game right in your browser.
            </p>
            <button>Explore</button>
        </div>
    </div>

    <div className="slider">
        <div className="image-container">
            <img src={Js} alt="" />
        </div>
        <div className="info">
            <h1>JAVASCRIPT</h1>
            <p>
               A free full-featured online code editor for HTML, CSS and JAVASCRIPT.
            </p>
            <button className='button'>Visit Now</button>
        </div>
    </div>

    <div className="slider">
        <div className="image-container">
            <img src={Python} alt="" />
        </div>
        <div className="info">
            <h1>PYTHON</h1>
            <p>
                Stream and  enjoy playing video content only on bigplay.
            </p>
            <button>Visit Now</button>
        </div>
    </div>

    <div className="slider">
        <div className="image-container">
            <img src={Java} alt="" />
        </div>
        <div className="info">
            <h1>JAVA</h1>
            <p>
                Learn to develop high quality UI experience on android apps with java.

            </p>
            <button className='button'>Visit Now</button>
        </div>
    </div>
   </div>
    <div className="arrow" onClick={() => handleClick("right")}>
        <ArrowRightOutlined />
    </div>
</Container>
  )
}
