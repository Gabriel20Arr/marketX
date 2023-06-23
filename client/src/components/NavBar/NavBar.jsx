// 'use client'

// import Link from 'next/link';
// import Image from 'next/image';
// import logo from '../../images/MarketX-newlogo (2).png';
// import styles from "./NavBar.module.css";
// import { useRouter } from 'next/navigation';
// import React, { useState } from 'react';


// export default function Navigation({ currentPath }) {
//   const router = useRouter();
//   const handelrRouter = (value) => {
//     localStorage.clear();
//     router.push(`/${value}`)
//   }

//   const routerDashBoard = () => {
//     router.push('/admin')
//   }

//   const routerHome = () => {
//     router.push('/home')
//   }

//   const routerMisProductos = () => {
//     router.push('/misProductos')
//   }

//   const [isMenuOpen, setMenuOpen] = useState(false);

//   const toggleMenu = () => {
//     setMenuOpen(!isMenuOpen);
//   };

//   const usuarioJSON = localStorage.getItem('usuario');
//   const usuario = JSON.parse(usuarioJSON);
//   console.log(usuario.rol)

//   return (
//     <nav className={styles.container}>

//       <div className={styles.NavConteiner} >
//         <div>
//           <Image src={logo} className={styles.logo} onClick={routerHome} />
//         </div>

//         {/* <li className="nav-item">
//                     <Link className="nav-link" href="/favoritos">Productos favoritos</Link>
//                   </li> */}

//         {currentPath !== '/form' && (
//           <div className={styles.btn}>
//             <Link style={{ textDecoration: "none", color: "inherit" }} href="/form">Publicar Producto</Link>
//           </div>
//         )
//         }

//         {currentPath !== '/about' && (
//           <div className={styles.btn}>
//             <Link style={{ textDecoration: "none", color: "inherit" }} href="/about">Sobre MarketX</Link>
//           </div>
//         )
//         }

//         {/* <div className={styles.btn}>
//                     <Link style={{ textDecoration: "none", color: "inherit" }} href="/loging">Iniciar sesión</Link>
//                   </div> */}

//         {/* <div className={styles.btn}>
//                     <Link style={{ textDecoration: "none", color: "inherit" }} href="/registrarse">Registrarse</Link>
//                   </div> */}
//         {/* 
//                   <div className={styles.btnExit}>
//                     <Link style={{ textDecoration: "none", color: "inherit" }} href="/">Salir</Link>
//                   </div> */}

//         <div className={styles.dropdown}>
//           <button className={styles.dropdownToggle} onClick={toggleMenu}>
//             <h2>
//               |||
//             </h2>
//           </button>
//           <ul className={`${styles.dropdownMenu} ${isMenuOpen ? styles.show : ""}`}>
//             <li
//               className={styles.dropdownItem} style={{ textDecoration: "none", color: "inherit" }}
//               onClick={() => handelrRouter('loging')}>Iniciar sesión
//             </li>
//             <li className={styles.dropdownItem} style={{ textDecoration: "none", color: "inherit" }}
//               onClick={() => handelrRouter('registrarse')} >Registrarse
//             </li>
//             {/* { currentPath !== '/about' && (
//                     <li className={styles.dropdownItem}>
//                       <Link style={{ textDecoration: "none", color: "inherit" }} href="/about">Sobre MarketX</Link>
//                     </li>
//                     )} */}
//             <li className={styles.dropdownItem} style={{ textDecoration: "none", color: "inherit" }}
//               onClick={() => handelrRouter('')} >Salir
//             </li>
//             <li className={styles.dropdownItem} style={{ textDecoration: "none", color: "inherit" }}
//               onClick={routerMisProductos}>mis productos
//             </li>

//             {
//               usuario.rol == 'admin' ?
//                 <li className={styles.dropdownItem} style={{ textDecoration: "none", color: "inherit" }}
//                   onClick={routerDashBoard}>Dashboard
//                 </li>
//                 : null
//             }
//           </ul>
//         </div>

//         {/* <form className="d-flex" role="search">
//                   <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
//                   <button className="btn btn-outline-success" type="submit">Search</button>
//                 </form> */}

//       </div>
//     </nav>
//   )
// }

import Link from 'next/link';
import Image from 'next/image';
import logo from '../../images/MarketX-newlogo (2).png';
import styles from "./NavBar.module.css";
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';

export default function Navigation({ currentPath }) {
  const router = useRouter();
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const usuarioJSON = localStorage.getItem('usuario');
    const usuario = JSON.parse(usuarioJSON);
    setUsuario(usuario);
  }, []);

  const handelrRouter = (value) => {
    localStorage.clear();
    router.push(`/${value}`)
  }

  const routerDashBoard = () => {
    router.push('/admin')
  }

  const routerHome = () => {
    router.push('/home')
  }

  const routerMisProductos = () => {
    router.push('/misProductos')
  }

  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={styles.container}>
      <div className={styles.NavConteiner} >
        <div>
          <Image src={logo} className={styles.logo} onClick={routerHome} />
        </div>

        {/* Resto del código... */}
      </div>
    </nav>
  );
}