'use client'

import { useGetProductsByIdQuery } from "@/src/redux/services/productApi";

export default function Detail({ params }) {
  const { detail } = params;
  const {data,error, isLoading, isFetching}=useGetProductsByIdQuery({ id: detail });
  if(isLoading || isFetching) return <p>Loading...</p>
  if(error) return <p>Ha habido un error, vuelve a intentarlo más tarde</p>
 
  return (
    <div>
      <h2>{data.titulo}</h2>
      <h2>{data.precio}</h2>
      <h2>{data.categoria}</h2>
      <h2>{data.descripcion}</h2>
      <img src={data.imagen} alt="" />
      <h2>{data.cantidadVenta}</h2>

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
