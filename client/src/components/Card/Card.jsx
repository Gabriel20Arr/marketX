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
            <h2 className={style.name} onClick={()=>handlerDetail()}>{item.titulo}</h2>
            
            <img className={style.img} src={item.imagen} alt="" />
            
            <h2>{item.precio}</h2>

        </article>:null}
    </div>
  )
}
