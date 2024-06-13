import { Send } from '@mui/icons-material';
import React from 'react';
import './Newsletter.css'


export const Newsletter = () => {
  return (
    <div className='newsletter'>
        <h1 className='light'>Subscribe</h1>
        <h3>Don’t miss out on juiciest news! Fill the form below to subscribe to our new feeds.</h3>
        <div className='wrapper'>
          <input type="email" placeholder="example@gmail.com"/>
          <button type='submit' className='button'>
            <Send style={{
              color: '#fff',
              fontSize: '22px',
              transform: 'rotate(-6deg)'
            }}/>
          </button>
          
        </div>
    </div>
  )
}
