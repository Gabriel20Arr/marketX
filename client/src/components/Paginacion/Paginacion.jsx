'use client';

import React, {useEffect} from 'react';
import { useSelector } from 'react-redux';
import {
	useGetProductsQuery,
	useGetProductsByIdQuery,
} from '@/src/redux/services/productApi';
import ReactPaginate from 'react-paginate';
import style from './Paginacion.module.css';
import Cards from '../Cards/Cards';

import productos from '../../../../client/src/api/api';

const Paginacion = ({ currentPage, setCurrentPage, selectedCategory }) => {
	const sortOrder = useSelector((state) => state.sort.sortOrder);

	const sortProducts = (products) => {
		let sortedProducts = [...products];

		if (selectedCategory !== '') {
			sortedProducts = sortedProducts.filter(
				(product) => product.categoria === selectedCategory
			);
		}

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

	// console.log('dataa',data);
	
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

};

export default Paginacion;
