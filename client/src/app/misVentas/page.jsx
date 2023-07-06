'use client';
import React, { useEffect, useState } from 'react';
import styles from './misVentas.module.css';
import { useGetVentasQuery } from '../../redux/services/ventasApi';
import { enviarNotificacionPorCorreo } from '../../hooks/enviarCorreo.js';
import axios from 'axios';
import Loading from '@/src/components/Loaders/Loaders';
import { useRouter } from 'next/navigation';
import "sweetalert2/src/sweetalert2.scss";
import Swal from "sweetalert2/dist/sweetalert2.js";


function Page() {
	const { data, refetch, isLoading } = useGetVentasQuery(null);

	const [ventas, setVentas] = useState([]);
	const [usuario, setUsuario] = useState({});
	const [editedVenta, setEditedVenta] = useState({
		despachado: '',
	});

	const router = useRouter();

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
		Swal.fire({
			title: '¿Estás seguro?',
			text: "No se podrá revertir esta acción!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			cancelButtonText: 'Cancelar',
			confirmButtonText: 'Si, marcar como despachado!'
		  }).then(async(result) => {
			if (result.isConfirmed) {

				const ventaToEdit = misVentas.find((venta) => venta._id === ventaId);
				const updatedVenta = { ...ventaToEdit, despachado: true };
	  
				await axios.put(
					"https://marketx-production.up.railway.app/ventas/actualizar",
					updatedVenta
				);
	  
				const { comprador } = ventaToEdit;
	  
				const correo = comprador.correo;
				const asunto = 'Producto despachado';
				const mensaje = 'Su producto ha sido despachado.';
				await enviarNotificacionPorCorreo(correo, asunto, mensaje);
	  
				refetch();
			}
		  })
	};

	const goBack = () => {
		router.back();
	  };

	return (
		<div className={styles.container}>
			<div>
			<button onClick={goBack} className={styles.link}>Volver</button>
			</div>

			<div className={styles.contenedorTitulo}>
				<h1 className={styles.titulo}>Lista de Ventas</h1>
			</div>

			<div className={styles.tabla}>
			<table className={styles.userTable}>
				<thead>
					<tr className={styles.tituloTabla}>
						<th>PRODUCTO</th>
						<th>CANTIDAD</th>
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
							<td>{venta.producto	}</td>
							<td>{venta.cantidad}</td>
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

		</div>
	);
}

export default Page;