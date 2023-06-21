'use client'

import { useGetProductsByIdQuery } from "@/src/redux/services/productApi";
import styles from './detail.module.css';
import Link from "next/link";
import React, { useContext } from 'react';
import { Store } from "@/src/utils/Store";
import { useRouter } from "next/navigation";


export default function Detail({ params }) {

  const {state, dispatch} = useContext(Store);

  const { detail } = params;
  const {data,error, isLoading, isFetching} = useGetProductsByIdQuery({ id: detail });
  if(isLoading || isFetching) return <p>Loading...</p>
  if(error) return <p>Ha habido un error, vuelve a intentarlo más tarde</p>

  console.log('DATO: ', data);

  const router = useRouter()

  const addToCartHandler = () => {
    const existItem = state.cart.cartItems.find(index => index.id === data.id);
    const quantity = existItem ? existItem.quantity + 1 : 1;

    if(data.stock < quantity) {
      alert('Lo sentimos, no hay stock de este producto');
      return;
    }

    dispatch({type: 'CARD_ADD_ITEM', payload:{ ...data, quantity }})
    router.push('/cart');
  }


  return (
    <div className={styles.countForm}>

      <div className={styles.CountAll}>

        <Link href={'/home'} style={{ textDecoration: "none", color: "inherit" }} >
          <div className={styles.btnAtras}>Atrás</div>
        </Link>

        <div className={styles.CountImg}>
        
          <div className={styles.btn2}>
            <img className={styles.btnImagen} src={data.imagen} alt="" />
          </div>
        
        </div>

      </div>
    

    <div className={styles.CountDes}>

      <div className={styles.btn}>
        <h2 className={styles.btnTitulo}>{data.titulo}</h2>
      </div>

      <div className={styles.btn}>
        <h2 className={styles.btnPrecio}> Precio: ${data.precio}</h2>
      </div>
      
      <div className={styles.btn}>
        <h2 className={styles.btnCategoria}>Categoria: {data.categoria}</h2>
      </div>
      
      <div className={styles.btn}>
        <h2 className={styles.btnDescripcion}>{data.descripcion}</h2>
      </div>
      
      
      {/* <div>
        <h2 className={styles.btn} > cantidadVenta: {data.cantidadVenta}</h2>
      </div> */}

      <p>{data.stock > 0 ? "In stock":"Unavailable"}</p>  

      <button className="btn btn-primary mt-2" disabled={data.stock === 0} onClick={addToCartHandler}>Agregar al carrito</button>

    </div>

    </div>
  );
}

/*
antidadVenta
: 
4
categoria
: 
"Procesadores"
descripcion
: 
"El procesador Intel Core i9-11900K es el buque insignia de la undécima generación de procesadores Intel Core. Tiene 8 núcleos y 16 hilos, con una frecuencia base de 3.5 GHz que puede llegar hasta los 5.3 GHz con Turbo Boost. Es compatible con la plataforma LGA1200 y ofrece un rendimiento sobresaliente para juegos y creación de contenido."
id
: 
5
imagen
: 
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgGfQ0ORNQl1cWy4ALB1joTR5uF-Ift-jUHg&usqp=CAU"
precio
: 
"$99999"
titulo
:
*/
