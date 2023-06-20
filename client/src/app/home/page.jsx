'use client';

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSortOrder } from '../../redux/features/sortSlice';
import Paginacion from '../../components/Paginacion/Paginacion';
import style from './home.module.css';

export default function HomePage() {
	const dispatch = useDispatch();
	const [currentPage, setCurrentPage] = useState(0);
	const [selectedCategory, setSelectedCategory] = useState('');

	const handleSortOrder = (order) => {
		if (order === 'restore') {
			setSelectedCategory('');
		} else {
			dispatch(setSortOrder(order));
		}
		setCurrentPage(0);
	};

	const handleCategoryChange = (event) => {
		setSelectedCategory(event.target.value);
		setCurrentPage(0);
	};

	const usuarioJSON = localStorage.getItem('usuario');
	const usuario = JSON.parse(usuarioJSON);
	console.log(usuario);

	return (
		<div>
			<div>
				<select className={style.orfilbtn} value={selectedCategory} onChange={handleCategoryChange}>
					<option value=''>Todas las categorías</option>
					<option value='Placas de video'>Placas de video</option>
					<option value='Procesadores'>Procesadores</option>
					<option value='Motherboard'>Motherboards</option>
				</select>
				
				<button className={style.orfilbtn} onClick={() => handleSortOrder('title')}>A-Z</button>
				<button className={style.orfilbtn} onClick={() => handleSortOrder('reverse')}>Z-A</button>
				<button className={style.orfilbtn} onClick={() => handleSortOrder('price')}>
					MENOR A MAYOR PRECIO
				</button>
				<button className={style.orfilbtn} onClick={() => handleSortOrder('price-reverse')}>
					MAYOR A MENOR PRECIO
				</button>
				{/* <button onClick={() => handleSortOrder('quantitySold')}>
					MÁS VENDIDO
				</button> */}
				{/* <button className={style.orfilbtn} onClick={() => handleSortOrder('restore')}>RESTORE</button> */}
			</div>
			<Paginacion
				currentPage={currentPage}
				setCurrentPage={setCurrentPage}
				selectedCategory={selectedCategory}
			/>
		</div>
	);
}
