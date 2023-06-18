'use client'

import { useState } from "react";
import validation from './validation';
import axios from "axios";
import style from './Form.module.css';

export default function CrearProducto() {
  const [url, setUrl] = useState(true);
  const [image,setImage]=useState();
  const [form, setForm] = useState({
    titulo: "",
    categoria: "",
    image: '',
    imagenDowland: image,
    descripcion: "",
    precio: "",
    cantidadVenta: "0"
  });

  const [errors, setErrors] = useState({
    titulo: "",
    categoria: "",
    image: "",
    imagenDowland: "",
    descripcion: "",
    precio: "",
    cantidadVenta: ""
  });

  const changeHandler = (event) => {
    let { value, name, files, type } = event.target;
  
    if (type === 'file') {
      const file = files[0];
      setImage(file);
      setForm({ ...form, [name]: file });
    } else {
      setForm({ ...form, [name]: value });
    }
  
    setErrors(validation({ ...form, [name]: value }));
  };
  
  
  const submitHandler = async (event) => {
      event.preventDefault();
      try {
        // Enviar la solicitud a través de axios
        await axios.post("http://localhost:3001/Producto/crearProductos", form);
        setImage();
        setForm({
            titulo: "",
            categoria: "",
            image: "",
            imagenDowland:image,
            descripcion: "",
            precio: "",
            cantidadVenta: ""
        });
        alert("Creacion Exitosa ");
    } catch (error) {
        alert("Esta actividad ya esta creada");
    }
};

const change = () => {
    setUrl((prevUrl) => !prevUrl);
    setForm({...form,image:''});
    setImage()
};

const renderImageInput = () => {
    if (url) {
        return (
            <>
          <input
            type="text"
            name="image"
            className={style.formInput}
            value={form.image}
            onChange={changeHandler}
            />
          {errors.image && <span className={style.errors}>{errors.image}</span>}
          <br />
          <p onClick={change}>Subir imagen local</p>
        </>
      );
    }
    return (
        <>
        <input
          type="file"
          name="imagenDowland"
          placeholder="File"
          onChange={changeHandler}
          />
        {errors.image && <span className={style.errors}>{errors.image}</span>}
        <br />
        <p onClick={change}>Subir imagen por url</p>
      </>
    );
};
console.log(form);
return (
    <form onSubmit={submitHandler}>
      <div>
        <img src={image} alt="" />
        <h3>Completa los siguientes datos para publicar un producto: </h3>
        <div>
          <label htmlFor="titulo">Título: </label>
          <input
            type="text"
            name="titulo"
            id="titulo"
            className={style.formInput}
            value={form.titulo}
            onChange={changeHandler}
          />
          {errors.titulo && <span className={style.errors}>{errors.titulo}</span>}
        </div>
        <div>
          <label htmlFor="categoria">Categoría: </label>
          <input
            type="text"
            name="categoria"
            id="categoria"
            className={style.formInput}
            value={form.categoria}
            onChange={changeHandler}
          />
          {errors.categoria && <span className={style.errors}>{errors.categoria}</span>}
        </div>
        <div>
          <label htmlFor="imagen">Imagen: </label>
          {renderImageInput()}
        </div>
        <div>
          <label htmlFor="precio">Precio (AR$): </label>
          <input
            type="text"
            name="precio"
            id="precio"
            className={style.formInput}
            value={form.precio}
            onChange={changeHandler}
          />
          {errors.precio && <span className={style.errors}>{errors.precio}</span>}
        </div>
        <div>
          <p>Descripción del producto: </p>
          <textarea
            name="descripcion"
            id="descripcion"
            className={style.formInput}
            cols="60"
            rows="10"
            value={form.descripcion}
            onChange={changeHandler}
          ></textarea>
          {errors.descripcion && <p className={style.errors}>{errors.descripcion}</p>}
        </div>
        <button
          type="submit"
          className={style.submitButton}
          disabled={errors.titulo || errors.categoria || errors.imagen || errors.precio || errors.descripcion}
        >
          PUBLICAR
        </button>
      </div>
    </form>
  );
}


