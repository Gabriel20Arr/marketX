'use client';
import React, { useEffect, useState } from 'react';
import styles from './misVentas.module.css';
import { useGetVentasQuery } from '../../redux/services/ventasApi';
import Link from 'next/link';
import { enviarNotificacionPorCorreo } from '../../hooks/enviarCorreo.js';
import axios from 'axios';
import Loading from '@/src/components/Loaders/Loaders';

function Page() {
	const { data, refetch, isLoading } = useGetVentasQuery(null);

	const [ventas, setVentas] = useState([]);
	const [usuario, setUsuario] = useState({});
	const [editedVenta, setEditedVenta] = useState({
		despachado: "",
	});

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

	const misVentas = Array.isArray(ventas)
		? ventas.filter((venta) => venta.vendedor.correo === usuario?.correo)
		: [];

	const marcarComoDespachado = async (ventaId) => {
		const confirmacion = window.confirm(
			'¿Estás seguro de marcar esta venta como despachada?'
		);
		if (confirmacion) {
			const ventaToEdit = misVentas.find((venta) => venta._id === ventaId);
			const updatedVenta = { ...ventaToEdit, despachado: true };

			await axios.put(
				`https://marketx-production.up.railway.app/ventas/actualizar`,
				updatedVenta
			);

			const { comprador } = ventaToEdit;
			console.log("COMPRADOR: ", comprador);
			
			const correo = comprador.correo;
			console.log("CORREO: ", correo);

			const asunto = 'Producto despachado';
			const mensaje = 'Su producto ha sido despachado.';
			await enviarNotificacionPorCorreo(correo, asunto, mensaje);
			
			refetch();
		}
	};

	// console.log("VENTAS: ", ventas);
	// console.log("USUARIOS: ", usuario);

	return (
		<div className={styles.container}>

			<div className={styles.Clink}>
				<Link href='/home' className={styles.link}>
					Volver
				</Link>
			</div>

			<div className={styles.contenedorTitulo}>
				<h1 className={styles.titulo}>Lista de Ventas</h1>
			</div>

			<table className={styles.userTable}>
				<thead>
					<tr className={styles.tituloTabla}>
						{/* <th>PRODUCTO</th>
						<th>CANTIDAD</th> */}
						<th>EMAIL COMPRADOR</th>
						<th>PRECIO</th>
						<th>FECHA</th>
						<th>DIRECCIÓN</th>
						<th>PROVINCIA</th>
						<th>CÓDIGO POSTAL</th>
						<th>TELÉFONO</th>
						<th>ESTADO</th>
					</tr>
				</thead>
				<tbody>
					{misVentas.map((venta, index) => (
						<tr
							key={index}
							className={venta.despachado ? styles.despachadoRow : ''}
						>
							{/* <td>{venta.titulo}</td>
							<td>{venta.cantidad}</td> */}
							<td>{venta.comprador.correo}</td>
							<td>{venta.monto}</td>
							<td>{new Date(venta.fecha).toLocaleDateString('es-ES')}</td>
							<td>{venta.comprador.direccion}</td>
							<td>{venta.comprador.provincia}</td>
							<td>{venta.comprador.codigo_postal}</td>
							<td>{venta.comprador.telefono}</td>
							<td>
								{venta.despachado ? (
									'Despachado'
								) : (
									<button
										className={styles.despacharButton}
										onClick={() => marcarComoDespachado(venta._id)}
									>
										Despachar
									</button>
								)}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default Page;