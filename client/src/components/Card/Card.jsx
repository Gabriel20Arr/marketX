import { useRouter } from "next/navigation";

export default function Card({item}) {
  const router = useRouter();
  const handlerDetail = ()=>{
    item.id?router.push(`/home/${item.id}`):console.log('no');
  }
  return (
    <div>
        {item.id?<article>
            <h2 onClick={()=>handlerDetail()}>{item.titulo}</h2>
            <h2>{item.precio}</h2>
            <img src={item.imagen} alt="" />

        </article>:null}
    </div>
  )
}
