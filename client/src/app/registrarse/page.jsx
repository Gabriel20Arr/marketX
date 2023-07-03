"use client";

import { postRequestAsync } from "../../redux/services/userPost";
import { useState, useEffect } from "react";
import Style from "./registrar.module.css";
import logo from "../../images/MarketX-newlogo.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/src/redux/hooks/hooks";
import { validate } from "../../hooks/registrarseValidar";
import { useGetUsersQuery } from "@/src/redux/services/userApi";
import "bootstrap/dist/css/bootstrap.min.css";
import { enviarNotificacionPorCorreo } from "../../hooks/enviarCorreo";
import BtnGoogle from "../../components/BtnGoogle/BtnGoogle";
import { useSelector } from "react-redux";

export default function Registrarse() {
  const [showPass, setShowPass] = useState(false);
  const [showPass2, setShowPass2] = useState(false);

  const [usuario, setUsuario] = useState({
    nombre: "",
    correo: "",
    contraseña: "",
    confirme_su_contraseña: "",
    rol: "",
  });
  const [error, setError] = useState({
    nombre: "",
    correo: "",
    contraseña: "",
    confirme_su_contraseña: "",
    rol: "",
  });

  const blockedUsers = useSelector((state) => state.blockedUsers);

  const dispatch = useAppDispatch();
  const { data } = useGetUsersQuery(null);
  const router = useRouter();

  const handlerUsuario = (e) => {
    const { value, name } = e.target;
    setUsuario({ ...usuario, [name]: value });
  };

  useEffect(() => {
    setError(validate(usuario, data));
  }, [usuario, data]);

  const handlerSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(postRequestAsync(usuario));

    
    const asunto = "Bienvenido a Market X";
    const mensaje = "Su cuenta se ha creado correctamente";
    const correoEnviado = enviarNotificacionPorCorreo(
      usuario.correo,
      asunto,
      mensaje
    );
    console.log(result, correoEnviado);
    setUsuario({
      nombre: "",
      correo: "",
      contraseña: "",
      confirme_su_contraseña: "",
      provincia: "",
      codigo_postal: "",
      direccion: "",
      telefono: "",
      rol: "",
    });
    router.push("/login");
  };

  const buttonHablitado = () => {
    if (
      usuario.nombre === "" ||
      usuario.correo === "" ||
      usuario.contraseña === "" ||
      usuario.confirme_su_contraseña === "" ||
      usuario.provincia === "" ||
      usuario.codigo_postal === "" ||
      usuario.direccion === "" ||
      usuario.telefono === ""
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
            <h2 className="mb-3 mt-3 text-center">Regístrese gratis</h2>
            <form onSubmit={handlerSubmit}>
              <div className="mb-2">
                <label className="form-label" htmlFor="nombre">
                  Nombre:
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

                <div className={Style.inputs}>
                  <input
                    className="form-control"
                    type={showPass ? "text" : "password"}
                    name="contraseña"
                    onChange={handlerUsuario}
                    value={usuario.contraseña}
                  />

                  <div onClick={() => setShowPass(!showPass)}>
                    {showPass ? (
                      <svg
                        className={Style.svg1}
                        width="25px"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 18.75C6.17 18.75 3.43 12.56 3.31 12.3C3.27039 12.2049 3.25 12.103 3.25 12C3.25 11.897 3.27039 11.7951 3.31 11.7C3.43 11.44 6.17 5.25 12 5.25C17.83 5.25 20.57 11.44 20.69 11.7C20.7296 11.7951 20.75 11.897 20.75 12C20.75 12.103 20.7296 12.2049 20.69 12.3C20.57 12.56 17.83 18.75 12 18.75ZM4.83 12C5.42 13.15 7.83 17.25 12 17.25C16.17 17.25 18.58 13.15 19.17 12C18.58 10.85 16.17 6.75 12 6.75C7.83 6.75 5.42 10.85 4.83 12Z"
                          fill="#000000"
                        />
                        <path
                          d="M12 15.25C11.3572 15.25 10.7289 15.0594 10.1944 14.7023C9.65994 14.3452 9.24338 13.8376 8.99739 13.2437C8.75141 12.6499 8.68705 11.9964 8.81245 11.366C8.93785 10.7355 9.24738 10.1564 9.7019 9.7019C10.1564 9.24738 10.7355 8.93785 11.366 8.81245C11.9964 8.68705 12.6499 8.75141 13.2437 8.99739C13.8376 9.24338 14.3452 9.65994 14.7023 10.1944C15.0594 10.7289 15.25 11.3572 15.25 12C15.2474 12.8611 14.9041 13.6863 14.2952 14.2952C13.6863 14.9041 12.8611 15.2474 12 15.25ZM12 10.25C11.6539 10.25 11.3155 10.3526 11.0278 10.5449C10.74 10.7372 10.5157 11.0105 10.3832 11.3303C10.2508 11.6501 10.2161 12.0019 10.2836 12.3414C10.3512 12.6809 10.5178 12.9927 10.7626 13.2374C11.0073 13.4822 11.3191 13.6489 11.6586 13.7164C11.9981 13.7839 12.3499 13.7492 12.6697 13.6168C12.9895 13.4843 13.2628 13.26 13.4551 12.9722C13.6474 12.6845 13.75 12.3461 13.75 12C13.7474 11.5367 13.5622 11.0931 13.2345 10.7655C12.9069 10.4378 12.4633 10.2526 12 10.25Z"
                          fill="#000000"
                        />{" "}
                      </svg>
                    ) : (
                      <svg
                        className={Style.svg1}
                        height="10px"
                        width="25px"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5.70711 19.7071L19.7071 5.70711C20.0976 5.31658 20.0976 4.68342 19.7071 4.29289C19.3166 3.90237 18.6834 3.90237 18.2929 4.29289L4.29289 18.2929C3.90237 18.6834 3.90237 19.3166 4.29289 19.7071C4.68342 20.0976 5.31658 20.0976 5.70711 19.7071Z"
                          fill="#000000"
                        />
                        <path
                          d="M12 5C13.2011 5 14.394 5.21361 15.5362 5.63535L13.9368 7.23482C13.2953 7.0777 12.6458 7 12 7C9.07319 7 6.06862 8.59614 4.09173 11.9487C4.74631 13.0987 5.52178 14.046 6.37447 14.7971L4.95845 16.2131C3.88666 15.248 2.93477 14.037 2.16029 12.5876C1.94361 12.1821 1.94637 11.6844 2.17003 11.2807C4.45796 7.15186 8.18777 5 12 5Z"
                          fill="#000000"
                        />
                        <path
                          d="M12 9C12.056 9 12.1117 9.00154 12.167 9.00457L9.00457 12.167C9.00154 12.1117 9 12.056 9 12C9 10.3431 10.3431 9 12 9Z"
                          fill="#000000"
                        />
                        <path
                          d="M14.9954 11.833L11.833 14.9954C11.8883 14.9985 11.944 15 12 15C13.6569 15 15 13.6569 15 12C15 11.944 14.9985 11.8883 14.9954 11.833Z"
                          fill="#000000"
                        />
                        <path
                          d="M12 17C11.355 17 10.7061 16.9216 10.0654 16.763L8.46807 18.3604C9.60812 18.7849 10.7998 19 12 19C15.8372 19 19.5882 16.8013 21.8397 12.5876C22.0564 12.1821 22.0536 11.6844 21.83 11.2807C21.0543 9.88089 20.1128 8.7083 19.0587 7.76977L17.6421 9.18635C18.4837 9.91776 19.2525 10.8366 19.9083 11.9487C17.9595 15.3724 14.939 17 12 17Z"
                          fill="#000000"
                        />
                      </svg>
                    )}
                  </div>
                </div>
              </div>
              <p className="form-text text-danger">
                {error.contraseña ? error.contraseña : ""}
              </p>

              <div className="mb-3">
                <label className="form-label" htmlFor="confirmar contraseña">
                  Confirmar Contraseña :
                </label>

                <div className={Style.inputs}>
                  <input
                    className="form-control"
                    type={showPass2 ? "text" : "password"}
                    name="confirme_su_contraseña"
                    onChange={handlerUsuario}
                    value={usuario.confirme_su_contraseña}
                  />

                  <div className={Style.inputs}>
                    <div onClick={() => setShowPass2(!showPass2)}>
                      {showPass2 ? (
                        <svg
                          className={Style.svg1}
                          height="10px"
                          width="25px"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M5.70711 19.7071L19.7071 5.70711C20.0976 5.31658 20.0976 4.68342 19.7071 4.29289C19.3166 3.90237 18.6834 3.90237 18.2929 4.29289L4.29289 18.2929C3.90237 18.6834 3.90237 19.3166 4.29289 19.7071C4.68342 20.0976 5.31658 20.0976 5.70711 19.7071Z"
                            fill="#000000"
                          />
                          <path
                            d="M12 5C13.2011 5 14.394 5.21361 15.5362 5.63535L13.9368 7.23482C13.2953 7.0777 12.6458 7 12 7C9.07319 7 6.06862 8.59614 4.09173 11.9487C4.74631 13.0987 5.52178 14.046 6.37447 14.7971L4.95845 16.2131C3.88666 15.248 2.93477 14.037 2.16029 12.5876C1.94361 12.1821 1.94637 11.6844 2.17003 11.2807C4.45796 7.15186 8.18777 5 12 5Z"
                            fill="#000000"
                          />
                          <path
                            d="M12 9C12.056 9 12.1117 9.00154 12.167 9.00457L9.00457 12.167C9.00154 12.1117 9 12.056 9 12C9 10.3431 10.3431 9 12 9Z"
                            fill="#000000"
                          />
                          <path
                            d="M14.9954 11.833L11.833 14.9954C11.8883 14.9985 11.944 15 12 15C13.6569 15 15 13.6569 15 12C15 11.944 14.9985 11.8883 14.9954 11.833Z"
                            fill="#000000"
                          />
                          <path
                            d="M12 17C11.355 17 10.7061 16.9216 10.0654 16.763L8.46807 18.3604C9.60812 18.7849 10.7998 19 12 19C15.8372 19 19.5882 16.8013 21.8397 12.5876C22.0564 12.1821 22.0536 11.6844 21.83 11.2807C21.0543 9.88089 20.1128 8.7083 19.0587 7.76977L17.6421 9.18635C18.4837 9.91776 19.2525 10.8366 19.9083 11.9487C17.9595 15.3724 14.939 17 12 17Z"
                            fill="#000000"
                          />
                        </svg>
                      ) : (
                        <svg
                          className={Style.svg1}
                          width="25px"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12 18.75C6.17 18.75 3.43 12.56 3.31 12.3C3.27039 12.2049 3.25 12.103 3.25 12C3.25 11.897 3.27039 11.7951 3.31 11.7C3.43 11.44 6.17 5.25 12 5.25C17.83 5.25 20.57 11.44 20.69 11.7C20.7296 11.7951 20.75 11.897 20.75 12C20.75 12.103 20.7296 12.2049 20.69 12.3C20.57 12.56 17.83 18.75 12 18.75ZM4.83 12C5.42 13.15 7.83 17.25 12 17.25C16.17 17.25 18.58 13.15 19.17 12C18.58 10.85 16.17 6.75 12 6.75C7.83 6.75 5.42 10.85 4.83 12Z"
                            fill="#000000"
                          />
                          <path
                            d="M12 15.25C11.3572 15.25 10.7289 15.0594 10.1944 14.7023C9.65994 14.3452 9.24338 13.8376 8.99739 13.2437C8.75141 12.6499 8.68705 11.9964 8.81245 11.366C8.93785 10.7355 9.24738 10.1564 9.7019 9.7019C10.1564 9.24738 10.7355 8.93785 11.366 8.81245C11.9964 8.68705 12.6499 8.75141 13.2437 8.99739C13.8376 9.24338 14.3452 9.65994 14.7023 10.1944C15.0594 10.7289 15.25 11.3572 15.25 12C15.2474 12.8611 14.9041 13.6863 14.2952 14.2952C13.6863 14.9041 12.8611 15.2474 12 15.25ZM12 10.25C11.6539 10.25 11.3155 10.3526 11.0278 10.5449C10.74 10.7372 10.5157 11.0105 10.3832 11.3303C10.2508 11.6501 10.2161 12.0019 10.2836 12.3414C10.3512 12.6809 10.5178 12.9927 10.7626 13.2374C11.0073 13.4822 11.3191 13.6489 11.6586 13.7164C11.9981 13.7839 12.3499 13.7492 12.6697 13.6168C12.9895 13.4843 13.2628 13.26 13.4551 12.9722C13.6474 12.6845 13.75 12.3461 13.75 12C13.7474 11.5367 13.5622 11.0931 13.2345 10.7655C12.9069 10.4378 12.4633 10.2526 12 10.25Z"
                            fill="#000000"
                          />
                        </svg>
                      )}
                    </div>
                  </div>
                  <p className="form-text text-danger">
                    {error.confirme_su_contraseña
                      ? error.confirme_su_contraseña
                      : ""}
                  </p>
                </div>

                <div className="mb-2">
                  <label className="form-label" htmlFor="provincia">
                    Provincia:
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    name="provincia"
                    onChange={handlerUsuario}
                    value={usuario.provincia}
                  />
                  <p className="form-text text-danger">
                    {error.nombre ? error.nombre : ""}
                  </p>
                </div>

                <div className="mb-2">
                  <label className="form-label" htmlFor="codigo_postal">
                    Codigo postal:
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    name="codigo_postal"
                    onChange={handlerUsuario}
                    value={usuario.codigo_postal}
                  />
                  <p className="form-text text-danger">
                    {error.nombre ? error.nombre : ""}
                  </p>
                </div>

                <div className="mb-2">
                  <label className="form-label" htmlFor="direccion">
                    Direccion:
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    name="direccion"
                    onChange={handlerUsuario}
                    value={usuario.direccion}
                  />
                  <p className="form-text text-danger">
                    {error.nombre ? error.nombre : ""}
                  </p>
                </div>

                <div className="mb-2">
                  <label className="form-label" htmlFor="telefono">
                    Telefono:
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    name="telefono"
                    onChange={handlerUsuario}
                    value={usuario.telefono}
                  />
                  <p className="form-text text-danger">
                    {error.nombre ? error.nombre : ""}
                  </p>
                </div>
              </div>

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

              <div className="d-flex align-items-center justify-content-center">
                <div className="border-bottom flex-grow-1"></div>
                <div className="px-3">O</div>
                <div className="border-bottom flex-grow-1"></div>
              </div>

            </form>
              <div className="d-flex align-items-center justify-content-center mt-4">
                <BtnGoogle />
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}
