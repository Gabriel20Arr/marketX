"use client";
import { postRequestAsync } from "../../redux/services/userPost";
import { useState, useEffect } from "react";
import Style from "./registrar.module.css";
import image from "../../images/monitor.jpg";
import teclado from "../../images/teclado-3.jpg";
import pc from "../../images/pc.jpg";
import logo from "../../images/MarketX-newlogo.png";
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
      <div className={Style.image}></div>
      <div>
        <div className={Style.containerTitulo}>
          <Image className={Style.logo} src={logo} alt="Logo" />
          <h3 className={Style.titulo}>Market X</h3>
        </div>
        <div className="bg-white d-flex aling-items-center justify-content-center w-100  pb-5">
          <div className={Style.form}>
            <h2 className="mb-3 mt-3 text-center">Registrese gratis</h2>
            <form onSubmit={handlerSubmit}>
              <div className="mb-2">
                <label className="form-label" htmlFor="nombre">
                  Nombre :
                </label>
                <input
                  className="form-control"
                  type="text"
                  name="nombre"
                  onChange={handlerUsuario}
                  value={usuario.nombre}
                />
                <p className="form-text text-danger">
                  {error.nombre ? error.nombre : ""}
                </p>
              </div>
              <div className="mb-2">
                <label className="form-label" htmlFor="correo">
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
              <div className=" mb-2">
                <label className="form-label" htmlFor="constraseña">
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
              <div className="mb-3">
                <label className="form-label" htmlFor="confirmar contraseña">
                  Confirmar Contraseña :
                </label>
                <input
                  className="form-control"
                  type="text"
                  name="confirme_su_contraseña"
                  onChange={handlerUsuario}
                  value={usuario.confirme_su_contraseña}
                />
                <p className="form-text text-danger">
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
              <div class="d-grid gap-2 col-6 mx-auto mb-3">
                {existeError ? null : (
                  <button
                    disabled={buttonHablitado()}
                    className="btn btn-success mt-2 mb-3 "
                    type="submit"
                  >
                    Registrarse
                  </button>
                )}
              </div>

              <div class="d-flex align-items-center justify-content-center">
                <div class="border-bottom flex-grow-1"></div>
                <div class="px-3">O</div>
                <div class="border-bottom flex-grow-1"></div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
