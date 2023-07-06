'use client';

import React, { useEffect } from 'react';
import { useGetProductsUsersQuery } from '../../../redux/services/productApi';
import styles from './products.module.css';
import axios from 'axios';
import { enviarNotificacionPorCorreo } from '@/src/hooks/enviarCorreo';
import "sweetalert2/src/sweetalert2.scss";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { useRouter } from "next/navigation";

const ProductList = () => {
	const { data, refetch } = useGetProductsUsersQuery(null);
	const router = useRouter();
	const products = data?.flatMap(user => (
		user.productos
	))

	const banear = async (_id,correo, producto) => {
		 await axios.put("https://marketx-production.up.railway.app/producto/actualizar", {_id, accion: false})
		 refetch();
		 const asunto = "Notificación de bloqueo de producto en MarketX";
		const mensaje = `Estimado/a  ${correo},\n

		Espero que este mensaje te encuentre bien. Me pongo en contacto contigo para informarte que, lamentablemente, hemos tomado la decisión de bloquear tu producto en nuestra aplicación MarketX.\n
		
		Hemos llegado a esta determinación con el objetivo de garantizar un ambiente seguro y confiable para todos nuestros usuarios. Después de revisar detenidamente tu producto:  " ${producto} " y las acciones relacionadas, hemos identificado que incumple nuestras políticas y normas comunitarias.\n
		
		Como resultado de este bloqueo, tu producto ya no estará disponible para otros usuarios en la aplicación. Queremos recordarte la importancia de cumplir con nuestras políticas y de asegurar que los productos ofrecidos sean apropiados y cumplan con los estándares de calidad establecidos.\n
		
		Si tienes alguna pregunta o deseas discutir esta situación más a fondo, te animo a que te pongas en contacto con nuestro equipo de soporte a través de este correo electrónico. Estaremos dispuestos a escuchar tus inquietudes y a proporcionarte más detalles sobre las razones específicas que llevaron al bloqueo de tu producto.\n
		
		Agradecemos tu comprensión y cooperación en este asunto. Esperamos que puedas revisar y ajustar tu producto según nuestras políticas para poder ofrecerlo nuevamente en la aplicación.\n
		
		Saludos cordiales,\n
		
		MarketX`;
		const correoEnviado = enviarNotificacionPorCorreo(
			correo,
			asunto,
			mensaje
		);
	}

	const desbanear = async (_id, correo, producto) => {
		 await axios.put("https://marketx-production.up.railway.app/producto/actualizar", {_id, accion: true})
		 refetch();
		 const asunto = "Notificación de desbloqueo de producto en MarketX";
    	const mensaje = `Estimado/a ${correo},\n

		Espero que este mensaje te encuentre bien. Me pongo en contacto contigo para informarte que hemos tomado la decisión de desbloquear tu producto: " ${producto} " en nuestra aplicación MarketX.\n
		
		Después de una revisión adicional y considerando tus acciones y comentarios, hemos determinado que tu producto cumple con nuestras políticas y normas comunitarias. Reconocemos y agradecemos tus esfuerzos por ajustarlo según los estándares establecidos.\n
		
		Como resultado de este desbloqueo, tu producto volverá a estar disponible para otros usuarios en la aplicación. Te animamos a seguir manteniendo la calidad y el cumplimiento de nuestras políticas en tus futuros productos.\n
		
		Si tienes alguna pregunta o necesitas asistencia adicional, no dudes en contactar a nuestro equipo de soporte a través de este correo electrónico. Estaremos encantados de ayudarte en cualquier consulta o inquietud que puedas tener.\n
		
		Agradecemos tu comprensión y cooperación durante este proceso. Valoramos tu compromiso con la comunidad de MarketX y esperamos que esta experiencia te motive a seguir ofreciendo productos de calidad en nuestra plataforma.\n
		
		Saludos cordiales,\n
		
		MarketX`;
    	const correoEnviado = enviarNotificacionPorCorreo(
      		correo,
      		asunto,
      		mensaje
    	);
	}

  	const handleDeleteProduct = (id) => {
		Swal.fire({
			title: '¿Estás seguro?',
			text: "No podrás revertirlo!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			cancelButtonText: 'Cancelar',
			confirmButtonText: 'Si, estoy seguro!'
		  }).then( async(result) => {
			if (result.isConfirmed) {
				try {
					await axios.delete(`https://marketx-production.up.railway.app/producto/eliminar/${id}`)
					refetch();
				} catch (error) {
					console.log(error);
				}
			}
		  })
  	};

	useEffect(() => {
		refetch();
	}, [refetch]);

	const goBack = () => {
		router.back();
	  };

	return (
		<div>
			<div >
       			 <button onClick={goBack} className={styles.link}>Volver</button>
      		</div>

			<div className={styles.contenedorTitulo}>
				<h1 className={styles.titulo}>Lista de Productos</h1>
			</div>

			<div className={styles.addButtonContainer}></div>

			<div className={styles.tabla}>
			<table className={styles.userTable}>
				<thead>
					<tr>
						<th>IMAGEN</th>
						<th>TITULO</th>
						<th>CATEGORIA</th>
						<th>PRECIO</th>
						<th>STOCK</th>
						<th>USUARIO</th>
						<th>ACCIONES</th>
					</tr>
				</thead>
				<tbody>
					{products?.map((prod) => {
						return (
							<tr key={prod._id}>
								<td><img src={prod.imagen} alt={prod.titulo} style={{width:"70px"}} /></td>
								<td>{prod.titulo}</td>
								<td>{prod.categoria}</td>
								<td>{prod.precio}</td>
								<td>{prod.stock}</td>
								<td>{prod.categorias[0]}</td>
								<td>
									<button onClick={() => handleDeleteProduct(prod._id,prod.categorias[0])}>
										Eliminar
									</button>

									{(prod.accion === false) ?
									<button onClick={() => desbanear(prod._id,prod.categorias[0], prod.titulo)}>
										Desbloquear
									</button>
										:
									<button onClick={() => banear(prod._id,prod.categorias[0], prod.titulo)}>
										Bloquear
									</button>}
								</td>
							</tr>
						);
						})
					}
				</tbody>
			</table>
			</div>
		</div>
	);
};

export default ProductList;
