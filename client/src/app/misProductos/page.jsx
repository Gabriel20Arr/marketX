"use client";

import { useEffect } from "react";
import { useGetProductsUsersQuery } from "@/src/redux/services/productApi";
import Cards from "@/src/components/Cards/Cards";

export default function MisProductos() {
  const { data, refetch } = useGetProductsUsersQuery();

  useEffect(() => {
    refetch();
  }, [refetch]);
  
  var usuario = {};
  
  if (typeof window !== 'undefined') {
    // Código que accede a localStorage aquí
    const usuarioJSON = localStorage.getItem("usuario");
    usuario = JSON.parse(usuarioJSON);
  }
  
  const productos = data && data.find((use) => use.nombre === usuario?.correo);
  const apiProductos = productos ? productos.productos : [];

  return (
    <div>
      <Cards currentItems={apiProductos} />
    </div>
  );
}
