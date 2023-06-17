import Link from 'next/link';
import styles from "./NavBar.module.css";

export default function Navigation(){
    return (
      <nav className={styles.container}>

              <div className={styles.NavConteiner} >
                <div className={styles.btn}>
                  <Link style={{ textDecoration: "none", color: "inherit" }} className="navbar-brand" href="/home">MarketX</Link>
                </div>

                  {/* <li className="nav-item">
                    <Link className="nav-link" href="/favoritos">Productos favoritos</Link>
                  </li> */}

                  <div className={styles.btn}>
                    <Link style={{ textDecoration: "none", color: "inherit" }} href="/form">Publicar Producto</Link>
                  </div>

                  <div className={styles.btn}>
                    <Link style={{ textDecoration: "none", color: "inherit" }} href="/">Cerrar sesión</Link>
                  </div>


                {/* <form className="d-flex" role="search">
                  <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                  <button className="btn btn-outline-success" type="submit">Search</button>
                </form> */}
            
              </div>
      </nav>
    )
}