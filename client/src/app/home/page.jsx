"use client";

import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setSortOrder } from "../../redux/features/sortSlice";
import Paginacion from "../../components/Paginacion/Paginacion";
import style from "./home.module.css";
import { useSession } from "next-auth/react";
import Loader from "../../components/Loaders/Loaders";
import { useGetUsersQuery } from "@/src/redux/services/userApi";
import axios from "axios";

export default function HomePage() {
  const { data: session, status } = useSession();

  const objeto = {
    nombre: session?.user.name,
    correo: session?.user.email,
    contraseña: "65564521-44654894sda",
  };
  console.log(objeto);

  const { data, refetch } = useGetUsersQuery(null);

  useEffect(() => {
    refetch();
  }, []);

  const existente = data?.find((user) => user.correo === session?.user.email);

  const google = async () => {
    if (existente) {
      const guardadoString = JSON.stringify(existente);
      localStorage.setItem("usuario", guardadoString);
    } else {
      const url = await axios
        .post("http://localhost:3001/usuario", objeto)
        .then((result) => {
          const guardadoString = JSON.stringify(url);
          localStorage.setItem("usuario", guardadoString);
          return result.data;
        })
        .catch((error) => error);
    }
  };

  const usuarioJSON = localStorage.getItem("usuario");
  const usuario = JSON.parse(usuarioJSON);

  if (!usuario) {
    google();
  }

  console.log(usuario);

  const dispatch = useDispatch();
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
    return <Loader />;
  }
  return (
    <div>
      <div>
        <select
          className={style.orfilbtn}
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <option value="">Todas las categorías</option>
          <option value="Placas de video">Placas de video</option>
          <option value="Procesadores">Procesadores</option>
          <option value="Motherboard">Motherboards</option>
        </select>

        <button
          className={style.orfilbtn}
          onClick={() => handleSortOrder("title")}
        >
          A-Z
        </button>
        <button
          className={style.orfilbtn}
          onClick={() => handleSortOrder("reverse")}
        >
          Z-A
        </button>
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
