





'use client';

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSortOrder } from '../../redux/features/sortSlice';
import Card from '../Card/Card';
import {
	useGetProductsQuery,
	useGetProductsByIdQuery,
} from '@/src/redux/services/productApi';
import ReactPaginate from 'react-paginate';
import style from './Paginacion.module.css';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Cards from '../Cards/Cards';
import { productos } from '../../api/api';

const Paginacion = () => {
	const sortOrder = useSelector((state) => state.sort.sortOrder);
	const dispatch = useDispatch();
	const { pageNumber } = useParams();
	const [currentPage, setCurrentPage] = useState(
		pageNumber ? pageNumber - 1 : 0
	);
	const itemsPerPage = 6;
	const offset = currentPage * itemsPerPage;

	// const paginado1 = ()=>{
	// 	setCurrentPage(1)
	// }

	
	const { data, error, isLoading, isFetching } = useGetProductsQuery(null);
	const apiProductos = data || [];
	const items = [...apiProductos, ...productos];

	if (isLoading || isFetching) return <p>Loading...</p>;
	if (error) return <p>Ha habido un error, vuelve a intentarlo más tarde</p>;

	const sortProducts = (products) => {
		if (sortOrder === 'title') {
		  return products.slice().sort((a, b) => a.titulo.localeCompare(b.titulo));
		} else if (sortOrder === 'price') {
		  return products.slice().sort((a, b) => parseFloat(a.precio) - parseFloat(b.precio));
		} else if (sortOrder === 'price-reverse') {
		  return products.slice().sort((a, b) => parseFloat(b.precio) - parseFloat(a.precio));
		} else if (sortOrder === 'quantitySold') {
		  return products.slice().sort((a, b) => parseInt(a.cantidadVenta) - parseInt(b.cantidadVenta));
		} else if (sortOrder === 'quantitySold-reverse') {
		  return products.slice().sort((a, b) => parseInt(b.cantidadVenta) - parseInt(a.cantidadVenta));
		} else if (sortOrder === 'reverse') {
		  return products.slice().reverse();
		}
	  };


	const handlePageChange = ({ selected }) => {
		setCurrentPage(selected);
		window.scrollTo(0, 0);
	};

	const sortedProducts = sortProducts(items); // Utiliza sortProducts en lugar de sort

	const currentItems = sortedProducts.slice(offset, offset + itemsPerPage);

	const pageCount = Math.ceil(sortedProducts.length / itemsPerPage);

	return (
		<>
			 <div className={style['sort-buttons']}>
                <h3>A-Z</h3>
                <select onChange={() => dispatch(setSortOrder('title'))} onClick={() => dispatch(setCurrentPage(1))}>
                    <option value="default" hidden>Default</option>
                    <option value="ascendente">Ascendente</option>
                </select>
				<h3>Precio</h3>
                <select onChange={() => dispatch(setSortOrder('price'))}>
                    <option value="default" disabled hidden>Default</option>
                    <option value="ascendente">Ascendente</option>
                </select>
				<h3>A-Z</h3>
                <select onChange={() => dispatch(setSortOrder('title'))}>
                    <option value="default">Default</option>
                    <option value="ascendente">Ascendente</option>
                </select>

			{/* <div className={style['sort-buttons']}>
				<button onClick={() => dispatch(setSortOrder('title'))}>
					Sort by Title
				</button> */}
				<button onClick={() => dispatch(setSortOrder('price'))}>
					Sort by Price
				</button>
				<button onClick={() => dispatch(setSortOrder('quantitySold'))}>
					Sort by Quantity Sold
				</button>
				<button onClick={() => dispatch(setSortOrder('reverse'))}>
					Restore
				</button>
			</div>


			<Cards currentItems={currentItems} />
			<ReactPaginate
				pageCount={pageCount}
				onPageChange={handlePageChange}
				containerClassName={style['pagination']}
				pageClassName={style['page-item']}
				pageLinkClassName={style['page-link']}
				previousClassName={
					currentPage === 0 ? style['page-item disabled'] : style['page-item']
				}
				previousLinkClassName={style['page-link']}
				nextClassName={
					currentPage === pageCount - 1
						? style['page-item disabled']
						: style['page-item']
				}
				nextLinkClassName={style['page-link']}
				breakClassName={style['page-item']}
				breakLinkClassName={style['page-link']}
				activeClassName={style['active']}
				disabledClassName={style['disabled']}
				forcePage={currentPage}
				marginPagesDisplayed={2}
				pageRangeDisplayed={2}
				previousLabel={currentPage === 0 ? null : 'Back'}
				nextLabel={currentPage === pageCount - 1 ? null : 'Next'}
			/>
		</>
	);
};

export default Paginacion;
