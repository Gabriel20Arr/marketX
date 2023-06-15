'use client'
import { postRequestAsync } from '../../redux/services/userPost';
import { useState, useEffect } from "react";
import Style from './registrar.module.css';
import image from '../../images/WhatsApp Image 2023-06-13 at 8.46.20 PM.jpeg';
import Image from "next/image";
import {useRouter} from 'next/navigation'
import { useAppDispatch } from '@/src/redux/hooks/hooks';
import { validate } from '../../hooks/registrarseValidar';
import { useGetUsersQuery } from '@/src/redux/services/userApi';

export default function Registrarse() {
  const [usuario, setUsuario] = useState({
    nombre: '',
    correo: '',
    contraseña: '',
    confirme_su_contraseña: '',
    rol: ''
  });
  const [error, setError] = useState({
    nombre: 'requerido',
    correo: 'requerido',
    contraseña: 'requerido',
    confirme_su_contraseña: 'requerido',
    rol: 'requerido'
  });

  const dispatch = useAppDispatch();
  const {data} = useGetUsersQuery(null);
  const router = useRouter();

  const handlerUsuario = (e) => {
    const { value, name } = e.target;
    setUsuario({ ...usuario, [name]: value });
  };
  useEffect(() => {
    setError(validate(usuario,data));
  }, [usuario]);

  const handlerSubmit = async (e) => {
    e.preventDefault();
      const result = await dispatch(postRequestAsync(usuario));
      console.log(result);
      setUsuario({
        nombre: '',
        correo: '',
        contraseña: '',
        confirme_su_contraseña: '',
        rol: ''
      });
      router.push('/loging')
  };
  const existeError = (Object.values(error).some(value => value !== ''))
  return (
    <div className={Style.container}>
      <div className={Style.image}>
        <Image src={image} width={230} height={500} alt="" />
      </div>
      <div className={Style.form}>
        <h1>Registrese gratis</h1>

        <span>usuario: </span>
        <input type="text" name="nombre" onChange={handlerUsuario} value={usuario.nombre} /><br />
        <p>{error.nombre ? error.nombre : ''}</p><br />

        <span>correo: </span>
        <input type="text" name="correo" onChange={handlerUsuario} value={usuario.correo} /><br />
        <p>{error.correo ? error.correo : ''}</p><br />

        <span>contraseña: </span>
        <input type="text" name="contraseña" onChange={handlerUsuario} value={usuario.contraseña} /><br />
        <p>{error.contraseña ? error.contraseña : ''}</p><br />

        <span>confirme su contraseña: </span>
        <input type="text" name="confirme_su_contraseña" onChange={handlerUsuario} value={usuario.confirme_su_contraseña} /><br />
        <p>{error.confirme_su_contraseña ? error.confirme_su_contraseña : ''}</p><br />

        <span>rol: </span>
        <select name="rol" id="" defaultValue={"comprador"} onChange={handlerUsuario}>
          <option value='vendedor'>vendedor</option>
          <option value='comprador'>comprador</option>
        </select><br></br>

        {existeError?null:<button type="submit" onClick={handlerSubmit}>Continuar</button>}

      </div>
    </div>
  );
}

