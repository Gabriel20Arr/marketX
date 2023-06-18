import image from '../images/MarketX-newlogo.png';
import Link from 'next/link';
import Style from './landing.module.css';
import  Image from 'next/image'

export default function Landing() {

  return (
    <div className={Style.formAll}>

    <h1 className={Style.formT}>Bienvenido a MarketX</h1>

    <div className={Style.container}>

      <div className={Style.image}>
        <Image src={image} width={350}  alt="" />
      </div>

      <div className={Style.form}>

        <Link href='/registrarse'><button className={Style.registrar1}>Registrarse gratis</button></Link>

        <h3 className={Style.iniciarSesion}>
          <h4 className={Style.iniciarSesionFondo}> 
            Ya tienes cuenta?  
            <Link href='/loging'>INICIA SESION</Link> 
          </h4>
        </h3>
        
        <button className={Style.divR}>
            
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSO0u4dr5oCgDbhigc4GH5o4PMEZGwVaHabRg&usqp=CAU" alt="" className={Style.logo}
          />                  
          <span className={Style.registrar}> 
            Inicia con google
          </span>

        </button>    

      </div>

    </div>  

    </div>
  )
}

