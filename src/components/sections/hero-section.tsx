'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ArrowRight, ChevronDown, File, User, Baseline, MessageSquare, X, Stethoscope } from 'lucide-react';

const HeroSection = () => {
  const [isMobileFullScreen, setIsMobileFullScreen] = useState(false);

  const handleMobileChatClick = () => {
    if (window.innerWidth < 768) {// Only on mobile
      setIsMobileFullScreen(true);
    }
  };

  const handleCloseMobileChat = () => {
    setIsMobileFullScreen(false);
  };

  if (isMobileFullScreen) {
    return (
      <div className="fixed inset-0 z-50 bg-white flex flex-col md:hidden">
        {/* Mobile Full Screen Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <MessageSquare size={20} className="text-gray-600" />
          </button>
          
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center">
              <Stethoscope size={16} className="text-white" />
            </div>
            <span className="font-medium text-gray-900">Zenethe</span>
          </div>
          
          <button
            onClick={handleCloseMobileChat}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <User size={20} className="text-gray-600" />
          </button>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col p-4">
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center space-y-4 max-w-sm">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center mx-auto">
                <Stethoscope size={28} className="text-white" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Ready to assist</h2>
              <p className="text-gray-600">Ask me about medical guidelines, diagnosis support, or evidence-based recommendations.</p>
            </div>
          </div>

          {/* Input Area */}
          <div className="space-y-4">
            <div className="relative flex flex-col justify-between rounded-2xl bg-gray-50 p-4 min-h-[120px] focus-within:ring-2 focus-within:ring-blue-400/50 transition-all">
              <textarea
                placeholder="Describe your clinical question..."
                className="w-full h-full min-h-[60px] bg-transparent border-none resize-none focus:ring-0 focus:outline-none text-base placeholder:text-gray-500 text-gray-800" />

              <div className="flex justify-between items-center mt-2">
                <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                  <File size={20} />
                </button>
                <button className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30">
                  <ArrowRight size={20} />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between gap-2">
              <button className="flex items-center justify-between text-sm font-medium text-gray-800 bg-white rounded-xl px-4 py-3 hover:bg-gray-50 transition border border-gray-200 flex-1">
                <span>Evidence-Based</span>
                <ChevronDown size={16} className="text-gray-500" />
              </button>
              <button className="flex items-center gap-2 text-sm font-medium text-gray-800 bg-white rounded-xl px-4 py-3 hover:bg-gray-50 transition border border-gray-200 flex-1">
                <User size={16} className="text-gray-600" />
                <span>Doctor</span>
                <ChevronDown size={16} className="text-gray-500" />
              </button>
            </div>
          </div>
        </div>
      </div>);

  }

  return (
    <section
      className="relative w-full flex flex-col py-8 px-4 h-screen bg-gradient-to-b from-blue-900 to-blue-600 overflow-hidden">

      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/90 to-blue-600/90"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_0%,transparent_50%)]"></div>
      </div>

      <div className="relative z-10 flex flex-col w-full h-full">
        <div className="text-center pt-8 md:pt-16 !w-full !h-[193px]">
          <h1 className="text-3xl md:text-5xl font-semibold text-white mb-3 mx-auto leading-tight !w-[672px] !h-[108px] !max-w-2xl">
            Evidence-based medical AI — at your fingertips.
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-lg mx-auto">
            Access ICMR and WHO guidelines instantly. Make informed clinical decisions with AI-powered medical intelligence.
          </p>
        </div>

        <div className="flex-1"></div>

        <div className="w-full md:max-w-2xl mx-auto pb-8 md:pb-16 mt-[10vh]">
          <div
            className="bg-white/95 backdrop-blur-sm border border-white/20 rounded-2xl p-4 shadow-2xl cursor-pointer md:cursor-default transition-transform hover:scale-[1.02] md:hover:scale-100 !w-[100.4%] !h-full"
            onClick={handleMobileChatClick}>

            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Stethoscope size={18} className="text-white" />
                </div>
                <h3 className="text-lg font-medium text-gray-900">
                  Start medical consultation
                </h3>
              </div>

              <div className="relative flex flex-col justify-between rounded-xl bg-gray-100 p-3 min-h-[100px] md:min-h-[140px] focus-within:ring-1 focus-within:ring-blue-400/50 transition-shadow">
                <textarea
                  placeholder="Ask about symptoms, treatments, or medical guidelines..."
                  className="w-full h-full min-h-[60px] md:min-h-[80px] p-2 bg-transparent border-none resize-none focus:ring-0 focus:outline-none text-base placeholder:text-gray-500 text-gray-800"
                  onClick={(e) => e.stopPropagation()} />

                <div className="flex justify-between items-center mt-1">
                  <button
                    className="p-2 text-gray-400 hover:text-gray-600 transition-colors opacity-50 hover:opacity-100"
                    onClick={(e) => e.stopPropagation()}>
                    <File size={16} />
                  </button>
                  <button
                    className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-md shadow-blue-500/30"
                    onClick={(e) => e.stopPropagation()}>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-1">
                <button
                  className="flex items-center justify-between text-sm font-normal text-gray-800 bg-white rounded-lg px-4 py-2 hover:bg-gray-50 transition w-full sm:w-auto sm:min-w-[140px]"
                  onClick={(e) => e.stopPropagation()}>
                  <span>Evidence-Based</span>
                  <ChevronDown size={16} className="text-gray-500 ml-2" />
                </button>
                <div className="flex items-center gap-2 text-xs font-normal">
                  <button
                    className="flex items-center gap-1.5 text-gray-800 bg-white rounded-lg px-3 py-2 hover:bg-gray-50 transition"
                    onClick={(e) => e.stopPropagation()}>
                    <User size={16} className="text-gray-600" />
                    <span>Doctor</span>
                    <ChevronDown size={16} className="text-gray-500" />
                  </button>
                  <button
                    className="flex items-center gap-1.5 text-gray-800 bg-white rounded-lg px-3 py-2 hover:bg-gray-50 transition"
                    onClick={(e) => e.stopPropagation()}>
                    <Baseline size={16} className="text-gray-600" />
                    <span>ICMR/WHO</span>
                    <ChevronDown size={16} className="text-gray-500" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>);

};

export default HeroSection;