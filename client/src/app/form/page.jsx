'use client'

import { useState } from "react";
import validation from './validation';
import axios from "axios";
import style from './Form.module.css';
import Image from "next/image";
import logo from "../../images/MarketX-newlogo fondo blanco.png";

export default function CrearProducto(){
    const [form, setForm] = useState({
        titulo: '',
        categoria: '',
        imagen: '',
        descripcion: '',
        precio: '',
        cantidadVenta: '0'
    })

    const [errors, setErrors] = useState({
        titulo: '',
        categoria: '',
        imagen: '',
        descripcion: '',
        precio: '',
        cantidadVenta: ''
    })

    const changeHandler = (event) => {
        const property = event.target.name;
        const value = event.target.value;

        setForm({...form, [property]: value})
        setErrors(validation({...form, [property]: value}))
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
        <div className={style.container}>
        <form onSubmit={submitHandler}>
            <div>
                <h3 className={style.consigna}>Completa los siguientes datos para publicar un producto: </h3>
                <div>
                    <label className={style.formLabel} htmlFor="">Título: </label>
                    <input type="text" name="titulo" className={style.formInput} value={form.titulo} onChange={changeHandler} />
                    {errors.titulo && <span className={style.errors}>{errors.titulo}</span>}
                </div>
                <div>
                    <label className={style.formLabel} htmlFor="">Categoría: </label>
                    <input type="text" name="categoria" className={style.formInput} value={form.categoria} onChange={changeHandler}/>
                    {errors.categoria && <span className={style.errors}>{errors.categoria}</span>}
                </div>
                <div>
                    <label className={style.formLabel} htmlFor="">Imagen: </label>
                    <input type="text" name="imagen" className={style.formInput} value={form.imagen} onChange={changeHandler}/>
                    {errors.imagen && <span className={style.errors}>{errors.imagen}</span>}
                </div>
                <div>
                    <label className={style.formLabel} htmlFor="">Precio (AR$): </label>
                    <input type="text" name="precio" className={style.formInput} value={form.precio} onChange={changeHandler}/>
                    {errors.precio && <span className={style.errors}>{errors.precio}</span>}
                </div>
                <div>
                    <p className={style.formLabel}>Descripción del producto: </p>
                    {errors.descripcion && <p className={style.errorsDesc}>{errors.descripcion}</p>}
                    <textarea name="descripcion" className={style.formInput} id="" cols="60" rows="10" value={form.descripcion} onChange={changeHandler}></textarea>
                </div>
                <button type="submit" className={style.submitButton} disabled={errors.titulo || errors.categoria || errors.imagen || errors.precio || errors.descripcion}>PUBLICAR</button>
            </div>
        </form>

        <div className={style.imgContainer}>
            <h1 className={style.text}>Publique y venda un producto de forma totalmente gratuita en</h1>
            <Image src={logo} className={style.img} />
        </div>

        </div>
    )
}