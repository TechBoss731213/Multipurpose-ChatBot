import React from "react";
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

import TextChat from '../pages/TextChat';
import ImageGenerate from '../pages/ImageGenerate';
import MCQ from '../pages/MCQ';
import VideoGenerate from '../pages/VideoGenerate';
import ImageGenerateHTML from '../pages/ImageGenerateHTML';

const ChatSection = () => {

	const currentView = useSelector((state: RootState) => state.currentView.currentView);

	return (
		<div className="rounded-r-[20px] w-full">
			{currentView === 'TextChat' && <TextChat />}
			{currentView === 'ImageGenerate' && <ImageGenerate />}
			{currentView === 'MCQ' && <MCQ />}
			{currentView === 'VideoGenerate' && <VideoGenerate />}
			{currentView === 'ImageGenerateHTML' && <ImageGenerateHTML />}
		</div>
	);
};

export default ChatSection;