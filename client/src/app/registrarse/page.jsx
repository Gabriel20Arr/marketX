import { useDispatch, useSelector } from "react-redux"

export default function registrarse() {
  const prueba = useSelector((state)=>state.prueba);
  console.log(prueba);
  return (
    <div>Registrarse</div>
  )
}
