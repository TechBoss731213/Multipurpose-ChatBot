import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MCQState {
	history: string[];
	messageCount: number;
}

const initialState: MCQState = {
	history: [],
	messageCount: 0,
};

const mcqSlice = createSlice({
	name: 'mcq',
	initialState,
	reducers: {
		addMessage: (state, action: PayloadAction<string>) => {
			state.history.push(action.payload);
			state.messageCount += 1;
		},
	},
});

export const { addMessage } = mcqSlice.actions;
export default mcqSlice.reducer;