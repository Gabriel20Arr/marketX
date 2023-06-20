'use client'

import { useEffect } from "react";
import { useGetProductsByIdQuery } from "@/src/redux/services/productApi";
import styles from './detail.module.css';
import Link from "next/link";
import axios from "axios";

export default function Detail({ params }) {
  const { detail } = params;
  const {data,error, isLoading, isFetching}=useGetProductsByIdQuery({ id: detail });

    useEffect(() => {
    const handleClick = async () => {
      const response = await axios('pago/routerPago/createorder', {
        method: 'POST'
      });

      const data = await response.json();
      console.log(data);
      window.location.href = data.init_point;
    };
    
    // Eliminar el event listener cuando se desmonte el componente
    return () => {
      check.removeEventListener('click', handleClick);
    };
  }, []);

  
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
        <h2 className={styles.btnCategoria}>Categoria: {data.categoria}</h2>
      </div>
      
      <div className={styles.btn}>
        <h2 className={styles.btnDescripcion}>{data.descripcion}</h2>
      </div>

      <div className={styles.Pagar}>
        <button className={styles.btnPagar} id="buttomPagar">Pagar</button>
      </div>      
      
      {/* <div>
        <h2 className={styles.btn} > cantidadVenta: {data.cantidadVenta}</h2>
      </div> */}

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
