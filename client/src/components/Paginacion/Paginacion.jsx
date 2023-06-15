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
	const dispatch = useDispatch();
	const sortOrder = useSelector((state) => state.sort.sortOrder);
	const { pageNumber } = useParams();
	const [currentPage, setCurrentPage] = useState(
		pageNumber ? pageNumber - 1 : 0
	);
	const itemsPerPage = 10;
	const offset = currentPage * itemsPerPage;

	const { data, error, isLoading, isFetching } = useGetProductsQuery(null);
	const items = data ? data.concat(productos) : productos;

	if (isLoading || isFetching) return <p>Loading...</p>;
	if (error) return <p>Ha habido un error, vuelve a intentarlo más tarde</p>;

	const sortProducts = (products) => {
		if (sortOrder === 'title') {
			return products.sort((a, b) => {
				if (a.titulo?.localeCompare && b.titulo?.localeCompare) {
					return a.titulo.localeCompare(b.titulo);
				}
				return 0;
			});
		} else if (sortOrder === 'price') {
			return products.sort(
				(a, b) => parseFloat(a.precio) - parseFloat(b.precio)
			);
		} else if (sortOrder === 'price-reverse') {
			return products.sort(
				(a, b) => parseFloat(b.precio) - parseFloat(a.precio)
			);
		} else if (sortOrder === 'quantitySold') {
			return products.sort(
				(a, b) => parseInt(a.cantidadVenta) - parseInt(b.cantidadVenta)
			);
		} else if (sortOrder === 'quantitySold-reverse') {
			return products.sort(
				(a, b) => parseInt(b.cantidadVenta) - parseInt(a.cantidadVenta)
			);
		} else {
			return products;
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
				<button onClick={() => dispatch(setSortOrder('title'))}>
					Sort by Title
				</button>
				<button onClick={() => dispatch(setSortOrder('price'))}>
					Sort by Price
				</button>
				<button onClick={() => dispatch(setSortOrder('quantitySold'))}>
					Sort by Quantity Sold
				</button>
			</div>
			<Cards currentItems={currentItems} />
			<div>
				{currentItems.map((item) => (
					<Card item={item} key={item.id} />
				))}
			</div>
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
