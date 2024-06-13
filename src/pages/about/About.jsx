import React from 'react';
import { Facebook, GitHub, Instagram, LinkedIn, Reddit, Telegram, Twitter, YouTube} from '@mui/icons-material';
import './About.css';
import { Link } from 'react-router-dom';

export const About = () => {
  return (
    <div className='page about'>
        <h1>LEARN WITH CODESPHERE</h1>
        <p>
            The world is expanding digitally and with every aspect of our lives becoming digital,
            the demand for computer experts is skyrocketing each day. Therefore,
            having knowledge of programming languages has become crucial for every IT professional.
            In fact, programming languages sit at the epicentre of this ever-growing field of Computer Science.
            If you are a beginner in programming, learning a new language or a new framework is essential.
        </p>
        <h2>FAQ</h2>
        <h3>People ask for:</h3>
        <div className='faqs'>
            <div className='faq'>
                <input type="radio" name="accordion" id="first" ></input>
                <label htmlFor="first">Mobile</label>
                <p>
                       Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
                       Voluptate corporis nulla illum cumque inventore sint maxime error incidunt accusantium nisi. 
                       Possimus velit impedit eius voluptatum rerum vel ab itaque iste.
                </p>
            </div>
        </div>
        <h2>Connect with us</h2>
        <div className='social'>
            <Link to='#' target='_blank' title='facebook'><Facebook/></Link>
            <Link to='#' target='_blank' title='twitter'><Twitter /></Link>
            <Link to='#' target='_blank' title='instagram'><Instagram /></Link>
            <Link to='#' target='_blank' title='linkedin'><LinkedIn /></Link>
            <Link to='#' target='_blank' title='youtube'><YouTube /></Link>
            <Link to='#' target='_blank' title='github'><GitHub /></Link>
            <Link to='#' target='_blank' title='reddit'><Reddit /></Link>
            <Link to='#' target='_blank' title='telegram'><Telegram /></Link>
        </div>
    </div>
  )
}
