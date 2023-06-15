import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

type User = {
    nombre:string
    correo:string
    contraseña:string,
    rol:string
}

export const userApi = createApi({
    reducerPath: 'userAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3001/'
    }),
    endpoints: (builder)=>({
        getUsers: builder.query<User[],null>({
            query: ()=>'Usuario'
        }),
        getUserById: builder.query<User, {id:string}>({
            query:({id})=> `Usuario/${id}`
        })
    })
})

export const {useGetUsersQuery, useGetUserByIdQuery}=userApi; 