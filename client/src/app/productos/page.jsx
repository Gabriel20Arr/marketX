'use client'

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setSortOrder } from "../../redux/features/sortSlice";
import { useSession } from "next-auth/react";
import Paginacion from "../../components/Paginacion/Paginacion";
import Loading from "../../components/Loaders/Loaders";
import style from './Productos.module.css';

export default function Productos() {
  const dispatch = useDispatch();
  const { data: session, status } = useSession();
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleSortOrder = (order) => {
    if (order === "restore") {
      setSelectedCategory("");
    } else {
      dispatch(setSortOrder(order));
    }
    setCurrentPage(0);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    setCurrentPage(0);
  };

  if (status === "loading") {
    return <Loading />;
  }

  return (
    <div>
      <div className={style.contenedorFiltros}>
        <select
          className={style.orfilbtn}
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <option value="">Todas las categorías</option>
          <option value="Placas de Video">Placas de video</option>
          <option value="Procesadores">Procesadores</option>
          <option value="Motherboard">Motherboards</option>
        </select>

        <button
          className={style.orfilbtn}
          onClick={() => handleSortOrder("price")}
        >
          MENOR A MAYOR PRECIO
        </button>
        <button
          className={style.orfilbtn}
          onClick={() => handleSortOrder("price-reverse")}
        >
          MAYOR A MENOR PRECIO
        </button>
        <button
            className={style.orfilbtn}
            onClick={() => handleSortOrder("mejor valorado")}
          >
            MAYOR A MENOR REPUTACION
          </button>
          <button
            className={style.orfilbtn}
            onClick={() => handleSortOrder("peor valorado")}
          >
            MENOR A MAYOR REPUTACION
          </button>

        <button
          className={style.orfilbtn}
          onClick={() => handleSortOrder("restore")}
        >
          RESTORE
        </button>
      </div>

      <Paginacion
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        selectedCategory={selectedCategory}
      />
    </div>
  );
}
