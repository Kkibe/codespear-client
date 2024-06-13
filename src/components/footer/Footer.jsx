import { ArrowUpward, Facebook, Instagram, LinkedIn, Pinterest, Twitter, YouTube } from '@mui/icons-material';
import React from 'react';
import { Link, NavLink } from "react-router-dom";
import './Footer.css';


export const Footer = (props) => {
    const handleScroll = () => {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth'
      })}
  return (
    <footer>
        <div className='wrapper'>
            <h2 className='light'>Quick Links</h2>
            <hr />
            <NavLink to='/' className={'link'} title='Front-end Web development'>Front-end Development</NavLink>
            <NavLink to='/register' className={'link'} title='Get Started'> Get Started</NavLink>
            <NavLink to='/about' className={'link'} title='Success Stories'>Success Stories</NavLink>
            <NavLink to='/blogs' className={'link'} title='Read Blogs'>Read Blogs</NavLink>
        </div>
        <div className='wrapper'>
            <h2 className='light'>Codespear</h2>
            <hr />
            <NavLink to='/courses' className={'link'} reloadDocument title='Course'>Courses</NavLink>
            <NavLink to='/about' className={'link'} reloadDocument title='About US'>About Us</NavLink>
            <NavLink to='/contact' className={'link'} reloadDocument title='Get In Touch'>Contact Us</NavLink>
            <NavLink to='/resources' className={'link'} title='Resources'>Explore Resources</NavLink>
        </div>
        <div className='wrapper'>
            <h2 className='light'>Contact us</h2>
            <hr />
            <div className='social'>
                <Link to='/'><Facebook/></Link>
                <Link to='/'><Twitter/></Link>
                <Link to='/'><Instagram/></Link>
                <Link to='/'><Pinterest/></Link>
                <Link to='/'><LinkedIn/></Link>
                <Link to='/'><YouTube/></Link>
            </div>
            <button onClick={handleScroll} className='button to-top' title='scroll to top'>
                <ArrowUpward/>
            </button>
        </div>
        
        <div className='footer-bottom'>
            <p>&copy;2022</p>
            <p><NavLink className='link' to='/' reloadDocument title='Terms & Privacy'>Terms & Privacy</NavLink></p>
            <p><NavLink className='link' to='/about/#faq' reloadDocument title='What People Ask'>FAQ</NavLink></p>
        </div>

    </footer>
  )
}
