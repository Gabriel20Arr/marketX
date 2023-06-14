import Productos from '../components/Productos/Productos';

async function fetchProducts(){
  const res = await fetch('https://fakestoreapi.com/products')
  const data = await res.json()
  return data;
}

export default async function HomePage() {
  const productos = await fetchProducts();

  return (
    <div>
      <h1>ESTA ES LA HOME PAGE</h1>
      <Productos productos={productos} />
    </div>
  )
}

