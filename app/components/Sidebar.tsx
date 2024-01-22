import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { setCurrentView } from "../redux/slices/currentViewSlice";

import Link from "next/link";
import Image from "next/image";

import logo from "../images/logo.png";

const Sidebar = () => {

	const currentView = useSelector((state: RootState) => state.currentView.currentView);
	const textChatMessageCount = useSelector((state: RootState) => state.textChat.messageCount);
	
	const dispatch = useDispatch();

	const handleMenuClick = (view: string) => {
		dispatch(setCurrentView(view));
	};

	return (
		<div className="px-[20px] pt-[40px] bg-[#E7F8FF] rounded-l-[20px] max-w-[360px] w-full">
			<Link href="/" className="flex justify-between items-center mb-[30px]">
				<div className="flex flex-col items-start">
					<h2 className="text-[20px] font-bold">Multipurpose GPT</h2>
					<p className="text-[12px] font-semibold">Generate multi features from text prompt.</p>
				</div>
				<div className="w-[40px] h-[40px]">
					<Image src={logo} width={40} height={40} alt="Multipurpose GPT Logo" />
				</div>
			</Link>
			<div className={`w-full p-[10px] bg-[#fff] rounded-[10px] cursor-pointer shadow mb-[20px] ${currentView === "TextChat" && "border-[2px] border-[#1D93AB]"}`} onClick={() => handleMenuClick('TextChat')}>
				<h3 className="text-[14px] font-semibold">Text Based ChatBot</h3>
				<p className="text-[12px] mt-[8px]">{textChatMessageCount} messages</p>
			</div>
		</div>
	);
};

export default Sidebar;