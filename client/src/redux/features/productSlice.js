import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: []
}

export const productSlice = createSlice({
    name: 'getProducts',
    initialState,
    reducers:{
        getProducts: (state) => {

        }
    }
})

export const {getProducts} = productSlice.actions;

export default productSlice.reducer;