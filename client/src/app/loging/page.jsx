'use client'

import { useEffect, useState } from "react"
import Style from './Loging.module.css';
import image from '../../images/MarketX-newlogo.png';
import Image from "next/image";
import { useGetUsersQuery } from "@/src/redux/services/userApi";
import { useRouter } from "next/navigation";

export default function Registrarse() {
  const [usuario, setUsuario] = useState({
    correo:'',
    contraseña:''
  });
  
  const [error, setError] = useState({
    correo:'',
    contraseña:''
  });
  const {data} = useGetUsersQuery(null);
  const router = useRouter();

  const handlerUsuario = (e)=>{
    const {value, name} = e.target;
    setUsuario({...usuario, [name]:value});
  };

  const handlerSubmit = (e) => {
    e.preventDefault();
    const correos = data && data.map(user => user.correo).includes(usuario.correo);
    const contraseñas = data && data.map(user => user.contraseña).includes(usuario.contraseña);
    if (contraseñas && correos) {
      setUsuario({
        correo: '',
        contraseña: ''
      });
      setError({
        correo: '',
        contraseña: ''
      });
      alert("Se inicio sesion correctamente");
      router.push('/home');
    } else {
      setError(prevError => ({
        ...prevError,
        correo: correos ? '' : 'correo no registrado',
        contraseña: correos ? (contraseñas ? '' : 'contraseña incorrecta') : ''
      }));
    }
  };
  

  return (
    <div className={Style.container}>
    
        <div className={Style.image}>
          <Image  src={image} 
          width={350} alt=""/>
        </div>

      <div className={Style.formulario}>

        <div className={Style.form}>
          <h1 className={Style.titulo}>Iniciar sesión</h1>

          <span className={Style.titulos}>Correo: </span>
          <div className={Style.formInput}>

            <input placeholder="Correo" className={Style.Input} type="text" name="correo" onChange={handlerUsuario} value={usuario.correo}/>

            <p className={Style.errores}>{error.correo ? error.correo : ''}</p>

          </div>
          
          <span className={Style.titulos2}>Contraseña: </span>
          <div className={Style.formInput2}>

            <input placeholder="Contraseña" className={Style.Input} type="text" name="contraseña" onChange={handlerUsuario} value={usuario.contraseña}/>

            <p className={Style.errores}>{error.contraseña ? error.contraseña : ''}</p>

          </div>

          <button type="submit" onClick={handlerSubmit}>Continuar</button>
        </div>

      </div>
    </div>
  )
}
