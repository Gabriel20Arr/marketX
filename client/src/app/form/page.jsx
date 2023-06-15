'use client'

import { useState } from "react";
import axios from "axios";

export default function CrearProducto(){
    const [form, setForm] = useState({
        titulo: '',
        categoria: '',
        imagen: '',
        descripcion: '',
        precio: '',
        cantidadVenta: '0'
    })

    const changeHandler = (event) => {
        const property = event.target.name;
        const value = event.target.value;

        setForm({...form, [property]: value})
    }

    const submitHandler = async (event) => {
        event.preventDefault();
        try {
          await axios.post("http://localhost:3001/Producto/crearProductos", form);
          setForm({
            titulo: "",
            categoria: '',
            imagen: '',
            descripcion: "",
            precio: '',
            cantidadVenta: ''
          });
          alert("Creacion Exitosa ");
        } catch (error) {
          alert("Esta actividad ya esta creada");
        }
      };

    return(
        <form onSubmit={submitHandler}>
            <div>
                <h3>Completa los siguientes datos para publicar un producto: </h3>
                <div>
                    <label htmlFor="">Título: </label>
                    <input type="text" name="titulo" value={form.titulo} onChange={changeHandler} />
                </div>
                <div>
                    <label htmlFor="">Categoría: </label>
                    <input type="text" name="categoria" value={form.categoria} onChange={changeHandler}/>
                </div>
                <div>
                    <label htmlFor="">Imagen: </label>
                    <input type="text" name="imagen" value={form.imagen} onChange={changeHandler}/>
                </div>
                <div>
                    <label htmlFor="">Precio (AR$): </label>
                    <input type="text" name="precio" value={form.precio} onChange={changeHandler}/>
                </div>
                <div>
                    <p>Descripción del producto: </p>
                    <textarea name="descripcion" id="" cols="60" rows="10" value={form.descripcion} onChange={changeHandler}></textarea>
                </div>
                <button type="submit">PUBLICAR</button>
            </div>
        </form>
    )
}