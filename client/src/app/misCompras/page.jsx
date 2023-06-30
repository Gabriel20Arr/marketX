'use client';

import React, { useEffect, useState } from 'react';
import styles from './misCompras.module.css';
import { useGetVentasQuery } from '../../redux/services/ventasApi';
import Link from 'next/link';
import Loading from '@/src/components/Loaders/Loaders';

function Page() {
	const { data, refetch, isLoading } = useGetVentasQuery(null);

	const [ventas, setVentas] = useState([]);
	const [usuario, setUsuario] = useState({});

	
	useEffect(() => {
		const fetchData = async () => {
			await refetch();
		};
		
		fetchData();
	}, [refetch]);
	
	useEffect(() => {
		if (data) {
			setVentas(data.result);
			
			if (typeof window !== 'undefined') {
				const usuarioJSON = localStorage.getItem('usuario');
				const parsedUsuario = JSON.parse(usuarioJSON);
				setUsuario(parsedUsuario);
			}
		}
	}, [data]);
	
	if (isLoading) {
		return <Loading />;
	}
	
	const misCompras = Array.isArray(ventas)
	? ventas.filter((venta) => venta.comprador.correo === usuario?.correo)
	: [];
	
	return (
		<div>
			<Link href='/home' className={styles.link}>
				Volver
			</Link>
			<h1>Mis Compras</h1>
			<div className={styles.addButtonContainer}></div>
			<table className={styles.userTable}>
				<thead>
					<tr>
						{/* <th>TITULO</th> */}
						<th>EMAIL VENDEDOR</th>
						<th>PRECIO</th>
						<th>FECHA</th>
						<th>ESTADO</th>
					</tr>
				</thead>
				<tbody>
					{misCompras.map((venta, index) => (
						<tr key={index}>
							{/* <td>{venta.titulo}</td> */}
							<td>{venta.vendedor.correo}</td>
							<td>{venta.monto}</td>
							<td>{new Date(venta.fecha).toLocaleDateString('es-ES')}</td>
							<td>{venta.despachado ? 'Despachado' : 'Envio Pendiente'}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default Page;