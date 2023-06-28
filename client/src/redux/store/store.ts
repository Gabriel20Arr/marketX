import { configureStore } from '@reduxjs/toolkit';
import counterSlice from '../features/countSlice';
import productReducer from '../features/productSlice';
import sortReducer from '../features/sortSlice'; // Importa el slice sortSlice
import { userApi } from '../services/userApi';
import { productsApi } from '../services/productApi';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import blockedUsersReducer from '../features/blockedUsersSlice';
import { ventasApi } from '../services/ventasApi';

export const store = configureStore({
	reducer: {
		blockedUsers: blockedUsersReducer,
		counter: counterSlice, // Cambia el nombre a 'counter'
		product: productReducer, // Cambia el nombre a 'product'
		sort: sortReducer,
		[userApi.reducerPath]: userApi.reducer,
		[productsApi.reducerPath]: productsApi.reducer,
		[ventasApi.reducerPath]: ventasApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat([userApi.middleware, productsApi.middleware, ventasApi.middleware]),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
