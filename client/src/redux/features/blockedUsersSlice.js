import { createSlice } from '@reduxjs/toolkit';

const blockedUsersSlice = createSlice({
	name: 'blockedUsers',
	initialState: [],
	reducers: {
		addBlockedUser: (state, action) => {
			state.push(action.payload);
		},
	},
});

export const { addBlockedUser } = blockedUsersSlice.actions;
export default blockedUsersSlice.reducer;
