'use client';

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSortOrder } from '../../redux/features/sortSlice';
import Paginacion from '../../components/Paginacion/Paginacion';

export default function HomePage() {
	const dispatch = useDispatch();
	const [currentPage, setCurrentPage] = useState(0);

	const handleSortOrder = (order) => {
		dispatch(setSortOrder(order));
		setCurrentPage(0);
	};

	return (
		<div>
			<h1>ESTA ES LA HOME PAGE</h1>
			<div>
				<button onClick={() => handleSortOrder('title')}>A-Z</button>
				<button onClick={() => handleSortOrder('reverse')}>Z-A</button>
				<button onClick={() => handleSortOrder('price')}>
					MENOR A MAYOR PRECIO
				</button>
				<button onClick={() => handleSortOrder('price-reverse')}>
					MAYOR A MENOR PRECIO
				</button>
				<button onClick={() => handleSortOrder('quantitySold')}>
					MÁS VENDIDO
				</button>
				<button onClick={() => handleSortOrder('reverse')}>RESTORE</button>
			</div>
			<Paginacion currentPage={currentPage} setCurrentPage={setCurrentPage} />
		</div>
	);
}
