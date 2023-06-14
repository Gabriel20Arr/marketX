import Paginacion from "../components/Paginacion/Paginacion"

const fecthPost = () => {
  return fetch('https://jsonplaceholder.typicode.com/posts')
  .then(res => res.json());
};

const inicio = async () => {

  const items = await fecthPost();

  return (
    <>
      <h1>INICIO / HOME</h1>

      <Paginacion items={items} />
    </>
  );
};

export default inicio;