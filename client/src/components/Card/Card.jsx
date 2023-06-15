import React from 'react'

export default function Card({item}) {
  return (
    <div>
        <article>
            <h2>{item.titulo}</h2>
            <h2>{item.precio}</h2>
            <img src={item.imagen} alt="" />

          </article>
    </div>
  )
}
