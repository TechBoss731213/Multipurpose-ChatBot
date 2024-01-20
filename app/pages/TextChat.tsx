import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { addMessage } from '../redux/slices/textChatSlice';
import { useChat } from 'ai/react'

import Image from 'next/image';

import fullScreenImageUrl from "../images/fullscreen.png";
import undoFullScreenImageUrl from "../images/undo-fullscreen.png";
import sendButtonImageUrl from "../images/send.png";

const TextChat = () => {
  const dispatch = useDispatch();
  const textChatHistory = useSelector((state: RootState) => state.textChat.history);
  const textChatMessageCount = useSelector((state: RootState) => state.textChat.messageCount);

  const chatHistoryRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (chatHistoryRef.current) {
      const element = chatHistoryRef.current;
      element.scrollTo({ top: element.scrollHeight, behavior: 'smooth' })
    }
  }, [textChatHistory, chatHistoryRef.current?.scrollHeight]);

  const handleOnInput = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = '46px';
      textareaRef.current.style.height = `${Math.min(100, textareaRef.current.scrollHeight)}px`;
    }
  }

  const { input, handleInputChange, handleSubmit } = useChat({
    api: '/api/text-chat',
    onFinish: (message) => {
      dispatch(addMessage({ role: message.role, content: message.content }));
    }
  });

  const handleClickSubmit = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = '46px';
    }
    dispatch(addMessage({ role: "user", content: input }));
  }

  return (
    <>
      <div className="p-[20px] flex justify-between items-center border-b-[1px] border-b-[#D0D0D0]">
        <div>
          <h2 className="text-[20px] font-semibold">Text Based ChatBot</h2>
          <p className="text-[14px] font-semibold mt-[5px]">{textChatMessageCount} messages</p>
        </div>
        <div className="w-[26px] h-[26px] opacity-[0.6] cursor-pointer">
          <Image src={fullScreenImageUrl} alt="Set to Full Screen" />
        </div>
      </div>
      <div className="p-[20px] h-[calc(100%_-_183px)] overflow-y-auto" ref={chatHistoryRef}>
        {textChatHistory.length > 0
          ? textChatHistory.map((item, index) => (
            <div key={index} className={`w-fit p-[10px] bg-[#E7F8FF] text-[#303030] rounded-t-[10px] border border-[#D0D0D0] max-w-[600px] mb-[20px] ${item.role === "user" ? "rounded-l-[10px] ms-auto" : "rounded-r-[10px] me-auto"}`}>
              {item.content.split('\n').map((line, lineIndex) => (
                <React.Fragment key={lineIndex}>
                  {lineIndex > 0 && <br />}
                  {item.role === "assistant" && line.startsWith('```') ? (
                    <div className="code-message">{line.replace('```', '')}</div>
                  ) : (
                    line
                  )}
                </React.Fragment>
              ))}
            </div>
          )) : null}
      </div>
      <div className="p-[20px] border-t-[1px] border-t-[#D0D0D0] rounded-br-[20px] absolute w-full bottom-0 z-[1]">
        <div className="relative flex">
          <textarea
            rows={1}
            ref={textareaRef}
            value={input}
            onInput={handleOnInput}
            placeholder="Please write your message here!"
            onChange={handleInputChange}
            className="w-full max-h-[100px] p-[10px] outline-none rounded-[10px] resize-none border-[1px] border-[#D0D0D0] focus:border-[#999]"
          />
          <div className="absolute w-[36px] h-[36px] cursor-pointer bottom-[5px] right-[10px]">
            <Image src={sendButtonImageUrl} className="opacity-[0.6] focus:opacity-[1]" alt="Send Message" onClick={(e) => {
              handleClickSubmit();
              handleSubmit(e as any);
            }} />
          </div>
        </div>
      </div>
    </>
  );
};

export default TextChat;