"use client";

import Link from "next/link";
import Image from "next/image";
import logo from "../../images/MarketX-newlogo (2).png";
import styles from "./NavBar.module.css";
import React, {useContext, useEffect, useState} from 'react';
import { Cart4 } from 'react-bootstrap-icons';
import { Store } from '@/src/utils/Store';
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";


export default function Navigation({ currentPath }) {

  const { data: session, status } = useSession();
  const router = useRouter();
  const handelrRouter = (value) => {
    localStorage.clear();
    router.push(`/${value}`);
  };

  const { state, dispatch } = useContext(Store);

  const { cart } = state;

  const [cartItemsCount, setCartItemsCount] = useState(0);

  useEffect(() => {
    setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0)) 
  }, [cart.cartItems])
  

  const routerHome = () => {
    router.push('/home')
  }

  const routerDashBoard = () => {
    router.push('/admin')
  }


  const routerMisProductos = () => {
    router.push('/misProductos')
  }

  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };
  if (status === "loading") {
    return null;
  }

  const usuarioJSON = localStorage.getItem('usuario');
  const usuario = JSON.parse(usuarioJSON);

  return (
    <nav className={styles.container}>

      <div className={styles.NavConteiner} >
        <div>
          <Image src={logo} className={styles.logo} onClick={routerHome} />
        </div>

        {currentPath !== '/form' && (
          <div className={styles.btn}>
            <Link style={{ textDecoration: "none", color: "inherit" }} href="/form">Publicar Producto</Link>
          </div>
        )
        }

        {currentPath !== '/about' && (
          <div className={styles.btn}>
            <Link style={{ textDecoration: "none", color: "inherit" }} href="/about">Sobre MarketX</Link>
          </div>
        )
        }

        <div className={styles.dropdown}>
          <button className={styles.dropdownToggle} onClick={toggleMenu}>
            <h2>
              |||
            </h2>
          </button>
          <ul className={`${styles.dropdownMenu} ${isMenuOpen ? styles.show : ""}`}>
            <li
              className={styles.dropdownItem} style={{ textDecoration: "none", color: "inherit", cursor: "pointer" }}
              onClick={() => handelrRouter('loging')}>Iniciar sesión
            </li>
            <li className={styles.dropdownItem} style={{ textDecoration: "none", color: "inherit", cursor: "pointer" }}
              onClick={() => handelrRouter('registrarse')} >Registrarse
            </li>

            <li className={styles.dropdownItem} style={{ textDecoration: "none", color: "inherit" }}
              onClick={() => handelrRouter('')} >Salir
            </li>

            <li className={styles.dropdownItem} style={{ textDecoration: "none", color: "inherit" }}
              onClick={routerMisProductos}>mis productos
            </li>


            {
              usuario?.rol == 'admin' ?
                <li className={styles.dropdownItem} style={{ textDecoration: "none", color: "inherit" }}
                  onClick={routerDashBoard}>Dashboard
                </li>
                : null
            }
          </ul>

          
        </div>

          <div>
            <Link style={{ textDecoration: "none", color: "inherit" }} href={usuario?`/cart`:'/home'}>
                <Cart4 size={30} /> <span className='text-white bg-danger rounded p-1'>{cartItemsCount}</span>
            </Link>
          </div>

        {!session ? null : (
            <div>
              <img src={session.user.image} alt="image" />
            </div>
          )}

      </div>
        {/* <form className="d-flex" role="search">
                  <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                  <button className="btn btn-outline-success" type="submit">Search</button>
                </form> */}

    </nav>
  )
}
