import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { MessageBubble } from './components/MessageBubble';
import { ChatInput } from './components/ChatInput';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { useThemeStore } from './stores/theme';
import { useChatStore } from './stores/chat';
import type { Message } from './types';
import type { UploadedFile } from './components/FileUpload';
import './i18n';

export default function App() {
  const { t } = useTranslation();
  const { isDark } = useThemeStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { createChat, getCurrentChat, addMessage } = useChatStore();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  useEffect(() => {
    // Create initial chat if none exists
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
  }, [getCurrentChat()?.messages]);

  const handleSendMessage = async (content: string, files: UploadedFile[] = []) => {
    const currentChat = getCurrentChat();
    if (!currentChat) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date().toISOString(),
      files,
    };

    addMessage(currentChat.id, userMessage);

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: files.length > 0 
          ? `I've received your files:\n${files.map(f => `- ${f.file.name} (${f.type})`).join('\n')}`
          : `I received your message: "${content}"\n\nThis is a simulated response. In a real application, this would be connected to an AI backend.`,
        timestamp: new Date().toISOString(),
        files: [],
      };

      addMessage(currentChat.id, assistantMessage);
    }, 1000);
  };

  const currentChat = getCurrentChat();

  return (
    <div className={`flex h-screen bg-gray-50 dark:bg-dark-900 transition-colors duration-200`}>
      {/* Sidebar Overlay */}
      <div
        className={`fixed inset-0 bg-black/70 z-20 lg:hidden transition-opacity ${
          isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsSidebarOpen(false)}
      />

      {/* Sidebar */}
      <div
        className={`fixed lg:static w-64 h-full bg-white dark:bg-dark-800 z-30 transition-transform duration-300 transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } tech-glow`}
      >
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header onMenuClick={() => setIsSidebarOpen(true)} />

        {/* Messages */}
        <div className="flex-grow overflow-y-auto message-grid">
          <div className="max-w-3xl mx-auto">
            {currentChat?.messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input */}
        <ChatInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
}