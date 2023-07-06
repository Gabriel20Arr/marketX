"use client"

import Link from "next/link";
import styles from "./NavBar.module.css";
import React, { useContext, useEffect, useState } from "react";
import { Cart4 } from "react-bootstrap-icons";
import { Store } from "@/src/utils/Store";
import { useRouter, usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { NavDropdown } from 'react-bootstrap';
import { useGetUsersQuery } from "@/src/redux/services/userApi";
import axios from 'axios';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';


export default function Navigation() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const path = usePathname()
  const image = 'https://res.cloudinary.com/dmtzjtgy8/image/upload/v1687989698/MarketX-newlogo__2_-removebg-preview_jgi5mm.png'

  const [menuOpen, setMenuOpen] = useState(false);

  const objeto = {
    nombre: session?.user.name,
    correo: session?.user.email,
    contraseña: "65564521-44654894sda",
  };

  const { data, refetch } = useGetUsersQuery(null);

  useEffect(() => {
    refetch();
  }, []);
  const existente = data?.find((user) => user.correo === session?.user.email);

  const google = async () => {
    if (existente) {
      const guardadoString = JSON.stringify(existente);
      localStorage.setItem("usuario", guardadoString);
    } else {
      const url = await axios
        .post("https://marketx-production.up.railway.app/usuario", objeto)
        .then((result) => {
          const guardadoString = JSON.stringify(url);
          localStorage.setItem("usuario", guardadoString);
          return result.data;
        })
        .catch((error) => error);
    }
  };
  let user = 0;
  if (typeof window !== 'undefined') {
    // Código que accede a localStorage aquí
    const userJSON = localStorage.getItem("usuario") ?? null;
    user = JSON.parse(userJSON);
  }

  if (!user) {
    google();
  }

  const handelrRouter = (value) => {
    localStorage.clear();
    router.push(`/${value}`);
  };

  const { state, dispatch } = useContext(Store);
  useEffect(() => {
    dispatch({ type: "..." });
  }, []);

  const { cart } = state;

  const [cartItemsCount, setCartItemsCount] = useState(0);

  useEffect(() => {
    setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
  }, [cart.cartItems]);

  const routerHome = () => {
    router.push("/home");
  };

  const routerDashBoard = () => {
    router.push("/admin");
  };

  const routerMisProductos = () => {
    router.push("/misProductos");
  };

  const routerMisVentas = () => {
		router.push('/misVentas');
	};

	const routerMisCompras = () => {
		router.push('/misCompras');
	};

  const handlerSalir = async ()=>{
    localStorage.clear()
    await signOut({ callbackUrl: 'http://localhost:3000/' })
    // router.push('/')
  }

  if (status === "loading") {
    return null;
  }

  const usuarioJSON = localStorage.getItem("usuario");
  const usuario = JSON.parse(usuarioJSON);

  const handlePublicar = ()=>{
    if (usuario.correo === "invitado@gmail.com") {
      Swal.fire({
				title: 'Debes tener una cuenta para publicar un producto',
				showDenyButton: true,
				showCancelButton: true,
				confirmButtonText: 'Registrarse',
				denyButtonText: `Iniciar Sesión`,
			  }).then((result) => {
				if (result.isConfirmed) {
				  router.push('/registrarse');
				} else if (result.isDenied) {
				  router.push('/login');
				}
			  });
			  return
    }
    router.push("/form")
  }

  return (
    <nav style={{backgroundColor: "#030a32"}} class="navbar navbar-expand-lg" data-bs-theme="dark">
      <div class="container-fluid">
        <div style={menuOpen ? {paddingLeft: '20px' ,paddingRight: '30px', paddingBottom: '20px', marginRight: '10px' } : {paddingRight: '30px', marginRight: '10px', borderRight: '2px solid white'}}>
          <Link href="/home">
            <img src={image} alt='Logo' width={'135'} height={'90'} />
          </Link>
        </div>

        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation" onClick={() => setMenuOpen(!menuOpen)}>
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class={`collapse navbar-collapse ${menuOpen ? 'show' : ''}`} id="navbarSupportedContent" style={menuOpen ? {fontSize: '24px', marginRight: '15px', paddingTop: '15px', paddingRight: '10px', display: 'flex', justifyContent: 'right', borderTop: '2px solid white'} : {fontSize: '24px', marginRight: '15px', paddingRight: '10px'}}>

          <ul class="navbar-nav mr-auto">
            <li class="nav-item">
            {path !== "/home" && (
                <div>
                  <Link
                    class="nav-link link-body-emphasis"
                    style={{ textDecoration: "none", marginLeft: '20px' }}
                    href="/home"
                  >
                    Home
                  </Link>
                </div>
              )}
            </li>
            <li class="nav-item">
              {path !== "/form" && (
                <div>
                  {/* <Link
                    class="nav-link link-body-emphasis"
                    style={{ textDecoration: "none", marginLeft: '30px' }}
                    href={(usuario.correo === "invitado@gmail.com") ?  "/registrarse":"/form" }
                  >
                    Publicar Producto
                  </Link> */}
                  <button className={styles.publicar} onClick={handlePublicar}>
                    Publicar Producto
                  </button>
                </div>
              )}
            </li>
            <li class="nav-item">
              {path !== "/about" && (
                <div>
                  <Link
                    class="nav-link link-body-emphasis"
                    style={{ textDecoration: "none", marginLeft: '20px' }}
                    href="/about"
                  >
                    Sobre MarketX
                  </Link>
                </div>
              )}
            </li>
            {/* <li class="nav-item">
              <a class="nav-link disabled">Disabled</a>
            </li> */}
          </ul>

          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
                <NavDropdown title="Menu" id="collasible-nav-dropdown" class="nav-link link-body-emphasis" style = {{marginRight: '20px', color: 'white'}}>
                  { usuario &&
                  <NavDropdown.Item 
                    style={{fontSize: '20px'}} 
                    onClick={routerMisProductos}
                  >
                    Mis productos
                  </NavDropdown.Item>
                  }

                  <NavDropdown.Item 
                    style={{fontSize: '20px'}} 
                    onClick={routerMisVentas}
                  >
                    Mis Ventas
                  </NavDropdown.Item>

                  <NavDropdown.Item 
                    style={{fontSize: '20px'}} 
                    onClick={routerMisCompras}
                  >
                    Mis Compras
                  </NavDropdown.Item>
                  
                  {usuario?.rol == "admin" ? (
                    <NavDropdown.Item 
                      style={{fontSize: '20px'}} 
                      onClick={routerDashBoard}
                    >
                      Dashboard
                    </NavDropdown.Item>
                  ) : null}
                  
                  
                  { ((usuario || (usuario?.direccion === "google")) && (usuario.correo !== "invitado@gmail.com") ) ? (
                    <NavDropdown.Item 
                    style={{fontSize: '20px'}}
                    onClick={ handlerSalir }
                    >
                    Cerrar sesión
                  </NavDropdown.Item>
                    ) : (
                      <div>
                        <NavDropdown.Item
                          style={{fontSize: '20px'}} 
                          onClick={() => handelrRouter('login')}
                          >
                          Iniciar sesión
                        </NavDropdown.Item>
                        <NavDropdown.Item
                          style={{fontSize: '20px'}} 
                          onClick={() => handelrRouter('registrarse')}
                          >
                          Registrarse
                        </NavDropdown.Item>
                      </div>
                    )
                  }
                  { (!usuario || (usuario.correo === "invitado@gmail.com")) ? 
                  <NavDropdown.Divider /> &&
                  <NavDropdown.Item
                    style={{fontSize: '20px'}} 
                    onClick={ () => handelrRouter('') }
                  >
                    Salir
                  </NavDropdown.Item>
                  : null
                  }

                </NavDropdown>
            </li>

            <li class="nav-item d-flex">
                  <Link
                    class="nav-link link-body-emphasis"
                    style={{ textDecoration: "none" }}
                    href={usuario ? `/cart` : "/home"}
                  >
                    <Cart4 size={30} />{" "}
                    <span className="text-white bg-danger rounded p-1">
                      {cartItemsCount}
                    </span>
                  </Link>
            </li>

            <li>
                {!session ? null : (
                  <div>
                    <img className={styles.img} src={session.user.image} alt="logo" />
                  </div>
                )}
              </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}