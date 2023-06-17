"use client";
import { postRequestAsync } from "../../redux/services/userPost";
import { useState, useEffect } from "react";
import Style from "./registrar.module.css";
import image from "../../images/WhatsApp Image 2023-06-13 at 8.46.20 PM.jpeg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/src/redux/hooks/hooks";
import { validate } from "../../hooks/registrarseValidar";
import { useGetUsersQuery } from "@/src/redux/services/userApi";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Registrarse() {
  const [usuario, setUsuario] = useState({
    nombre: "",
    correo: "",
    contraseña: "",
    confirme_su_contraseña: "",
    // rol: "",
  });
  const [error, setError] = useState({
    nombre: "",
    correo: "",
    contraseña: "",
    confirme_su_contraseña: "",
    // rol: "",
  });

  const dispatch = useAppDispatch();
  const { data } = useGetUsersQuery(null);
  const router = useRouter();

  const handlerUsuario = (e) => {
    const { value, name } = e.target;
    setUsuario({ ...usuario, [name]: value });
  };
  useEffect(() => {
    setError(validate(usuario, data));
  }, [usuario]);

  const handlerSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(postRequestAsync(usuario));
    console.log(result);
    setUsuario({
      nombre: "",
      correo: "",
      contraseña: "",
      confirme_su_contraseña: "",
      // rol: "",
    });
    router.push("/loging");
  };
  const buttonHablitado = () => {
    if (
      usuario.nombre === "" ||
      usuario.correo === "" ||
      usuario.contraseña === "" ||
      usuario.confirme_su_contraseña === ""
    ) {
      return true;
    } else {
      return false;
    }
  };

  const existeError = Object.values(error).some((value) => value !== "");
  return (
    <div className={Style.container}>
      <div className={Style.image}>
        <Image src={image} width={230} height={500} alt="" />
      </div>
      <div className="d-flex aling-items-center justify-content-center w-100">
        <div className={Style.form}>
          <h2 className="mb-3 text-center">Registrese gratis</h2>
          <form onSubmit={handlerSubmit}>
            <div className="mb-2">
              <label className="form-label" htmlFor="nombre">
                nombre:
              </label>
              <input
                className="form-control"
                type="text"
                name="nombre"
                onChange={handlerUsuario}
                value={usuario.nombre}
              />
              <p className="form-text">{error.nombre ? error.nombre : ""}</p>
            </div>
            <div className="mb-2">
              <label className="form-label" htmlFor="correo">
                correo:
              </label>
              <input
                className="form-control"
                type="text"
                name="correo"
                onChange={handlerUsuario}
                value={usuario.correo}
              />
              <p className="form-text">{error.correo ? error.correo : ""}</p>
            </div>
            <div className=" mb-2">
              <label className="form-label" htmlFor="constraseña">
                contraseña:
              </label>
              <input
                className="form-control"
                type="text"
                name="contraseña"
                onChange={handlerUsuario}
                value={usuario.contraseña}
              />
              <p className="form-text">
                {error.contraseña ? error.contraseña : ""}
              </p>
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="confirmar contraseña">
                confirmar contraseña:
              </label>
              <input
                className="form-control"
                type="text"
                name="confirme_su_contraseña"
                onChange={handlerUsuario}
                value={usuario.confirme_su_contraseña}
              />
              <p className="form-text">
                {error.confirme_su_contraseña
                  ? error.confirme_su_contraseña
                  : ""}
              </p>
            </div>
            {/* Este select lo utilizaremos cuando le podamos dar funcionalidad*/}
            {/* <span>rol: </span> */}
            {/* <select
           name="rol"
           id=""
           defaultValue={"comprador"}
           onChange={handlerUsuario}
            >
             <option value="vendedor">vendedor</option>
             <option value="comprador">comprador</option>
            </select>
           <br></br> */}

            <div class="d-grid gap-2 col-6 mx-auto">
              {existeError ? null : (
                <button
                  disabled={buttonHablitado()}
                  className="btn btn-success mt-2"
                  type="submit"
                >
                  Registrarse
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
