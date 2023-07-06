
"use client"
//////////////////

import style from "./About.module.css";
import Link from "next/link";
// import logo from "../../images/solologo.png";
import { useSession } from "next-auth/react";
import Loading from "@/src/components/Loaders/Loaders";
import { useRouter } from "next/navigation";
import Card from "./Tarjetas/Card";
import santiImage from "./Tarjetas/imagenes/santi.webp.jpeg";
import gabiImage from "./Tarjetas/imagenes/gabriel.webp.jpeg.jpeg"
import juliImage from "./Tarjetas/imagenes/julian.webp.jpeg"
import nachoImage from "./Tarjetas/imagenes/nacho.webp.jpeg"
import daniel from "./Tarjetas/imagenes/daniel.webp.jpg"
import leo from "./Tarjetas/imagenes/leo.webp.jpg"


export default function About() {
  const { status } = useSession;
  const router = useRouter();
  if (status === "loading") {
    return <Loading />;
  }
  const goBack = () => {
		router.back();
	  };
  return (
    <div className={style.container}>
      
          <div >
       			 <button onClick={goBack} className={style.link}>Volver</button>
      		</div>

      <div className={style.textContainer}>
        <h1 className={style.title}>Sobre nosotros</h1>
        <p className={style.text}>
          MarketX nació con el propósito de facilitar la compra y venta de
          productos tecnológicos. Fue pensada para que todas las personas del
          mundo gamer puedan encontrar todo lo que necesiten, como así también,
          vender todo aquello que ya no usen y se encuentre en buenas
          condiciones. Esto promueve a los usuarios a no desechar los productos
          y comercializarlos para que llegue a alguien que le continúe dando
          utilidad, ayudando también a generar menos residuos tecnológicos.
        </p>
        <h1 className={style.title}>Nuestra misión</h1>
        <p className={style.text}>
          Satisfacer con excelencia las necesidades de quienes pertenecen o
          desean pertenecer al mundo gamer.
        </p>
        <h1 className={style.title}>Nuestra visión</h1>
        <p className={style.text}>
          Ser el líder total en la compra y venta de productos tecnológicos, que
          genere valor económico, social y ambiental sostenible, planificando e
          implementando modelos de negocio innovadores.
        </p>
        

      <div>
        <h1 className={style.title}>Desarrolladores</h1>
        <div className={style.cardList}> {/* Usar corchetes para acceder a la clase con guiones */}
        <Card
          image={nachoImage}
          name="Ignacio Cardozo"
          linkedin="https://www.linkedin.com/in/ignacio-leonel-cardozo-b34307244/"
          github="https://github.com/nacho-bootcamp"
        />
          <Card
            image={santiImage} // Usar la variable de imagen importada
            name="Santiago Ceaglio"
            linkedin="https://www.linkedin.com/in/santiago-ceaglio-b1a89b263/"
            github="https://github.com/santiceaglio"
              />
          <Card
            image={gabiImage} // Usar la variable de imagen importada
            name="Gabriel Arroyo"
            linkedin="https://www.linkedin.com/in/2002-gabriel-arroyo?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BvPeNUZJfRmGreidcRrBQhg%3D%3D"
            github="https://github.com/Gabriel20Arr"
            />
          <Card
            image={daniel}
            name="Daniel Serrano"
            linkedin="https://www.linkedin.com/in/daniel-serrano-4021bb205"
            github="https://github.com/DSerranoG24"
          />
          <Card
            image={juliImage} // Usar la variable de imagen importada
            name="Julian Serante"
            linkedin="https://www.linkedin.com/in/juli%C3%A1n-agust%C3%ADn-serante-742436124"
            github="https://github.com/JulianSerante"
          />
          <Card
            image={leo}
            name="Leonel Ostrower"
            linkedin="https://www.linkedin.com/in/leonel-ostrower-30aa781b9/"
            github="https://github.com/ostle"
          />
        </div>
      </div>
     </div>
     {/* <div className={style.imgContainer}>
        <Image src={logo} alt="logo" />
      </div> */}
    </div>

      
  );
}

///////////////////////

// import style from "./About.module.css";
// import Image from "next/image";
// import Link from "next/link";
// import logo from "../../images/solologo.png";
// import { useSession } from "next-auth/react";
// import Loading from "@/src/components/Loaders/Loaders";
// import Card from "./Tarjetas/Card"
// import imagenes from "./Tarjetas/imagenes"
// // import React from "react";

// export default function About() {
//   const { status } = useSession;

//   if (status === "loading") {
//     return <Loading />;
//   }
//   return (
//     <div className={style.container}>
//       <div className={style.atrasCont}>
//         <Link href={"/home"} className={style.atras}>
//           Atrás
//         </Link>
//       </div>

//       <div className={style.textContainer}>
//         <h1 className={style.title}>Sobre nosotros</h1>
//         <p className={style.text}>
//           MarketX nació con el propósito de facilitar la compra y venta de
//           productos tecnológicos. Fue pensada para que todas las personas del
//           mundo gamer puedan encontrar todo lo que necesiten, como así también,
//           vender todo aquello que ya no usen y se encuentre en buenas
//           condiciones. Esto promueve a los usuarios a no desechar los productos
//           y comercializarlos para que llegue a alguien que le continúe dando
//           utilidad, ayudando también a generar menos residuos tecnológicos.
//         </p>
//         <h2 className={style.title}>Nuestra misión</h2>
//         <p className={style.text}>
//           Satisfacer con excelencia las necesidades de quienes pertenecen o
//           desean pertenecer al mundo gamer.
//         </p>
//         <h2 className={style.title}>Nuestra visión</h2>
//         <p className={style.text}>
//           Ser el líder total en la compra y venta de productos tecnológicos, que
//           genere valor económico, social y ambiental sostenible, planificando e
//           implementando modelos de negocio innovadores.
//         </p>
//       </div>
//       <div className={style.imgContainer}>
//         <Image src={logo} alt="logo" />
//       </div>
//       <div>
//       <h1>Lista de personas</h1>
//       <div className="card-list">
//         <Card
//           image="./imagenes/santi.webp.jpeg"
//           name="Persona 1"
//           linkedin="https://www.linkedin.com/in/persona1/"
//           github="https://github.com/persona1"
//         />
//         <Card
//           image="/person2.jpg"
//           name="Persona 2"
//           linkedin="https://www.linkedin.com/in/persona2/"
//           github="https://github.com/persona2"
//         />
//       </div>
//     </div>
//     </div>
    
//   );
// }
// import React from 'react';
// import Card from '../components/Card';

// const IndexPage = () => {
//   return (
   
//   );
// };

// export default IndexPage;