'use client';

import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
	useGetProductsQuery,
} from '@/src/redux/services/productApi';
import ReactPaginate from 'react-paginate';
import style from './Paginacion.module.css';
import Cards from '../Cards/Cards';

const productos = [];

const Paginacion = ({ currentPage, setCurrentPage, selectedCategory }) => {
	const sortOrder = useSelector((state) => state.sort.sortOrder);

	const sortProducts = (products) => {
		let sortedProducts = [...products]?.map(p=>{
            const {puntuaciones} = p;
            var valor;
            if (puntuaciones.length==0) {
                valor=0;
            }else{
                const total = puntuaciones.reduce((accumulator, currentValue) => {
                    return accumulator + Number(currentValue.puntuacion);
                  }, 0);
                valor = total / puntuaciones.length;
            }
            return {...p, puntuaciones:valor};
        });

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
		}else if (sortOrder === 'mejor valorado') {
            return sortedProducts
                .slice()
                .sort((a, b) => parseFloat(b.puntuaciones) - parseFloat(a.puntuaciones));
        }else if (sortOrder === 'peor valorado') {
            return sortedProducts
                .slice()
                .sort((a, b) => parseFloat(a.puntuaciones) - parseFloat(b.puntuaciones));
        }

		return sortedProducts;
	};

	const { data, error, isLoading, isFetching, refetch } =
		useGetProductsQuery(selectedCategory);
	const apiProductos = data || [];
	const items = [...apiProductos, ...productos];


	useEffect(() => {
		refetch();
	}, [refetch]);

	if (isLoading || isFetching) return <p>Loading...</p>;
	if (error) return <p>Ha habido un error, vuelve a intentarlo más tarde</p>;

	const handlePageChange = ({ selected }) => {
		setCurrentPage(selected);
		window.scrollTo(0, 0);
	};

	const sortedProducts = sortProducts(items);
	const itemsPerPage = 9;
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
