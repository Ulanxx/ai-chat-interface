import React, { useState, useRef, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { MessageBubble } from './components/MessageBubble';
import { ChatInput } from './components/ChatInput';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { TherapistList } from './components/TherapistList';
import { TherapistProfilePage } from './pages/TherapistProfile';
import { useThemeStore } from './stores/theme';
import { useChatStore } from './stores/chat';
import type { Message } from './types';
import type { UploadedFile } from './components/FileUpload';

function Chat() {
  const { t } = useTranslation();
  const { isDark } = useThemeStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showTherapists, setShowTherapists] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { createChat, getCurrentChat, addMessage } = useChatStore();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  useEffect(() => {
    const currentChat = getCurrentChat();
    if (!currentChat) {
      const newChat = createChat();
      addMessage(newChat.id, {
        id: '1',
        role: 'assistant',
        content: t('welcome.message'),
        timestamp: new Date().toISOString(),
        files: [],
      });
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [getCurrentChat()?.messages, showTherapists]);

  const handleSendMessage = async (content: string, files: UploadedFile[] = []) => {
    const currentChat = getCurrentChat();
    if (!currentChat) return;

    setShowTherapists(false);

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date().toISOString(),
      files,
    };

    addMessage(currentChat.id, userMessage);

    setTimeout(() => {
      const analysis = files.length > 0
        ? t('ai.fileAnalysis')
        : t('ai.messageAnalysis', { feeling: content.toLowerCase().includes('anxious') ? t('emotions.anxious') : t('emotions.concerned') });

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: analysis,
        timestamp: new Date().toISOString(),
        files: [],
      };

      addMessage(currentChat.id, assistantMessage);
      
      setTimeout(() => {
        setShowTherapists(true);
        scrollToBottom();
      }, 500);
    }, 1000);
  };

  const currentChat = getCurrentChat();

  return (
    <div className={`flex h-screen ${isDark ? 'bg-dark-900' : 'bg-gray-50'} transition-colors duration-200`}>
      <div
        className={`fixed inset-0 bg-black/70 z-20 lg:hidden transition-opacity ${
          isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsSidebarOpen(false)}
      />

      <div
        className={`fixed lg:static w-64 h-full ${
          isDark ? 'bg-dark-800' : 'bg-white'
        } z-30 transition-transform duration-300 transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } tech-glow`}
      >
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col min-w-0">
        <Header onMenuClick={() => setIsSidebarOpen(true)} />

        <div className="flex-grow overflow-y-auto message-grid">
          <div className="max-w-3xl mx-auto">
            {currentChat?.messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
            {showTherapists && (
              <div className={`transition-opacity duration-500 ${showTherapists ? 'opacity-100' : 'opacity-0'}`}>
                <TherapistList />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        <ChatInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Chat />} />
      <Route path="/therapist/:id" element={<TherapistProfilePage />} />
    </Routes>
  );
}