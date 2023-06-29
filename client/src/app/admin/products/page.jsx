'use client';

import React, { useEffect } from 'react';
import { useGetProductsUsersQuery } from '../../../redux/services/productApi';
import styles from './products.module.css';
import Link from 'next/link';
import axios from 'axios';

const ProductList = () => {
	const { data, refetch } = useGetProductsUsersQuery(null);

	const products = data?.flatMap(user => (
		user.productos
	))

	const banear = async (_id) => {
		 await axios.put(`https://marketx-production.up.railway.app/producto/actualizar`, {_id, accion: false})
		 refetch();
	}

	const desbanear = async (_id) => {
		 await axios.put(`https://marketx-production.up.railway.app/producto/actualizar`, {_id, accion: true})
		 refetch();
	}
	

  	const handleDeleteProduct = async (id) => {
		const confirme = window.confirm("Estas seguro de eliminar este producto?")
		if(confirme) {
			try {
				await axios.delete(`https://marketx-production.up.railway.app/producto/eliminar/${id}`)
				refetch();
			} catch (error) {
				console.log(error);
			}
		} 
  	};

	useEffect(() => {
		refetch();
	}, [refetch]);
	

	return (
		<div>
			<Link href='/admin' className={styles.link}>
				Volver
			</Link>
			<div>
				<h1>Lista de Productos</h1>
			</div>
			<div className={styles.addButtonContainer}></div>
			<table className={styles.userTable}>
				<thead>
					<tr>
						<th>TITULO</th>
						<th>CATEGORIA</th>
						<th>PRECIO</th>
						<th>STOCK</th>
						<th>USUARIO</th>
						<th>ACCION</th>
						<th>ACCIONES</th>
					</tr>
				</thead>
				<tbody>
					{products?.map((prod) => {
						return (
							<tr key={prod._id}>
								<td>{prod.titulo}</td>
								<td>{prod.categoria}</td>
								<td>{prod.precio}</td>
								<td>{prod.stock}</td>
								<td>{prod.categorias[0]}</td>
								<td>{prod.accion}</td>
								<td>
									<button onClick={() => handleDeleteProduct(prod._id)}>
										Eliminar
									</button>

									{(prod.accion === false) ?
									<button onClick={() => desbanear(prod._id)}>
										Desbanear
									</button>
										:
									<button onClick={() => banear(prod._id)}>
										Banear
									</button>}
								</td>
							</tr>
						);
						})
					}
				</tbody>
			</table>
		</div>
	);
};

export default ProductList;
