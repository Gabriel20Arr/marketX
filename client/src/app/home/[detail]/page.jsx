'use client';

import { useGetProductsByIdQuery } from '@/src/redux/services/productApi';
import styles from './detail.module.css';
<<<<<<< HEAD
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


  return (
    <div className={styles.countForm}>
=======
import Link from 'next/link';

export default function Detail({ params }) {
	const { detail } = params;
	const { data, error, isLoading, isFetching } = useGetProductsByIdQuery({
		id: detail,
	});
>>>>>>> ed050be13c08f11e6782020d757f2ccf97fedec8

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
			</div>

<<<<<<< HEAD
      <div className={styles.btn}>
        <h2 className={styles.btnPrecio}> Precio: ${data.precio}</h2>
      </div>

      <div className={styles.btn}>
        <h2 className={styles.btnPrecio}> Stock: {data.stock}</h2>
      </div>
      
      <div className={styles.btn}>
        <h2 className={styles.btnCategoria}>Categoria: {data.categoria}</h2>
      </div>
      
      <div className={styles.btn}>
        <h2 className={styles.btnDescripcion}>{data.descripcion}</h2>
      </div>  
      
      {/* <div>
        <h2 className={styles.btn} > cantidadVenta: {data.cantidadVenta}</h2>
      </div> */}

      <p>{data.stock > 0 ? "In stock":"Unavailable"}</p>  

      <button className="btn btn-primary mt-2" disabled={data.stock === 0} onClick={addToCartHandler}>Agregar al carrito</button>

    </div>

    </div>
  );
=======
			<div className={styles.description}>
				<p>Descripción:</p>
				<p>{data.descripcion}</p>
			</div>
		</div>
	);
>>>>>>> ed050be13c08f11e6782020d757f2ccf97fedec8
}
