// import React from 'react';
// import styles from './Card.module.css'; // Importa el archivo de estilos

// const Card = ({ image, name, linkedin, github }) => {
//   return (
//     <div className={styles.cont}>
//       <h3 className={styles.name}>{name}</h3>
//       <div className={styles.imageContainer}>
//         <img src={image} alt={name} className={styles.img} />
//       </div>
//       <div className={styles.contButtons}>
//         <a href={linkedin} target="_blank" rel="noopener noreferrer" className={styles.addButton}>
//           <img src="/linkedin.png" alt="LinkedIn" className={styles.disponible} />
//         </a>
//         <a href={github} target="_blank" rel="noopener noreferrer" className={styles.addButton}>
//           <img src="/github.png" alt="GitHub" className={styles.disponible} />
//         </a>
//       </div>
//       <div className={styles.Countprecio}>
//         <div className={styles.Cdetalle}>
//           <div className={styles.detalle}>Detalles</div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Card;

// import React from 'react';
// import styles from './Card.module.css'; // Importa el archivo de estilos
// import Image from 'next/image'; // Importa la etiqueta Image de Next.js

// const Card = ({ image, name, linkedin, github }) => {
//   return (
//     <div className={styles.cont}>
//       <h3 className={styles.name}>{name}</h3>
//       <div className={styles.imageContainer}>
//         <Image src={image} alt={name} className={styles.img} width={500} height={500} />
//       </div>
//       <div className={styles.contButtons}>
//         <a href={linkedin} target="_blank" rel="noopener noreferrer" className={styles.addButton}>
//           <Image src="/linkedin.webp" alt="LinkedIn" className={styles.disponible} width={24} height={24} />
//         </a>
//         <a href={github} target="_blank" rel="noopener noreferrer" className={styles.addButton}>
//           <Image src="/github.webp" alt="GitHub" className={styles.disponible} width={24} height={24} />
//         </a>
//       </div>
//       <div className={styles.Countprecio}>
//         <div className={styles.Cdetalle}>
//           <div className={styles.detalle}>Detalles</div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Card;


import React from 'react';
import styles from './Card.module.css'; // Importa el archivo de estilos
import Image from 'next/image'; // Importa la etiqueta Image de Next.js
import icono1 from "./logos/linkedin.png"
import icono2 from "./logos/github.png"

const Card = ({ image, name, linkedin, github }) => {
  return (
    <div className={styles.cont}>
      <h3 className={styles.name}>{name}</h3>
      <div className={styles.imageContainer}>
        <Image src={image} alt={name} className={styles.img} width={500} height={500} />
      </div>
      <div className={styles.contButtons}>
        <a href={linkedin} target="_blank" rel="noopener noreferrer" className={styles.addButton}>
          <Image src={icono1} alt="LinkedIn" className={styles.disponible} width={24} height={24} />
        </a>
        <a href={github} target="_blank" rel="noopener noreferrer" className={styles.addButton2}>
          <Image src={icono2} alt="GitHub" className={styles.disponible} width={24} height={24} />
        </a>
      </div>
      <div className={styles.Countprecio}>
        <div className={styles.Cdetalle}>
         
        </div>
      </div>
    </div>
  );
};

export default Card;