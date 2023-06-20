import { useRouter } from "next/navigation";
import style from "./Card.module.css";

export default function Card({item}) {
  const router = useRouter();
  const handlerDetail = ()=>{
    item.id?router.push(`/home/${item.id}`):console.log('no');
  }
  return (
    <div className={style.cont}>
        {item.id?<article>
            <div className={style.contT}>
              <h2 className={style.name} >{item.titulo}</h2>
            </div>            

            <div className={style.Countimg}>
              <img className={style.img} src={item.imagen} alt="" />
            </div>
            
            <div className={style.Countprecio}>
              <h2 className={style.precio}> ${item.precio}</h2>
            </div>

            <h3 className={style.detalle} onClick={()=>handlerDetail()}>Mostrar mas</h3>
        </article>:null}
    </div>
  )
}
