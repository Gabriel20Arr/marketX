import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

type Product = {
    id: number,
    titulo: string,
    categoria: string,
    imagen: string,
    descripcion: string,
    precio: string,
    cantidadVenta: string
}

export const productsApi = createApi({
    reducerPath: 'productAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://jsonplaceholder.typicode.com/posts'
    }),
    endpoints: (builder) => ({
        getProducts: builder.query<Product[], null>({
            query: () => 'productos'
        }),
        getProductsById: builder.query<Product, {id: string}>({
            query: ({id}) => `productos/${id}`
        })
    })
})

export const {useGetProductsQuery, useGetProductsByIdQuery} = productsApi