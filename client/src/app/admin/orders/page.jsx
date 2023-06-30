'use client';

import React, { useEffect } from 'react';
import styles from './orders.module.css';
import { useGetVentasQuery } from '../../../redux/services/ventasApi';
import Link from 'next/link';

function Page() {
	const { data, refetch } = useGetVentasQuery(null);

	const ventas = data?.result;

	useEffect(() => {
		refetch();
	}, [refetch]);

	return (
		<div>
			<Link href='/admin' className={styles.link}>
				Volver
			</Link>
			<h1>Lista de Ventas</h1>
			<div className={styles.addButtonContainer}></div>
			<table className={styles.userTable}>
				<thead>
					<tr>
						<th>EMAIL VENDEDOR</th>
						<th>EMAIL COMPRADOR</th>
						<th>PRECIO</th>
						<th>FECHA</th>
					</tr>
				</thead>
				{ventas?.map((venta, index) => (
					<tr key={index}>
						<td>{venta.vendedor.correo}</td>
						<td>{venta.comprador.correo}</td>
						<td>{venta.monto}</td>
						<td>{new Date(venta.fecha).toLocaleDateString('es-ES')}</td>
					</tr>
				))}
			</table>
		</div>
	);
}

export default Page;
