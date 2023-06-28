import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { METHODS } from 'http';
import { url } from 'inspector';

type Product = {
    id: string,
    titulo: string,
    categoria: string,
    imagen: string,
    descripcion: string,
    precio: string,
    cantidadVenta: string,
    stock: number,
    usuario: string
}

export const productsApi = createApi({
    reducerPath: 'productAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://marketx-production.up.railway.app/'
    }),
    endpoints: (builder) => ({
        getProducts: builder.query<Product[], null>({
            query: () => 'Producto'
        }),
        getProductsUsers: builder.query<Product[], null>({
            query: () => 'Producto/usuario'
        }),
        getProductsById: builder.query<Product, {id: string}>({
            query: ({id}) => `Producto/${id}`
        })       
    })
})

export const {useGetProductsQuery, useGetProductsByIdQuery, useGetProductsUsersQuery } = productsApi
