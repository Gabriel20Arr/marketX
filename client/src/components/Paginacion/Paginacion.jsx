<<<<<<< HEAD






'use client';

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSortOrder } from '../../redux/features/sortSlice';
import Card from '../Card/Card';
=======
'use client';

import React from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
>>>>>>> f24094d22adacd1c300c5d303a860c7244ecb257
import {
	useGetProductsQuery,
	useGetProductsByIdQuery,
} from '@/src/redux/services/productApi';
import ReactPaginate from 'react-paginate';
import style from './Paginacion.module.css';
<<<<<<< HEAD
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
=======
import Cards from '../Cards/Cards';

import productos from '../../../../client/src/api/api';

const Paginacion = ({ currentPage, setCurrentPage, selectedCategory }) => {
	const sortOrder = useSelector((state) => state.sort.sortOrder);

	const sortProducts = (products) => {
		let sortedProducts = [...products];
>>>>>>> f24094d22adacd1c300c5d303a860c7244ecb257

		if (selectedCategory !== '') {
			sortedProducts = sortedProducts.filter(
				(product) => product.categoria === selectedCategory
			);
		}

<<<<<<< HEAD
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
					A-Z
				</button>
				<button onClick={() => dispatch(setSortOrder('reverse'))}>
					Z-A
				</button>
				<button onClick={() => dispatch(setSortOrder('price'))}>
					MENOR A MAYOR PRECIO
				</button>
				<button onClick={() => dispatch(setSortOrder('price-reverse'))}>
					MAYOR A MENOR PRECIO
				</button>
				<button onClick={() => dispatch(setSortOrder('quantitySold'))}>
					MÁS VENDIDO
				</button>
				<button onClick={() => dispatch(setSortOrder('reverse'))}>
					RESTORE
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
=======
		if (sortOrder === 'title') {
			return sortedProducts
				.slice()
				.sort((a, b) => a.titulo.localeCompare(b.titulo));
		} else if (sortOrder === 'price') {
			return sortedProducts
				.slice()
				.sort((a, b) => parseFloat(a.precio) - parseFloat(b.precio));
		} else if (sortOrder === 'price-reverse') {
			return sortedProducts
				.slice()
				.sort((a, b) => parseFloat(b.precio) - parseFloat(a.precio));
		} else if (sortOrder === 'quantitySold') {
			return sortedProducts
				.slice()
				.sort((a, b) => parseInt(a.cantidadVenta) - parseInt(b.cantidadVenta));
		} else if (sortOrder === 'quantitySold-reverse') {
			return sortedProducts
				.slice()
				.sort((a, b) => parseInt(b.cantidadVenta) - parseInt(a.cantidadVenta));
		} else if (sortOrder === 'reverse') {
			return sortedProducts.slice().reverse();
		}

		return sortedProducts;
	};

	const { data, error, isLoading, isFetching, refetch } =
		useGetProductsQuery(selectedCategory);

	const apiProductos = data || [];
	const items = [...apiProductos, ...productos];

	useEffect(() => {
		refetch();
	}, []);

	if (isLoading || isFetching) return <p>Loading...</p>;
	if (error) return <p>Ha habido un error, vuelve a intentarlo más tarde</p>;

	

	const handlePageChange = ({ selected }) => {
		setCurrentPage(selected);
		window.scrollTo(0, 0);
	};

	const sortedProducts = sortProducts(items);
	const itemsPerPage = 12;
	const offset = currentPage * itemsPerPage;
	const currentItems = sortedProducts.slice(offset, offset + itemsPerPage);
	const pageCount = Math.ceil(sortedProducts.length / itemsPerPage);

	return (
		<>
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

>>>>>>> f24094d22adacd1c300c5d303a860c7244ecb257
};

export default Paginacion;
