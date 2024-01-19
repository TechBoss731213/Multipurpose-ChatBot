import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ImageGenerate {
	history: string[];
	messageCount: number;
}

const initialState: ImageGenerate = {
	history: [],
	messageCount: 0,
};

const imageGenerateSlice = createSlice({
	name: 'imageGenerateSlice',
	initialState,
	reducers: {
		addMessage: (state, action: PayloadAction<string>) => {
			state.history.push(action.payload);
			state.messageCount += 1;
		},
	},
});

export const { addMessage } = imageGenerateSlice.actions;
export default imageGenerateSlice.reducer;