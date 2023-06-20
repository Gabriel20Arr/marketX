<<<<<<< HEAD
=======
// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
// 	sortOrder: 'title', // Orden inicial por título
// };

// const sortSlice = createSlice({
// 	name: 'sort',
// 	initialState,
// 	reducers: {
// 		setSortOrder: (state, action) => {
// 			state.sortOrder = action.payload;
// 		},
// 	},
// });

// export const { setSortOrder } = sortSlice.actions;

// export default sortSlice.reducer;

>>>>>>> f24094d22adacd1c300c5d303a860c7244ecb257
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	sortOrder: 'title', // Orden inicial por título
};

const sortSlice = createSlice({
	name: 'sort',
	initialState,
	reducers: {
		setSortOrder: (state, action) => {
			state.sortOrder = action.payload;
		},
	},
});

export const { setSortOrder } = sortSlice.actions;

export default sortSlice.reducer;
