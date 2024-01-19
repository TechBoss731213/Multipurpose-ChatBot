import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ImageGenerateHTML {
	history: string[];
	messageCount: number;
}

const initialState: ImageGenerateHTML = {
	history: [],
	messageCount: 0,
};

const imageGenerateHTMLSlice = createSlice({
	name: 'imageGenerateSlice',
	initialState,
	reducers: {
		addMessage: (state, action: PayloadAction<string>) => {
			state.history.push(action.payload);
			state.messageCount += 1;
		},
	},
});

export const { addMessage } = imageGenerateHTMLSlice.actions;
export default imageGenerateHTMLSlice.reducer;