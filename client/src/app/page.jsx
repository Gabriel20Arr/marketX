"use client";
import logo from "../images/MarketX-newlogo (2).png";
import style from "./landing.module.css";
import Frame from "./Landing/Frame";
import Ellipse6 from "./Landing/Ellipse6";
import pcGamer from "../images/pCGAMER1.jpg";
import Arg from "./Landing/Arg";
import Col from "./Landing/Col";
import Mex from "./Landing/Mex";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { Store } from "@/src/utils/Store";
import { useGetUsersQuery } from "@/src/redux/services/userApi";
// import BtnGoogle from "../components/BtnGoogle/BtnGoogle";

const Landing = () => {
  const router = useRouter();
  const { dispatch } = useContext(Store);

  const { data, refetch } = useGetUsersQuery(null);
  useEffect(() => {
    refetch();
  }, [refetch]);
  console.log(data);

  const home = (event) => {
    event.preventDefault();
    const guardado = data.find((user) => user.correo === "invitado@gmail.com");
    const guardadoString = JSON.stringify(guardado);
    localStorage.setItem("usuario", guardadoString);
    // guarda el carrito del invitado en el estado global

    dispatch({ type: "INICIAL", payload: guardado.carrito });

    router.push("/home");
  };
  return (
    <div>
      <nav className={style.nav}>
        <div className={style.contenedorLogo}>
          <Image src={logo} alt="logo" width="200" height="150" style={{borderRadius: '10px'}} />
        </div>
        <div className={style.links}>
          <div className={style.enlaces}>
            <Link
              style={{ textDecoration: "none", color: "inherit" }}
              href={"/login"}
            >
              <h6>Inicia Sesion</h6>
            </Link>

            <Link
              style={{ textDecoration: "none", color: "inherit" }}
              href={"/registrarse"}
            >
              <h6>Registrase</h6>
            </Link>
            <button
              style={{
                textDecoration: "none",
                color: "inherit",
                border: "none",
                backgroundColor: "white",
              }}
              onClick={home}
            >
              <h6>Entrar como Invitado</h6>
            </button>
            {/* <BtnGoogle /> */}
          </div>
          <div className={style.paises}>
            <Arg className={style.pais} />
            <Col className={style.pais} />
            <Mex className={style.pais} />
          </div>
        </div>
      </nav>
      <div className={style.cuerpo}>
        <div className={style.titulo}>
          <div className={style.contenedorTitulo}>
            <h1> MARKET-X</h1>
            <h1>TU COMPRA MAS SEGURA</h1>
            <h3> MAS QUE UN MERCADO</h3>
          </div>
          <div className={style.frame14}>
            <Frame />
          </div>
        </div>
        <div className={style.frame15}>
          <div className={style.ellipse6}>
            <Ellipse6 className={style.icono2} />
          </div>
          <div className={style.ellipse5}>
            <Image className={style.pcGamer} src={pcGamer} alt="ss" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
