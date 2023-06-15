import React from 'react'
import Card from '../Card/Card';

export default function Cards({currentItems}) {
  return (
    <div>
        <div>
        {currentItems.map((item, index) => (
            <div>
            <Card item={item} key={index}/>
            </div>
        ))}
      </div>
    </div>

  )
}
