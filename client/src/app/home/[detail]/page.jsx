'use client';

import { useGetProductsByIdQuery } from '@/src/redux/services/productApi';
import styles from './detail.module.css';
import Link from "next/link";
import React, { useContext } from 'react';
import { Store } from "@/src/utils/Store";
import { useRouter } from "next/navigation";


export default function Detail({ params }) {
  const {state, dispatch} =useContext(Store);

  const { detail } = params;
  const {data, error, isLoading, isFetching} = useGetProductsByIdQuery({ id: detail });
  if(isLoading || isFetching) return <p>Loading...</p>
  if(error) return <p>Ha habido un error, vuelve a intentarlo más tarde</p>
  
  console.log(state, 'data', data);
  const usuarioJSON = localStorage.getItem('usuario');
	const usuario = JSON.parse(usuarioJSON);

  const router = useRouter()

  const addToCartHandler = () => {
    const existItem = state.cart.cartItems.find(index => index._id === data._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;

    if(data.stock < quantity) {
      alert('Lo sentimos, no hay stock de este producto');
      return;
    }

    dispatch({type: 'CARD_ADD_ITEM', payload:{ ...data, quantity, usuario:usuario._id }})
    // router.push('/cart');
  }

	if (isLoading || isFetching) return <p>Loading...</p>;
	if (error) return <p>Ha habido un error, vuelve a intentarlo más tarde</p>;

  return (
          <>
          <div className={styles.link}>
            <Link href='/home' className={styles.link2}>
              Volver
            </Link>
          </div>

            <div className={styles.container}>
              <div className={styles.innerContainer}>
                <div className={styles.imageContainer}>
                  <img
                    src={data.imagen}
                    alt='error cargando la imagen'
                    className={styles.image}
                  />
                </div>

                <div className={styles.detailsContainer}>
                  <p className={styles.title}>{data.titulo}</p>
                  <p className={styles.price}>${data.precio}</p>
                  <p className={styles.stock}>Stock: {data.stock}</p>
                  <p className={styles.category}>
                    <div className={styles.categoryC}>
                      Categoría: 
                    </div>
                    {data.categoria}
                  </p>

                  <div className={styles.descriptionTitle}>
                    Descripcion
                    <div>
                      <p className={styles.description}>{data.descripcion}</p>
                    </div>
                  </div>

                  <div className={styles.contenedorCart}>
                    <button
                      className={styles.addButton}
                      disabled={data.stock === 0}
                      onClick={addToCartHandler}
                    >
                      Agregar al carrito
                    </button>
                  </div>
                  
                </div>
              </div>

            </div>
          </>
  );
}
