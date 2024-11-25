import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import type { Chat, Message } from '../types';

interface ChatStore {
  chats: Chat[];
  currentChatId: string | null;
  createChat: () => Chat;
  deleteChat: (id: string) => void;
  setCurrentChat: (id: string) => void;
  addMessage: (chatId: string, message: Message) => void;
  getCurrentChat: () => Chat | null;
}

export const useChatStore = create<ChatStore>()(
  persist(
    (set, get) => ({
      chats: [],
      currentChatId: null,

      createChat: () => {
        const newChat: Chat = {
          id: uuidv4(),
          title: 'New Chat',
          messages: [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        set(state => ({
          chats: [newChat, ...state.chats],
          currentChatId: newChat.id,
        }));

        return newChat;
      },

      deleteChat: (id: string) => {
        set(state => {
          const newChats = state.chats.filter(chat => chat.id !== id);
          const newCurrentChatId = state.currentChatId === id
            ? (newChats[0]?.id ?? null)
            : state.currentChatId;

          return {
            chats: newChats,
            currentChatId: newCurrentChatId,
          };
        });
      },

      setCurrentChat: (id: string) => {
        set({ currentChatId: id });
      },

      addMessage: (chatId: string, message: Message) => {
        // Ensure timestamp is stored as ISO string
        const messageWithTimestamp = {
          ...message,
          timestamp: new Date().toISOString(),
        };

        set(state => ({
          chats: state.chats.map(chat => 
            chat.id === chatId
              ? {
                  ...chat,
                  messages: [...chat.messages, messageWithTimestamp],
                  updatedAt: new Date().toISOString(),
                  title: chat.messages.length === 0 ? message.content.slice(0, 30) + '...' : chat.title,
                }
              : chat
          ),
        }));
      },

      getCurrentChat: () => {
        const { chats, currentChatId } = get();
        return chats.find(chat => chat.id === currentChatId) ?? null;
      },
    }),
    {
      name: 'chat-storage',
      version: 1,
      migrate: (persistedState: any, version: number) => {
        if (version === 0) {
          // Convert existing timestamps to ISO strings if needed
          const chats = persistedState.chats.map((chat: Chat) => ({
            ...chat,
            createdAt: new Date(chat.createdAt).toISOString(),
            updatedAt: new Date(chat.updatedAt).toISOString(),
            messages: chat.messages.map(msg => ({
              ...msg,
              timestamp: new Date(msg.timestamp).toISOString(),
            })),
          }));
          return { ...persistedState, chats };
        }
        return persistedState;
      },
    }
  )
);