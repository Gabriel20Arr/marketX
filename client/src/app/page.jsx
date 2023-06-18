import image from '../images/WhatsApp Image 2023-06-13 at 8.46.20 PM.jpeg';
import Link from 'next/link';
import Style from './landing.module.css';
import  Image from 'next/image'

export default function Landing() {
  return (
    <div className={Style.container}>
      <div className={Style.image}>
        <Image src={image} width={230} height={500} alt="" />
      </div>
      <div className={Style.form}>
      <h1>Bienvenido a marketX</h1><br/>
      <Link href='/registrarse'><button className={Style.registrar}>Registrarse gratis</button></Link>
      <h3 className={Style.iniciarSesion}>Ya tienes cuenta? <Link href='/loging'>INICIA SESION</Link></h3><br />
      
      <button className={Style.registrar}>
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSO0u4dr5oCgDbhigc4GH5o4PMEZGwVaHabRg&usqp=CAU" alt="" className={Style.logo}/>
           inicia sesion con google</button>
        </div>
    </div>
  )
}

