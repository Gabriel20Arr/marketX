"use client"

import { useGetProductsByIdQuery, useGetProductsQuery } from "@/src/redux/services/productApi";
import ReactPaginate from "react-paginate";
import style from "./Paginacion.module.css" 
import { useState } from "react"
import { useParams } from "react-router-dom";
import Cards from '../Cards/Cards';
import {productos} from '../../api/api';

const Paginacion = () => {

  const { pageNumber } = useParams(); 
  const [ currentPage, setCurrentPage ] = useState(pageNumber ? pageNumber - 1 : 0);
  const itemsPerPage = 10;
  const offset = currentPage * itemsPerPage;

  let {data, error, isLoading, isFetching} = useGetProductsQuery(null);
  
  if(isLoading || isFetching) return <p>Loading...</p>
  if(error) return <p>Ha habido un error, vuelve a intentarlo más tarde</p>
  const items = data?.concat(productos);

  const handlePageChange  = ({ selected  }) => {
    setCurrentPage( selected );
    window.scrollTo(0, 0);
  }

  const currentItems = items?.slice(offset, offset + itemsPerPage);

  const pageCount = Math.ceil(items?.length / itemsPerPage);

  return (
    <>
      <Cards currentItems={currentItems}/>
      <ReactPaginate
        pageCount={pageCount}
        onPageChange={handlePageChange}
        containerClassName={style['pagination']}
        pageClassName={style['page-item']}
        pageLinkClassName={style['page-link']}
        previousClassName={currentPage === 0 ? style['page-item disabled'] : style['page-item']}
        previousLinkClassName={style['page-link']}
        nextClassName={currentPage === pageCount - 1 ? style['page-item disabled'] : style['page-item']}
        nextLinkClassName={style['page-link']}
        breakClassName={style['page-item']}
        breakLinkClassName={style['page-link']}
        activeClassName={style['active']}
        disabledClassName={style['disabled']}
        forcePage={currentPage}
        marginPagesDisplayed={2}
        pageRangeDisplayed={2}
        previousLabel={currentPage === 0 ? null : "Back"}
        nextLabel={currentPage === pageCount - 1 ? null : "Next"}
      />
    </>
  );
};

export default Paginacion;