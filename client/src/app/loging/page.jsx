"use client";

import { useEffect, useState } from "react";
import Style from "./Loging.module.css";
import image from "../../images/WhatsApp Image 2023-06-13 at 8.46.20 PM.jpeg";
import Image from "next/image";
import { useGetUsersQuery } from "@/src/redux/services/userApi";
import { useRouter } from "next/navigation";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Registrarse() {
  const [usuario, setUsuario] = useState({
    correo: "",
    contraseña: "",
  });

  const [error, setError] = useState({
    correo: "",
    contraseña: "",
  });
  const { data } = useGetUsersQuery(null);
  const router = useRouter();

  const handlerUsuario = (e) => {
    const { value, name } = e.target;
    setUsuario({ ...usuario, [name]: value });
  };

  const handlerSubmit = (e) => {
    e.preventDefault();
    const correos =
      data && data.map((user) => user.correo).includes(usuario.correo);
    const contraseñas =
      data && data.map((user) => user.contraseña).includes(usuario.contraseña);
    if (contraseñas && correos) {
      setUsuario({
        correo: "",
        contraseña: "",
      });
      setError({
        correo: "",
        contraseña: "",
      });
      alert("Se inicio sesion correctamente");
      router.push("/home");
    } else {
      setError((prevError) => ({
        ...prevError,
        correo: correos ? "" : "correo no registrado",
        contraseña: correos ? (contraseñas ? "" : "contraseña incorrecta") : "",
      }));
    }
  };

  const habilitarBoton = () => {
    if (usuario.contraseña === "" || usuario.correo === "") {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className={Style.container}>
      <div className={Style.image}>
        <Image src={image} width={230} height={500} alt="" />
      </div>

      <div className="d-flex align-items-center justify-content-center w-100 border pt-5 pb-5 pr-3 pl-1 ">
        <form onSubmit={handlerSubmit}>
          <h1 className="mb-3 text-center">Iniciar Sesión</h1>
          <div className="mb-2">
            <label htmlFor="correo" className="form-label">
              Correo :
            </label>
            <input
              className="form-control"
              type="text"
              name="correo"
              onChange={handlerUsuario}
              value={usuario.correo}
            />
            <p className="form-text text-danger">
              {error.correo ? error.correo : ""}
            </p>
          </div>
          <div className="mb-2">
            <label htmlFor="contraeña" className="form-label">
              Contraseña :
            </label>
            <input
              className="form-control"
              type="text"
              name="contraseña"
              onChange={handlerUsuario}
              value={usuario.contraseña}
            />
            <p className="form-text text-danger">
              {error.contraseña ? error.contraseña : ""}
            </p>
          </div>
          <div className="d-grid gap-2 col-6 mx-auto">
            <button
              disabled={habilitarBoton()}
              className="btn btn-success mt-2"
              type="submit"
            >
              Ingresar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
