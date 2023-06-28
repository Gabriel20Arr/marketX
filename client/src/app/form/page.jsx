'use client';

import { useState } from 'react';
import validation from './validation';
import axios from 'axios';
import Link from 'next/link';
import style from './Form.module.css';
import Image from "next/image";
import logo from "../../images/MarketX-newlogo.png";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
// import CloudinaryWidget from '../../components/cloudinaryWidget/CloudinaryWidget';

export default function CrearProducto() {
	var usuario = 0
    if (typeof window !== 'undefined') {
        // Código que accede a localStorage aquí
        const usuarioJSON = localStorage.getItem('usuario');
        usuario = JSON.parse(usuarioJSON);
      }

	const [form, setForm] = useState({
		titulo: '',
		categoria: '',
		imagen: '',
		descripcion: '',
		precio: '',
		cantidadVenta: '0',
		usuario:usuario._id,
		categorias:[usuario.correo],
		stock: 0
	});

	const [errors, setErrors] = useState({
		titulo: '',
		categoria: '',
		imagen: '',
		descripcion: '',
		precio: '',
		cantidadVenta: '',
		stock: ''
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
		try {
			const formData = new FormData()

			formData.append('titulo', form.titulo);
			formData.append('categoria', form.categoria);
			formData.append('imagen', form.imagen);
			formData.append('descripcion', form.descripcion);
			formData.append('precio', form.precio);
			formData.append('cantidadVenta', form.cantidadVenta);
			formData.append('usuario', form.usuario);
			formData.append('categorias', form.categorias);
			formData.append('stock', form.stock);

			const resul = await axios.post('https://marketx-production.up.railway.app/Producto/crearProductos', formData, {
				headers: {
					'Content-Type': 'multipart/form-data' // Establece el tipo de contenido como 'multipart/form-data'
				}
			});

			setForm({
				titulo: '',
				categoria: '',
				imagen: '',
				descripcion: '',
				precio: '',
				cantidadVenta: '',
				usuario:usuario._id,
				categorias:[usuario.nombre],
				stock: 0
			});
			if (resul.status === 201) {
				Swal.fire({
				  position: "center",
				  icon: "success",
				  title: "Producto Creado Correctamente",
				  showConfirmButton: false,
				  timer: 1500,
				});
			  } else {
				Swal.fire({
				  icon: "error",
				  title: "Oops...",
				  text: "Algo salio Mal!",
				});
			  }
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className = {style.cont}>
			<Link href={'/home'} className={style.atras}>Atrás</Link>
		<div className={style.container}>
			<form className={style.containerForm} onSubmit={submitHandler}>
				<div>
					
					<h3 className={style.title}>
						Completa los siguientes datos 
					</h3>
					
					<div>
						<label htmlFor=''>Título: </label>
						<input
							type='text'
							name='titulo'
							className={style.formInput}
							value={form.titulo}
							onChange={changeHandler}
						/>
						{errors.titulo && (
							<span className={style.errors}>{errors.titulo}</span>
						)}
					</div>
					<div>
						<label htmlFor='categoria'>Categoría:</label>
						<select
							name='categoria'
							className={style.formInput}
							value={form.categoria}
							onChange={changeHandler}
						>
							<option value=''>Seleccionar categoría</option>
							<option value='Placas de Video'>Placas de Video</option>
							<option value='Motherboard'>Motherboard</option>
							<option value='Procesadores'>Procesadores</option>
						</select>
						{errors.categoria && (
							<span className={style.errors}>{errors.categoria}</span>
						)}
					</div>
					<div>
						<label htmlFor='file'>Imagen: </label>

						{/* <CloudinaryWidget
							cloud_name={cld.cloudinaryConfig.cloud.cloud_name}
							upload_preset={cld.cloudinaryConfig.cloud.upload_preset}
							onImageUpload={(publicId) => onImageUploadHandler(publicId)}
						/> */}

						<input
							accept='image/*'
							type='file'
							name='imagen'
							className={style.formInput}
							onChange={changeHandler}
						/>
						{errors.imagen && (
							<span className={style.errors}>{errors.imagen}</span>
						)}
					</div>
					<div>
						<label htmlFor=''>Precio (AR$): </label>
						<input
							type='text'
							name='precio'
							className={style.formInput}
							value={form.precio}
							onChange={changeHandler}
						/>
						{errors.precio && (
							<span className={style.errors}>{errors.precio}</span>
						)}
					</div>
					
					<div>
						<label htmlFor=''>Stock: </label>
						<input
							type='number'
							name='stock'
							className={style.formInput}
							value={form.stock}
							onChange={changeHandler}
						/>
						{errors.precio && (
							<span className={style.errors}>{errors.precio}</span>
						)}
					</div>

					<div>
						<p>Descripción del producto: </p>
						<textarea
							name='descripcion'
							className={style.formInput}
							id=''
							cols='60'
							rows='10'
							value={form.descripcion}
							onChange={changeHandler}
						></textarea>
						{errors.descripcion && (
							<p className={style.errors}>{errors.descripcion}</p>
						)}
					</div>
					<button
						type='submit'
						className={style.submitButton}
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
				</div>
			</form>

			<div className={style.imgContainer}>
				<h1 className={style.text}>
					Publique y venda un producto de forma gratuita
				</h1>
				<Image src={logo} className={style.img}  alt='logo'/>
			</div>
			
		</div>

		</div>
	);
}
