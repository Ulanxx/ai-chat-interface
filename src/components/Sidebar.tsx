import React from 'react';
import { Plus, MessageSquare, Trash2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useChatStore } from '../stores/chat';
import { useThemeStore } from '../stores/theme';

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className = '' }: SidebarProps) {
  const { t } = useTranslation();
  const { isDark } = useThemeStore();
  const { chats, currentChatId, createChat, deleteChat, setCurrentChat } = useChatStore();

  return (
    <div className={`flex flex-col h-full ${className}`}>
      <div className="p-4">
        <button
          onClick={createChat}
          className="w-full py-2.5 px-4 rounded-xl tech-gradient text-white hover:opacity-90 active:opacity-80 transition-all shadow-lg flex items-center justify-center gap-2 font-medium"
        >
          <Plus className="w-5 h-5" />
          <span className="text-sm">{t('common.newChat')}</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-2 pb-4">
        {chats.length === 0 ? (
          <div className={`text-center py-8 ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
            <p className="text-sm">{t('common.noChats')}</p>
          </div>
        ) : (
          chats.map(chat => (
            <div
              key={chat.id}
              className={`group flex items-center gap-2 p-3 rounded-xl cursor-pointer transition-colors mb-1 ${
                chat.id === currentChatId
                  ? isDark
                    ? 'bg-white/10'
                    : 'bg-gray-100'
                  : isDark
                  ? 'hover:bg-white/5'
                  : 'hover:bg-gray-50'
              }`}
              onClick={() => setCurrentChat(chat.id)}
            >
              <MessageSquare className={`w-5 h-5 flex-shrink-0 ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`} />
              <span className={`flex-1 truncate text-sm ${
                isDark ? 'text-gray-200' : 'text-gray-700'
              }`}>
                {chat.title}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteChat(chat.id);
                }}
                className={`p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity ${
                  isDark
                    ? 'hover:bg-white/10 text-gray-400'
                    : 'hover:bg-gray-200 text-gray-500'
                }`}
                aria-label="Delete chat"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}