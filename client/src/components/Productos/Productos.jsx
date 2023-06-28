'use client'

import { useRouter } from "next/navigation"
import { useGetProductsQuery } from "@/src/redux/services/productApi";
import Image from 'next/image'

export default function Productos(){
  const router = useRouter();
  const {data, error, isLoading, isFetching} = useGetProductsQuery(null);

  if(isLoading || isFetching) return <p>Loading...</p>
  if(error) return <p>Ha habido un error, vuelve a intentarlo más tarde</p>

    return(
        <ul>
        {
          data?.map((producto) => (
            <li key={producto.id} onClick={() => {
              router.push(`/productos/${producto.id}`)
              }}>
              <div>
                <h5>#{producto.id}</h5>
                <h2>{producto.title}</h2>
                <h3>{producto.precio}</h3>
              </div>
              <Image src={producto.imagen} alt={producto.id} />
            </li>
          ))
        }
      </ul>

    )
}