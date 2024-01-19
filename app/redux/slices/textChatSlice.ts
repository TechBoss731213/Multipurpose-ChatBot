import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TextChatState {
	history: { role: string; content: string }[];
	messageCount: number;
}

const initialState: TextChatState = {
	history: [],
	messageCount: 0,
};

const textChatSlice = createSlice({
	name: 'textChat',
	initialState,
	reducers: {
		addMessage: (state, action: PayloadAction<{ role: string; content: string }>) => {
			state.history.push(action.payload);
			state.messageCount += 1;
		},
	},
});

export const { addMessage } = textChatSlice.actions;
export default textChatSlice.reducer;