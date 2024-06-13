import React from 'react';
import './Resources.css';
import ResourceItem from '../../components/resourceItem/ResourceItem.jsx';
import {ResourcesData} from '../../resources.js';


export const Resources = () => {
  return (
    <div className='page resources'>
        <div className='wrapper'>
          {ResourcesData.map((data) => {
            return <ResourceItem ourData={data} key={data.id}/>
          })}
        </div>
    </div>
  )
}
