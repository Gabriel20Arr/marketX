import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

type Ventas = {
    vendedor: object,
    comprador: object,
    monto: string,
    fecha: Date
};

export const ventasApi = createApi({
	reducerPath: 'ventasApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://marketx-production.up.railway.app/',
	}),
	endpoints: (builder) => ({
		getVentas: builder.query<Ventas[], null>({
			query: () => 'Ventas',
		}),
	}),
});

export const { useGetVentasQuery } = ventasApi;
