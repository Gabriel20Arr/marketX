'use client'

import { useGetProductsByIdQuery } from "@/src/redux/services/productApi";
import styles from './detail.module.css';
import Link from "next/link";
// import axios from "axios";

// import productos from "@/src/api/api";

export default function Detail({ params }) {
  const { detail } = params;
  const {data, error, isLoading, isFetching}=useGetProductsByIdQuery({ id: detail });
  
  if (isLoading || isFetching) return <p>Loading...</p>;
  if (error) return <p>Ha habido un error, vuelve a intentarlo más tarde</p>;
 
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
        <h2 className={styles.btnPrecio}> Stock: {data.stock}</h2>
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

    </div>

    </div>
  );
}
