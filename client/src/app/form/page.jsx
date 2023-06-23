'use client';

import { useState } from 'react';
import validation from './validation';
import axios from 'axios';
import Link from 'next/link';
import style from './Form.module.css';
import Image from "next/image";
import logo from "../../images/MarketX-newlogo.png";

export default function CrearProducto() {
	const usuarioJSON = localStorage.getItem('usuario');
	const usuario = JSON.parse(usuarioJSON);
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

	const changeHandler = (event) => {
		const property = event.target.name;
		const value = event.target.value;

		setForm({ ...form, [property]: value });
		setErrors(validation({ ...form, [property]: value }));
	};

	const submitHandler = async (event) => {
		event.preventDefault();
		try {
			await axios.post('http://localhost:3001/Producto/crearProductos', form);
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
			alert('Creacion Exitosa ');
		} catch (error) {
			alert('Esta actividad ya esta creada');
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
						<label htmlFor=''>Imagen: </label>
						<input
							type='text'
							name='imagen'
							className={style.formInput}
							value={form.imagen}
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
				<Image src={logo} className={style.img} />
			</div>
			
		</div>
		</div>
	);
}
