import { configureStore } from '@reduxjs/toolkit';
import counterSlice from '../features/countSlice';
import productReducer from '../features/productSlice';
import sortReducer from '../features/sortSlice'; // Importa el slice sortSlice
import { userApi } from '../services/userApi';
import { productsApi } from '../services/productApi';
import { setupListeners } from '@reduxjs/toolkit/dist/query';

export const store = configureStore({
	reducer: {
		counter: counterSlice, // Cambia el nombre a 'counter'
		product: productReducer, // Cambia el nombre a 'product'
		sort: sortReducer, // Agrega el slice 'sortSlice'
		[userApi.reducerPath]: userApi.reducer,
		[productsApi.reducerPath]: productsApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat([userApi.middleware, productsApi.middleware]),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
