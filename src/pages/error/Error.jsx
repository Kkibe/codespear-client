import React from 'react'
import './Error.css';

export function Error() {
  return (
    <div className='page error'>
        <h1>404 Error</h1>
        <h2>PAGE NOT FOUND</h2>
        <button onClick={() => {
          window.history.back();
        }} className='button'>Go Back &raquo;</button>
    </div>
  )
}
