'use client';

import { useState } from 'react';
import validation from './validation';
import axios from 'axios';
import style from './Form.module.css';

export default function CrearProducto() {
	const [form, setForm] = useState({
		titulo: '',
		categoria: '',
		imagen: '',
		descripcion: '',
		precio: '',
		cantidadVenta: '0',
	});

	const [errors, setErrors] = useState({
		titulo: '',
		categoria: '',
		imagen: '',
		descripcion: '',
		precio: '',
		cantidadVenta: '',
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
			});
			alert('Creacion Exitosa ');
		} catch (error) {
			alert('Esta actividad ya esta creada');
		}
	};

	return (
		<form onSubmit={submitHandler}>
			<div>
				<h3>Completa los siguientes datos para publicar un producto: </h3>
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
	);
}
