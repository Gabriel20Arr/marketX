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

  const usuarioJSON = localStorage.getItem('usuario');
	const usuario = JSON.parse(usuarioJSON);

  const router = useRouter()

  const addToCartHandler = () => {
    const existItem = state.cart.cartItems.find(index => index.id === data.id);
    const quantity = existItem ? existItem.quantity + 1 : 1;

    if(data.stock < quantity) {
      alert('Lo sentimos, no hay stock de este producto');
      return;
    }

    dispatch({type: 'CARD_ADD_ITEM', payload:{ ...data, quantity, usuario:usuario._id }})
    router.push('/cart');
  }

	if (isLoading || isFetching) return <p>Loading...</p>;
	if (error) return <p>Ha habido un error, vuelve a intentarlo más tarde</p>;

  return (
		<div className={styles.container}>
			<div className={styles.backLink}>
				<Link href='/home'>Atrás</Link>
			</div>

			<div className={styles.image}>
				<img src={data.imagen} alt='error cargando la imagen' />
			</div>

			<div className={styles.details}>
				<div>
					<p className={styles.title}>{data.titulo}</p>
				</div>

				<div>
					<p className={styles.price}>Precio: ${data.precio}</p>
				</div>

				<div>
					<p className={styles.category}>Categoría: {data.categoria}</p>
				</div>

        <div className={styles.btn}>
          <h2 className={styles.btnPrecio}> Stock: {data.stock}</h2>
        </div>
        
        <div className={styles.btn}>
          <h2 className={styles.description}>{data.descripcion}</h2>
        </div>  
      
			</div>
      
      {/* <div>
        <h2 className={styles.btn} > cantidadVenta: {data.cantidadVenta}</h2>
      </div> */}
 

      <button className="btn btn-primary mt-2" disabled={data.stock === 0} onClick={addToCartHandler}>Agregar al carrito</button>

    </div>

  );
}
