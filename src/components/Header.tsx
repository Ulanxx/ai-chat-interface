import React from 'react';
import { Bot, Menu, Moon, Sun, Languages, Plus } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useThemeStore } from '../stores/theme';
import { useLanguageStore } from '../stores/language';
import { useChatStore } from '../stores/chat';
import { MoreOptions } from './MoreOptions';

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const { t } = useTranslation();
  const { isDark, toggleTheme } = useThemeStore();
  const { language, setLanguage } = useLanguageStore();
  const { createChat } = useChatStore();

  return (
    <header className={`${isDark ? 'bg-dark-800/80' : 'bg-white/80'} backdrop-blur-lg border-b ${isDark ? 'border-white/10' : 'border-gray-200'} px-4 py-3 flex items-center justify-between tech-glow sticky top-0 z-30`}>
      <div className="flex items-center gap-2">
        <button
          onClick={onMenuClick}
          className={`lg:hidden p-2 rounded-xl transition-colors ${isDark ? 'text-gray-400 hover:bg-white/10 active:bg-white/5' : 'text-gray-600 hover:bg-gray-100 active:bg-gray-200'}`}
          aria-label="Menu"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl tech-gradient flex items-center justify-center shadow-lg">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <h1 className={`text-lg sm:text-xl font-display font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            AI Psychology Assistant
          </h1>
        </div>
      </div>
      
      <div className="flex items-center gap-1 sm:gap-2">
        <button
          onClick={createChat}
          className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-colors ${
            isDark ? 'text-gray-400 hover:bg-white/10' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Plus className="w-5 h-5" />
          <span className="hidden sm:inline">{t('common.newChat')}</span>
        </button>
        <MoreOptions />
        <button
          onClick={() => setLanguage(language === 'en' ? 'zh' : 'en')}
          className={`p-2 rounded-xl transition-colors relative group ${
            isDark ? 'text-gray-400 hover:bg-white/10' : 'text-gray-600 hover:bg-gray-100'
          }`}
          aria-label={language === 'en' ? '切换到中文' : 'Switch to English'}
        >
          <Languages className="w-5 h-5" />
          <span className={`absolute top-full right-0 mt-2 px-3 py-1.5 text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none ${isDark ? 'bg-dark-700 text-white' : 'bg-white text-gray-900 shadow-lg border border-gray-200'}`}>
            {language === 'en' ? '切换到中文' : 'Switch to English'}
          </span>
        </button>
        <button
          onClick={toggleTheme}
          className={`p-2 rounded-xl transition-colors ${
            isDark ? 'text-gray-400 hover:bg-white/10' : 'text-gray-600 hover:bg-gray-100'
          }`}
          aria-label={isDark ? t('common.theme.light') : t('common.theme.dark')}
        >
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>
    </header>
  );
}