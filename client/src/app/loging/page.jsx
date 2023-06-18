'use client'

import { useEffect, useState } from "react"
import Style from './Loging.module.css';
import image from '../../images/WhatsApp Image 2023-06-13 at 8.46.20 PM.jpeg';
import Image from "next/image";
import { useGetUsersQuery } from "@/src/redux/services/userApi";
import { useRouter } from "next/navigation";

export default function Registrarse() {     
  const [usuario, setUsuario] = useState({
    correo:'',
    contraseña:''
  });
  const {data:usuarios} = useGetUsersQuery(null);
  console.log(usuarios);
  
  const [error, setError] = useState({
    correo:'',
    contraseña:''
  });
  const router = useRouter();
  useEffect(()=>{
  },[usuarios])
  const handlerUsuario = (e)=>{
    const {value, name} = e.target;
    setUsuario({...usuario, [name]:value});
  };

  const handlerSubmit = (e) => {
    e.preventDefault();
    const correos = usuarios && usuarios.map(user => user.correo).includes(usuario.correo);
    const contraseñas = usuarios && usuarios.map(user => user.contraseña).includes(usuario.contraseña);
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
        width={230} height={500} alt=""/>
      </div>
      <div className={Style.form}>
        <h1>Inisiar sesión</h1>

        <span>correo: </span>
        <input type="text" name="correo" onChange={handlerUsuario} value={usuario.correo}/><br />
        <p>{error.correo ? error.correo : ''}</p><br />

        <span>contraseña: </span>
        <input type="text" name="contraseña" onChange={handlerUsuario} value={usuario.contraseña}/><br />
        <p>{error.contraseña ? error.contraseña : ''}</p><br />

        <button type="submit" onClick={handlerSubmit}>Continuar</button>
      </div>
    </div>
  )
}
