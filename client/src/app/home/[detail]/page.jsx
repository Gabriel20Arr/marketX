'use client';

import { useGetProductsByIdQuery } from '@/src/redux/services/productApi';
import styles from './detail.module.css';
import Link from 'next/link';
import React, { useContext } from 'react';
import { Store } from '@/src/utils/Store';
import { useRouter } from 'next/navigation';

export default function Detail({ params }) {
	const { state, dispatch } = useContext(Store);

	const { detail } = params;
	const { data, error, isLoading, isFetching } = useGetProductsByIdQuery({
		id: detail,
	});
	if (isLoading || isFetching) return <p>Loading...</p>;
	if (error) return <p>Ha habido un error, vuelve a intentarlo más tarde</p>;

	const usuarioJSON = localStorage.getItem('usuario');
	const usuario = JSON.parse(usuarioJSON);

	const router = useRouter();

	const addToCartHandler = () => {
		const existItem = state.cart.cartItems.find((item) => item.id === data.id);
		const quantity = existItem ? existItem.quantity + 1 : 1;

		if (data.stock < quantity) {
			alert('Lo sentimos, no hay stock de este producto');
			return;
		}

		dispatch({
			type: 'CART_ADD_ITEM',
			payload: { ...data, quantity, usuario: usuario._id },
		});
		router.push('/cart');
	};

	return (
		<>
			<Link href='/home' className={styles.link}>
				Volver
			</Link>
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
						<p className={styles.category}>Categoría: {data.categoria}</p>
						<p className={styles.stock}>Stock: {data.stock}</p>
						<button
							className={styles.addButton}
							disabled={data.stock === 0}
							onClick={addToCartHandler}
						>
							Agregar al carrito
						</button>
					</div>
				</div>
				<div className={styles.descriptionTitle}>Descripcion</div>
				<div className={styles.description}>
					<p>{data.descripcion}</p>
				</div>
			</div>
		</>
	);
}
