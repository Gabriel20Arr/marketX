// import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

// type User = {
//     nombre:string
//     correo:string
//     contraseña:string,
//     rol:string
// }

// export const userApi = createApi({
//     reducerPath: 'userAPI',
//     baseQuery: fetchBaseQuery({
//         baseUrl: 'http://localhost:3001/'
//     }),
//     endpoints: (builder)=>({
//         getUsers: builder.query<User[],null>({
//             query: ()=>'Usuario',
//         }),
//         getUserById: builder.query<User, {id:string}>({
//             query:({id})=> `Usuario/${id}`
//         }),
//         putUserCar: builder.mutation<void, { body: User }>({
//             query: ({ body }) => ({
//               url: `Usuario`,
//               method: 'PUT',
//               body,
//             }),
//         })
//     })
// })

// export const {useGetUsersQuery, useGetUserByIdQuery, usePutUserCarMutation}=userApi;
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

type User = {
	_id: string;
	nombre: string;
	correo: string;
	contraseña: string;
	rol: string;
};

export const userApi = createApi({
	reducerPath: 'userAPI',
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://marketx-production.up.railway.app/',
	}),
	endpoints: (builder) => ({
		getUsers: builder.query<User[], null>({
			query: () => 'Usuario',
		}),
		getUserById: builder.query<User, { id: string }>({
			query: ({ id }) => `Usuario/${id}`,
		}),
		putUserCar: builder.mutation<void, { body: User }>({
			query: ({ body }) => ({
				url: 'Usuario',
				method: 'PUT',
				body,
			}),
		}),
	}),
});

export const { useGetUsersQuery, useGetUserByIdQuery, usePutUserCarMutation } =
	userApi;
