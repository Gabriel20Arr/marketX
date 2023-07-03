'use client';

import React, { useEffect, useContext } from "react";
import style from "./home.module.css";
import { useSession } from "next-auth/react";
import Loader from "../../components/Loaders/Loaders";
import { useGetUsersQuery } from "@/src/redux/services/userApi";
import axios from "axios";
import Carousel from "../../components/Carousel/Carousel";
import CardsCarousel from '../../components/CardsCarousel/CardsCarousel'
import Link from "next/link";
import { Store } from "@/src/utils/Store";
// require('dotenv').config();

// const {  LOCALHOST } = process.env;

export default function HomePage() {
	const { data: session, status } = useSession();

  const objeto = {
    nombre: session?.user.name,
    correo: session?.user.email,
    contraseña: "65564521-44654894sda",
  };

  const { data, refetch } = useGetUsersQuery(null);
  const { dispatch } = useContext(Store);

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
        .post("https://marketx-production.up.railway.app/Usuario", objeto)
        .then((result) => {
          const guardadoString = JSON.stringify(url);
          localStorage.setItem("usuario", guardadoString);
          return result.data;
        })
        .catch((error) => error);
    }
  };
  let usuario= 0;
  if (typeof window !== 'undefined') {
    // Código que accede a localStorage aquí
    const usuarioJSON = localStorage.getItem("usuario") ?? null;
    usuario = JSON.parse(usuarioJSON);
  }

  if (!usuario) {
    google();
  }

	if (status === 'loading') {
		return <Loader />;
	}

  return (
    <div className={style.contenedor1}>
      <div className={style.contenedor2}>

      <div className={style.contenedor3}>
          <h3 className={style.publiRecientes} style={{marginLeft: '20px', fontWeight: 'bold'}}>Marcas recomendadas</h3>
        </div>

        <Carousel/>
        
        <div className={style.contenedor3}>
          <h3 className={style.publiRecientes} style={{marginLeft: '20px', fontWeight: 'bold'}}>Publicaciones recientes</h3>
          <Link href={'/productos'}>
            <button type="button" class="btn btn-primary btn-lg" style={{marginRight: '20px', marginBottom: '10px', fontSize: '25px'}}> Ver todos los productos</button>
          </Link>
        </div>

          <CardsCarousel/>
        </div>
      </div>
  )

}
