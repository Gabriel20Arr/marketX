"use client";

import Link from "next/link";
import logo from "../../images/MarketX-newlogo (2).png";
import styles from "./NavBar.module.css";
import React, { useContext, useEffect, useState } from "react";
import { Cart4 } from "react-bootstrap-icons";
import { Store } from "@/src/utils/Store";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Image from "next/image";


export default function Navigation({ currentPath }) {

  const { data: session, status } = useSession();
  const [cartItemsCount, setCartItemsCount] = useState(0);
  
  const handelrRouter = (value) => {
    localStorage.clear();
    router.push(`/${value}`);
  };

  const routerHome = () => {
    router.push("/home");
  };
 
  const router = useRouter();
  
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  var usuario;
  if(typeof window !== 'undefined'){
    const usuarioJSON = localStorage.getItem("usuario");
    usuario = JSON.parse(usuarioJSON) || 0;
  }

  useEffect(() => {
    setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
  }, [cart.cartItems]); 

  useEffect(()=>{
    dispatch({type:'...'})
  },[])

  if (status === "loading") {
    return null;
  }

  return (
    <nav className={styles.container}>
      <div className={styles.NavConteiner}>
        <div>
          <Image src={logo} alt="logo" className={styles.logo} onClick={routerHome} />
        </div>

        {currentPath !== "/form" && (
          <div className={styles.btn}>
            <Link
              style={{ textDecoration: "none", color: "inherit" }}
              href={usuario?.rol ? "/form" : "/registrarse"}
            >
              Publicar Producto
            </Link>
          </div>
        )}

        {currentPath !== "/about" && (
          <div className={styles.btn}>
            <Link
              style={{ textDecoration: "none", color: "inherit" }}
              href="/about"
            >
              Sobre MarketX
            </Link>
          </div>
        )}

        <div>
          <Link
            style={{ textDecoration: "none", color: "inherit" }}
            href={usuario ? `/cart` : "/home"}
          >
            <Cart4 size={30} />
            <span className="text-white bg-danger rounded p-1">
              {cartItemsCount}
            </span>
          </Link>
        </div>

        {!session ? null : (
          <div>
            <img className={styles.img} src={session.user.image} alt="logo" />
          </div>
        )}
      </div>
    </nav>
  );
}