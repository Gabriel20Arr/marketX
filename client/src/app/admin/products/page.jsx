'use client';

import React, { useState, useEffect } from 'react';
import { useGetProductsQuery } from '../../../redux/services/productApi';
import styles from './products.module.css';
import Link from 'next/link';

const ProductList = () => {
	const [products, setproducts] = useState([]);

	const { data, refetch } = useGetProductsQuery(null);
	useEffect(() => {
		refetch();
	}, []);
	console.log(data);

	return (
		<div>
			<Link href='/admin' className={styles.link}>
				Volver
			</Link>
			<h1>Lista de Productos</h1>
			<div className={styles.addButtonContainer}></div>
			<table className={styles.userTable}>
				<thead>
					<tr>
						<th>TITULO</th>
						<th>CATEGORIA</th>
						<th>PRECIO</th>
						<th>CANTIDAD DE VENTAS</th>
						<th>STOCK</th>
						<th>USUARIO</th>
						<th>ACCIONES</th>
					</tr>
				</thead>
				<tbody>
					{data?.map((prod) => {
						console.log(prod.usuario); // Agregamos el console.log para mostrar el contenido de prod.usuario
						return (
							<tr key={prod._id}>
								<td>{prod.titulo}</td>
								<td>{prod.categoria}</td>
								<td>{prod.precio}</td>
								<td>{prod.cantidadVenta}</td>
								<td>{prod.stock}</td>
								<td>{prod.usuario}</td>{' '}
								{/* Reemplaza 'nombre' con la propiedad real en tu modelo de usuario */}
								<td>
									<button onClick={() => editProduct(user._id)}>Editar</button>
									<button onClick={() => deleteProduct(user._id)}>
										Eliminar
									</button>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

export default ProductList;
