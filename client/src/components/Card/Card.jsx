import { useRouter } from "next/navigation";
import style from "./Card.module.css";

export default function Card({item}) {
  const router = useRouter();
  const handlerDetail = ()=>{
    item.id?router.push(`/home/${item.id}`):console.log('no');
  }
  return (
<<<<<<< HEAD
    <div>
        <article>
            <h2>{item.titulo}</h2>
            <h2>${item.precio}</h2>
            <img src={item.imagen} alt="" />
=======
    <div className={style.cont}>
        {item.id?<article>
            <div className={style.contT}>
              <h2 className={style.name} >{item.titulo}</h2>
            </div>            
>>>>>>> f24094d22adacd1c300c5d303a860c7244ecb257

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
