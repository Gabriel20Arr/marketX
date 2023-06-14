'use client'
import { useRouter } from "next/navigation"

export default function Productos({ productos }){
  const router = useRouter();
  console.log(productos);
    return(
        <ul>
        {
          productos.map((producto) => (
            <li key={producto.id} onClick={() => {
              router.push(`/productos/${producto.id}`)
              }}>
              <div>
                <h5>#{producto.id}</h5>
                <h2>{producto.title}</h2>
                <h3>{producto.price}</h3>
              </div>
              <img src={producto.image} alt={producto.id} />
            </li>
          ))
        }
      </ul>

    )
}