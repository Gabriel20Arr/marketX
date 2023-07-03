"use client";

import React, { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import style from "./Card.module.css";
import { usePathname } from "next/navigation";
import { useGetProductsByIdQuery } from "@/src/redux/services/productApi";
import { Store } from "@/src/utils/Store";
import "sweetalert2/src/sweetalert2.scss";
import Swal from "sweetalert2/dist/sweetalert2.js";
import axios from "axios";
import { useGetUserByIdQuery } from "@/src/redux/services/userApi";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";

export default function Card({ item }) {
  const { state, dispatch } = useContext(Store);
  const { rating, setRating } = useState(0);

  const usuarioJSON = localStorage.getItem("usuario");
  const usuario = JSON.parse(usuarioJSON);

  const nose2 = useGetUserByIdQuery({ id: usuario?._id });
  const nose3 = nose2.data?.comprado.map((el) => el.producto);

  const nose4 = nose3?.includes(item.id);

  // console.log(nose4);

  const { data, refetch } = useGetProductsByIdQuery({
    id: item.id,
  });

  const puntuaciones2 = data?.puntuaciones || [];

  const handlerRating = async (e) => {
    const { value } = e.target;

    await axios.put(
      `https://marketx-production.up.railway.app/producto/actualizar`,
      {
        _id: item.id,
        puntuaciones: [
          ...puntuaciones2,
          { usuario: usuario._id, puntuacion: value },
        ],
      }
    );

    refetch();
    // setRating(rating)
  };

  
  const existe = puntuaciones2.map( (elements) => elements.usuario ).includes(usuario?._id)   
  

  const addToCartHandler = () => {
    const existItem = state.cart.cartItems.find(
      (index) => index._id === data?._id
    );
    // console.log(existItem);
    const quantity = existItem ? existItem.quantity + 1 : 1;

    if (data?.stock < quantity) {
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
    // router.push('/cart');
  };

  const router = useRouter();

  const handlerDetail = () => {
    item.id || item._id
      ? router.push(`/home/${item.id || item._id}`)
      : console.log("no");
  };

  const currenPath = usePathname();

  return (
    <div className={style.cont}>
        {/* {(item.id || item._id)? */}
        <article className={style.article}>

            <div className={style.imageContainer}>
              <img alt='img' className={style.img} src={item.imagen}  style={{width:"100%", height:"100%"}} />
            </div>

            <div className={style.contT}>
              <h2 className={style.name} >{item.titulo}</h2>
            </div>            
            
            <div className={style.Countprecio}>

          <div className={style.Countprecio}>
            <div className={style.disponible}>
              <h5 className={style.dis}> Stock: {item.stock}</h5>
            </div>

            <h2 className={style.precio}> ${item.precio}</h2>

            {!existe && nose4 ? (
              <div>
                <Rating
                  name="hover-feedback"
                  value={rating}
                  precision={0.5}
                  onChange={handlerRating}
                  emptyIcon={
                    <StarIcon
                      style={{ opacity: 0.55, color: "white" }}
                      fontSize="inherit"
                    />
                  }
                />
              </div>
            ) : null}
          </div>

            </div>
            <div className={style.contButtons}>
              {(item.accion) ? 
              

                <button class="btn btn-outline-light" style={{fontSize: '20px', fontWeight: 'bold'}} onClick={()=>handlerDetail()}>Mostrar más</button>

                :
              
                <h2 className={style.Cdetalle} style={{color: "white"}}>Baneado</h2>
              }
              
              { (currenPath !== "/misProductos") ? 
                    <div className={style.contenedorCart}>
                      <button
                        class="btn btn-success"
                        disabled={data?.stock === 0}
                        onClick={addToCartHandler}
                        style={{fontSize: '20px', fontWeight: 'bold'}}
                      >
                        Agregar al carrito
                      </button>
                    </div>
                    :
                    null
              }
            </div>

        </article>
      {/* ) : null} */}
    </div>
  )
}
