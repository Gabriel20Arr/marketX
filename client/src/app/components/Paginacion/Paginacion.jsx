"use client"

import ReactPaginate from "react-paginate";
import style from "./Paginacion.module.css" 
import { useState } from "react"
import { useParams } from "react-router-dom";

const  Paginacion = ({items}) => {

  const { pageNumber } = useParams(); 
  const [ currentPage, setCurrentPage ] = useState(pageNumber ? pageNumber - 1 : 0);
  const itemsPerPage = 10;
  
  // Calcula la sección de elementos para mostrar en la pagina actual.
  const offset = currentPage * itemsPerPage;


  const handlePageChange  = ({ selected  }) => {
    setCurrentPage( selected );
    window.scrollTo(0, 0); // Muestra la parte superior de la pagina 
  }

  const currentItems = items.slice(offset, offset + itemsPerPage);

  // calcula el número de páginas en función de la cantidad de elementos
  const pageCount = Math.ceil(items.length / itemsPerPage);

  return (
    <>
      <div>
        {currentItems.map((item) => (
          <article key={item.id}>
            <h2>{item.title}</h2>
            <p>{item.body}</p>
          </article>
        ))}
      </div>
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

export default Paginacion