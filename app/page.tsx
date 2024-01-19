'use client'
import React, { useState } from "react";
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';

import Image from "next/image";

import Sidebar from "./components/Sidebar";
import ChatSection from "./components/ChatSection";

import store from './redux/store';

const Home = () => {

  return (
    <main className="max-w-[1200px] mx-auto flex h-[calc(100vh_-_200px)] mt-[100px] shadow-md rounded-[20px] border-[1px] border-[#EEE]">
      <Provider store={store}>
        <Sidebar />
        <ChatSection />
      </Provider>
    </main>
  );
}

export default Home;
