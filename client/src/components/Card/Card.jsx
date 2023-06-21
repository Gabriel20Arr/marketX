import { useRouter } from "next/navigation";
import style from "./Card.module.css";
import Link from "next/link";

export default function Card({item}) {
  const router = useRouter();
  const handlerDetail = ()=>{
    (item.id || item._id)?router.push(`/home/${item.id || item._id}`):console.log('no');
  }
  return (  
    <div className={style.cont}>
        {(item.id || item._id)?
        <article>
            <div className={style.contT}>
              <h2 className={style.name} >{item.titulo}</h2>
            </div>            

            <div className={style.Countimg}>
              <img className={style.img} src={item.imagen} alt={item.titulo} />
            </div>
            
            <div className={style.Countprecio}>
              <h2 className={style.precio}> ${item.precio}</h2>
            </div>

            <h3 className={style.detalle} onClick={()=>handlerDetail()}>Mostrar más</h3>

            {/* <Link>
              <button>
                
              </button>
            </Link> */}

        </article>:null}
    </div>
  )
}
