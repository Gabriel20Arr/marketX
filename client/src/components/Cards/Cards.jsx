import React from 'react'
import Card from '../Card/Card';
import style from "./Cards.module.css";

export default function Cards({currentItems}) {
  return (
    <div>
        <div className={style.contt}>
        {currentItems?.map((item, index) => (
            <div>
            <Card item={item} key={index}/>
            </div>
        ))}
      </div>
    </div>

  )
}
