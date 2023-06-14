import Link from 'next/link';

export default function Navigation(){
    return (
    <ul>
        <li>
          <Link href="/home">Home</Link>
        </li>
        <li>
          <Link href="/">Cerrar sesión</Link>
        </li>
        {/* <li>
          <Link href="/services">Services</Link>
        </li> */}
    </ul>
    )
}