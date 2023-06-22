'use client'

import { Store } from '@/src/utils/Store'
import Link from 'next/link';
import React, { useContext } from 'react'
import { Trash3 } from 'react-bootstrap-icons';

export default function Cart() {

  const { state, dispatch } = useContext(Store);
  const { cartItems } = state.cart;

  const usuarioJSON = localStorage.getItem('usuario');
	const usuario = JSON.parse(usuarioJSON);

  const removeCartHandler = (item) => {
    dispatch({type: 'CART_REMOVE_ITEM', payload: item, usuario:usuario._id})
  }

  const updateCartHandler = (item, cantidad) => {
    const quantity = Number(cantidad)
    dispatch({type: 'CARD_ADD_ITEM', payload: {...item, quantity,usuario:usuario._id}})
  }

  return (
    <div>
        <h1 className='mt-5 mb-5 text-center'>Carrito de compras</h1>
        <div className="container">
          {
            cartItems.length === 0 
            ? (
                <div> 
                  El carrito está vacío. <Link href={'/home'}>
                  Haz click para comenzar a comprar
                  </Link> 
                </div>
              ) 
            : (
                <div>
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">Item</th>
                        <th scope="col">Cantidad</th>
                        <th scope="col">Precio</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartItems.map(item => (
                        <tr key={item.id}>
                        <td>
                          <img src={item.imagen} width={70} height={70}/>
                          &nbsp;
                          {item.titulo}
                        </td>
                        <td>
                          <select value={item.quantity} onChange={(event => updateCartHandler(item, event.target.value))}>
                            {
                              [...Array(item.stock).keys()].map(index => (
                                <option key={index+1} value={index+1}>
                                  {index + 1}
                                </option>
                              ))
                            }
                          </select>
                        </td>
                        <td>{item.precio}</td>
                        <td>
                          <button className='btn btn-danger' onClick={() => removeCartHandler(item)}>
                          <Trash3 size={25} />
                          </button>
                        </td>
                      </tr>
                      ))}
                    
                    </tbody>
                  </table>

                  <div>
                    Subtotal: ({cartItems.reduce((a,c) => a + c.quantity, 0)}) : $ {cartItems.reduce((a, c) => a + c.quantity * c.precio, 0)}
                  </div>

                </div>
              )
          }
        </div>
    </div>
  )
}
