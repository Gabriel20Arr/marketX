import { useRouter } from "next/navigation";
import style from "./Card.module.css";
import axios from "axios";

export default function Card({item}) {
  const router = useRouter();
  
  const handlerDetail = ()=>{
    (item.id || item._id)?router.push(`/home/${item.id || item._id}`):console.log('no');
  }
  
  // console.log('PRODUCTOS :', item);
  
  return (
    <div className={style.cont}>
        {(item.id || item._id)?<article>
            <div className={style.contT}>
              <h2 className={style.name} >{item.titulo}</h2>
            </div>            

            <div className={style.Countimg}>
              <img className={style.img} src={item.imagen} alt={item.titulo} />
            </div>
            
            <div className={style.Countprecio}>
              <h2 className={style.precio}> ${item.precio}</h2>
            </div>

            <div className={style.Countprecio}>
              <h2 className={style.precio}> Stock: {item.stock}</h2>
            </div>

            <div className={style.Pagar}>
                <button  
                    className={style.btnPagar} 
                    id="buttomPagar"
                    onClick={() => {
                      axios.post("http://localhost:3001/pago/createorder", item, {
                        headers: {
                          'Content-Type': 'application/json'
                        }
                      })
                      .then((res) => window.location.href = res.data.init_point)
                    }}
                >
                  Comprar
                </button>
            </div>    

            <h3 className={style.detalle} onClick={()=>handlerDetail()}>Mostrar mas</h3>

        </article>:null}
    </div>
  )
}
