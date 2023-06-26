import style from "./About.module.css";
import Image from "next/image";
import Link from "next/link";
import logo from "../../images/solologo.png";
import { useSession } from "next-auth/react";
import Loading from "@/src/components/Loaders/Loaders";

export default function About() {
  const { status } = useSession;

  if (status === "loading") {
    return <Loading />;
  }
  return (
    <div className={style.container}>
      <div className={style.atrasCont}>
        <Link href={"/home"} className={style.atras}>
          Atrás
        </Link>
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
        <h2 className={style.title}>Nuestra misión</h2>
        <p className={style.text}>
          Satisfacer con excelencia las necesidades de quienes pertenecen o
          desean pertenecer al mundo gamer.
        </p>
        <h2 className={style.title}>Nuestra visión</h2>
        <p className={style.text}>
          Ser el líder total en la compra y venta de productos tecnológicos, que
          genere valor económico, social y ambiental sostenible, planificando e
          implementando modelos de negocio innovadores.
        </p>
      </div>
      <div className={style.imgContainer}>
        <Image src={logo} alt="logo" />
      </div>
    </div>
  );
}
