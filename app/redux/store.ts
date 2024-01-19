import { configureStore } from '@reduxjs/toolkit';
import textChatReducer from './slices/textChatSlice';
import imageGenerateReducer from './slices/imageGenerateSlice';
import mcqReducer from './slices/mcqSlice';
import videoGenerateReducer from './slices/videoGenerateSlice';
import ImageGenerateHTMLReducer from './slices/ImageGenerateHTMLSlice';
import currentViewReducer from './slices/currentViewSlice';

const store = configureStore({
	reducer: {
		textChat: textChatReducer,
		imageGenerate: imageGenerateReducer,
		mcq: mcqReducer,
		videoGenerate: videoGenerateReducer,
		imageGenerateHTML: ImageGenerateHTMLReducer,
		currentView: currentViewReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;