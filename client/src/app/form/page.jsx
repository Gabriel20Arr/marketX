'use client';

import { useState } from 'react';
import validation from './validation';
import axios from 'axios';
import Link from 'next/link';
import Style from './Form.module.css';
import Image from 'next/image';
import logo from '../../images/MarketX-newlogo.png';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import back from '../../images/back.png';
import { useRouter } from "next/navigation";

export default function CrearProducto() {
	var usuario = 0;
	if (typeof window !== 'undefined') {
		// Código que accede a localStorage aquí
		const usuarioJSON = localStorage.getItem('usuario');
		usuario = JSON.parse(usuarioJSON);
	}
	const router = useRouter();

	const [form, setForm] = useState({
		titulo: '',
		categoria: '',
		imagen: '',
		descripcion: '',
		precio: '',
		cantidadVenta: '0',
		usuario: usuario._id,
		categorias: [usuario.correo],
		stock: 0,
	});

	const [errors, setErrors] = useState({
		titulo: '',
		categoria: '',
		imagen: '',
		descripcion: '',
		precio: '',
		cantidadVenta: '',
		stock: '',
	});

	// const [imagesUploadedList, setImagesUploadedList] = useState([]);

	// const cld = new Cloudinary({
	//   cloud: {
	// 	cloud_name: "dmtzjtgy8", //Your cloud name
	// 	upload_preset: "marketx" //Create an unsigned upload preset and update this
	//   }
	// });

	// const onImageUploadHandler = (publicId) => {
	//   setImagesUploadedList((prevState) => [...prevState, publicId]);
	// };

	const changeHandler = (event) => {
		const property = event.target.name;
		const value = event.target.value;

		if (event.target.name === 'imagen') {
			setForm({ ...form, imagen: event.target.files[0] }); // Actualiza el estado de la imagen con el archivo seleccionado
		} else {
			setForm({ ...form, [property]: value });
		}
		setErrors(validation({ ...form, [property]: value }));
	};

	const submitHandler = async (event) => {
		event.preventDefault();
		if (usuario.correo === "invitado@gmail.com") {
			Swal.fire({
				title: 'Debes estar registrado e iniciar sesión para poder publicar productos',
				showDenyButton: true,
				showCancelButton: true,
				confirmButtonText: 'Registrarse',
				denyButtonText: `Iniciar Sesión`,
			  }).then((result) => {
				if (result.isConfirmed) {
				  router.push('/registrarse');
				} else if (result.isDenied) {
				  router.push('/login');
				}
			  });
			  return
		}
		try {
			const formData = new FormData();

			formData.append('titulo', form.titulo);
			formData.append('categoria', form.categoria);
			formData.append('imagen', form.imagen);
			formData.append('descripcion', form.descripcion);
			formData.append('precio', form.precio);
			formData.append('cantidadVenta', form.cantidadVenta);
			formData.append('usuario', form.usuario);
			formData.append('categorias', form.categorias);
			formData.append('stock', form.stock);

			const resul = await axios.post(
				'https://marketx-production.up.railway.app/Producto/crearProductos',
				formData,
				{
					headers: {
						'Content-Type': 'multipart/form-data', // Establece el tipo de contenido como 'multipart/form-data'
					},
				}
			);

			setForm({
				titulo: '',
				categoria: '',
				imagen: '',
				descripcion: '',
				precio: '',
				cantidadVenta: '',
				usuario: usuario._id,
				categorias: [usuario.nombre],
				stock: 0,
			});
			if (resul.status === 201) {
				Swal.fire({
					position: 'center',
					icon: 'success',
					title: 'Producto Creado Correctamente',
					showConfirmButton: false,
					timer: 1500,
				});
			} else {
				Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: 'Algo salio Mal!',
				});
			}
		} catch (error) {
			console.log(error);
		}
	};
	const goBack = () => {
		router.back();
	  };

	return (
		<div className={Style.container}>
			<div className={Style.image}>
				<div className={Style.sobreLogo}>
					<h2 className={Style.Publicidad}>
						Publica tus componentes nuevos o usados.
					</h2>
					<h1 className={Style.Publicidad2}>
						La evolucion tecnologica esta llegando, no te quedes atras !!!
					</h1>
					<div className={Style.lineal}></div>
				</div>
			</div>
			<div>
				<Image
					onClick={goBack}
					className={Style.back}
					src={back}
					alt='atras'
				/>
				<div className='bg-white d-flex aling-items-center justify-content-center w-100 '>
					<div className={Style.form}>
						<h2 className='mb-3 mt-3 text-center'>
							Publica ahora, que esperas !!
						</h2>
						<h3 className='mb-4 mt-3 text-center'>
							Completa los siguientes datos para publicar
						</h3>
						<form onSubmit={submitHandler}>
							{/* <div>
								<label htmlFor=''>Título: </label>
								<input
									type='text'
									name='titulo'
									//className={}
									value={form.titulo}
									onChange={changeHandler}
								/>
								{}
							</div> */}
							<div className='mb-2'>
								<label className='form-label' htmlFor=''>
									Titulo:
								</label>
								<input
									className='form-control'
									type='text'
									name='titulo'
									onChange={changeHandler}
									value={form.titulo}
								/>
								{errors.titulo && (
									<span className={Style.errors}>{errors.titulo}</span>
								)}
							</div>
							<div className='mb-2'>
								<label htmlFor='categoria'>Categoría:</label>
								<select
									name='categoria'
									className='form-control'
									value={form.categoria}
									onChange={changeHandler}
								>
									<option value=''>Seleccionar categoría</option>
									<option value='Placas de Video'>Placas de Video</option>
									<option value='Motherboard'>Motherboard</option>
									<option value='Procesadores'>Procesadores</option>
								</select>
								{errors.categoria && (
									<span className={Style.errors}>{errors.categoria}</span>
								)}
							</div>
							<div className='mb-2'>
								<label htmlFor='file'>Imagen: </label>

								{/* <CloudinaryWidget
							cloud_name={cld.cloudinaryConfig.cloud.cloud_name}
							upload_preset={cld.cloudinaryConfig.cloud.upload_preset}
							onImageUpload={(publicId) => onImageUploadHandler(publicId)}
						/> */}

								<input
									accept='image/*'
									className='form-control'
									type='file'
									name='imagen'
									onChange={changeHandler}
								/>
								{errors.imagen && (
									<span className={Style.errors}>{errors.imagen}</span>
								)}
							</div>
							<div className='mb-2'>
								<label htmlFor=''>Precio (AR$): </label>
								<input
									type='text'
									name='precio'
									className='form-control'
									value={form.precio}
									onChange={changeHandler}
								/>
								{errors.precio && (
									<span className={Style.errors}>{errors.precio}</span>
								)}
							</div>

							<div className='mb-2'>
								<label htmlFor=''>Stock: </label>
								<input
									type='number'
									name='stock'
									className='form-control'
									value={form.stock}
									onChange={changeHandler}
								/>
								{errors.precio && (
									<span className={Style.errors}>{errors.precio}</span>
								)}
							</div>

							<div className='mb-2'>
								<label htmlFor=''>Desripcion: </label>
								<textarea
									name='descripcion'
									className='form-control'
									id=''
									cols='60'
									rows='10'
									value={form.descripcion}
									onChange={changeHandler}
								></textarea>
								{errors.descripcion && (
									<p className={Style.errors}>{errors.descripcion}</p>
								)}
							</div>
							<button
								type='submit'
								className='btn btn-success btn-block'
								disabled={
									errors.titulo ||
									errors.categoria ||
									errors.imagen ||
									errors.precio ||
									errors.descripcion
								}
							>
								PUBLICAR
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}