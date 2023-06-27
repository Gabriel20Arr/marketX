'use client'

import image from '../images/MarketX-newlogo.png';
import Link from 'next/link';
import Style from './landing.module.css';
import  Image from 'next/image'
import { useRouter } from 'next/navigation';
import BtnGoogle from "../components/BtnGoogle/BtnGoogle";

export default function Landing() {
  const router = useRouter();
  const home = (e)=>{
    e.preventDefault()
    router.push('/home')
  }
  return (
    <div className={Style.formAll}>

    <h1 className={Style.formT}>Bienvenido a MarketX</h1>

    <div className={Style.container}>

      <div className={Style.image}>
        <Image src={image} width={350}  alt="" className={Style.imgMarketX}/>
      </div>

      <div className={Style.form}>

        <Link style={{ textDecoration: "none", color: "inherit" }} href='/registrarse'><button className={Style.registrar1}>Registrarse gratis</button></Link>

        <div className={Style.iniciarSesion}>
            <h4 className={Style.iniciarSesionFondo}> 
              ¿Ya tienes cuenta?  
              <Link href='/loging'>INICIA SESION</Link> 
            </h4>
        </div>
        
        <div>
            <BtnGoogle className={Style.divR}/>
        </div> 

        <span className={Style.invitadoCount} > 
          <button className={Style.invitado} onClick={home}>
            Ingresar como Invitado
          </button>
        </span>   

      </div>

    </div>  

    </div>
  )
}

