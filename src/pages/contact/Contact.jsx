import { Email, Phone, Place, Facebook, Twitter, Instagram, GitHub, YouTube, Pinterest } from '@mui/icons-material';
import React from 'react';
import './Contact.css';
import { Link, NavLink } from 'react-router-dom';

export const Contact = () => {
  return (
    <div className='page contact'>
      <h1>Contact</h1>
      <div className='wrapper'>
        <form>
          <input type="text"  placeholder="NAME"  required />
          <input type="email"  placeholder="EMAIL" required />
          <textarea placeholder="MESSAGE" required/>
          <button type="submit" className='button'>SEND TO US</button>
        </form>
        <div className='container'>
          <ul>
            <NavLink title='Location Address'>
              <Place />
              <div>Nairobi, Kenya</div>
            </NavLink>
            <NavLink title='Contact Support'>
              <Phone />
              <div>(212) 555-2368</div>
            </NavLink>
            <NavLink to={'https://'} title='Contact Email'>
              <Email />
              <div>admin@codespear.com</div>
            </NavLink>
          </ul>
          <hr/>
          <div className='social'>
            <Link to='#' target='_blank'><Facebook /></Link>
            <Link to='#' target='_blank'><Twitter /></Link>
            <Link to='#' target='_blank'><Instagram /></Link>
            <Link to='#' target='_blank'><GitHub /></Link>
            <Link to='#' target='_blank'><YouTube /></Link>
            <Link to='#' target='_blank'><Pinterest /></Link>
          </div>
          <hr/>
          <div className='copyright'>&copy; ALL RIGHTS RESERVED</div>
        </div>
      </div>
    </div>
  )
}
