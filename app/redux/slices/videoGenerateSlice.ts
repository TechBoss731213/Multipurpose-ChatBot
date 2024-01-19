import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface VideoGenerate {
	history: string[];
	messageCount: number;
}

const initialState: VideoGenerate = {
	history: [],
	messageCount: 0,
};

const videoGenerateSlice = createSlice({
	name: 'videoGenerateSlice',
	initialState,
	reducers: {
		addMessage: (state, action: PayloadAction<string>) => {
			state.history.push(action.payload);
			state.messageCount += 1;
		},
	},
});

export const { addMessage } = videoGenerateSlice.actions;
export default videoGenerateSlice.reducer;