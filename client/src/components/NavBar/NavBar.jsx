import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../../images/MarketX-newlogo (2).png';
import styles from "./NavBar.module.css";

export default function Navigation() {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={styles.container}>
      <div className={styles.NavConteiner}>
        <div>
          <Link href="/home">
            <Image src={logo} className={styles.logo} />
          </Link>
        </div>

        <div className={styles.btn}>
          <Link style={{ textDecoration: "none", color: "inherit" }} href="/form">Publicar Producto</Link>
        </div>

        <div className={styles.btn}>
          <Link style={{ textDecoration: "none", color: "inherit" }} href="/">Cerrar sesión</Link>
        </div>

        <div className={styles.dropdown}>
          <button className={styles.dropdownToggle} onClick={toggleMenu}>
            <h2>
              |||
            </h2>
          </button>
          <ul className={`${styles.dropdownMenu} ${isMenuOpen ? styles.show : ""}`}>
            <li className={styles.dropdownItem}>
              <Link href="/">Home</Link>
            </li>
            <li className={styles.dropdownItem}>
              <Link href="/about">About</Link>
            </li>
            <li className={styles.dropdownItem}>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </div>
        
      </div>
    </nav>
  );
}
