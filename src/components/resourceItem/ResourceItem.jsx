import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import './ResourceItem.css';

export default function ResourceItem({ourData}) {

    const [data, setData] = useState('');

    useEffect(() => {
        setData(ourData)

    }, [data])
  return (
    <div className='resource-item'>
         <h2>{data && data.name}</h2>
        <div className='container'>
        {data && data.items.map(item => {
            return <div className='wrapper' key={item.name}>
                <h3>{item.name}</h3>
                <div className='item'>
                    {item.res.map(res => {
                        return <Link to={res.url} target='_blank' key={res.id} className='link'>{res.name}</Link>
                    })}
                </div>
            </div>
        })}
        </div>
    </div>
  )
}
