"use client";

import { useGetProductsByIdQuery } from "@/src/redux/services/productApi";
import styles from "./detail.module.css";
import Link from "next/link";
import React, { useContext } from "react";
import { Store } from "@/src/utils/Store";
import Loading from "../../../components/Loaders/Loaders";
import "sweetalert2/src/sweetalert2.scss";
import Swal from "sweetalert2/dist/sweetalert2.js";
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import { useRouter } from "next/navigation";


export default function Detail({ params }) {
  const { state, dispatch } = useContext(Store);

  const { detail } = params;
  const { data, error, isLoading, isFetching } = useGetProductsByIdQuery({
    id: detail,
  });

  const router = useRouter();

  const puntuaciones2 = data?.puntuaciones || [];

  const promedio = puntuaciones2.map( el => +(el.puntuacion) )

  const sum = promedio.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  const average = sum / promedio.length;

  const usuarioJSON = localStorage.getItem("usuario");
  const usuario = JSON.parse(usuarioJSON);

  const addToCartHandler = () => {
    const existItem = state.cart.cartItems.find(
      (index) => index._id === data._id
    );
    const quantity = existItem ? existItem.quantity + 1 : 1;

    if (data.stock < quantity) {
        Swal.fire({
				position: "center",
				icon: "error",
				title: "Lo sentimos, no hay mas stock disponible",
				showConfirmButton: false,
				timer: 1500,
      	});
      return;
    }

    dispatch({
      type: "CARD_ADD_ITEM",
      payload: { ...data, quantity, usuario: usuario._id },
    });
    Swal.fire({
      position: "center",
      icon: "success",
      title: "El producto se ha agregado correctamente",
      showConfirmButton: false,
      timer: 1500,
      });
    // router.push('/cart');
  };

  if (isLoading || isFetching) return <Loading />;
  if (error) return Swal.fire({
      title: "Oops, algo salió mal",
      text: "Intentelo mas tarde",
      icon: "error",
    });

  const goBack = () => {
    router.back();
  };

  return (
    <>
      <div>
         <button onClick={goBack} className={styles.link} >Volver</button>
      </div>

      <div className={styles.container}>
        <div className={styles.innerContainer}>
          <div className={styles.imageContainer}>
            <img
              src={data.imagen}
              alt="error cargando la imagen"
              className={styles.image}
            />
          </div>

          <div className={styles.detailsContainer}>
            <p className={styles.title}>{data.titulo}</p>
            <p className={styles.price}>${data.precio}</p>
            <div className={styles.C2}>
              <p className={styles.stock}>Stock: {data.stock}</p>
              <p className={styles.category}>
                <div className={styles.categoryC}>Categoría:</div>
                {data.categoria}
              </p>
            </div>

              <div className={styles.contenedorRating1}>
                <span className={styles.promedio}>{average? average : 0}</span>
                  <div className={styles.contenedorRating}>
                    <Rating
                      value={average}
                      precision={0.1}
                      emptyIcon={<StarIcon />}
                      readOnly={true}
                    />
                    <span className={styles.calificaciones}> {puntuaciones2.length} calificaciones</span>
                  </div>
              </div>

            <div className={styles.descriptionTitle}>
            <h2>
              Descripcion
            </h2>
              <div className={styles.descriptionTitle2}>
                <p className={styles.description}>{data.descripcion}</p>
              </div>
            </div>

            <div className={styles.contenedorCart}>
              <button
                class="btn btn-success"
                style={{width:'15em'}}
                className={styles.addButton}
                disabled={data.stock === 0}
                onClick={addToCartHandler}
              >
                Agregar al carrito
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}