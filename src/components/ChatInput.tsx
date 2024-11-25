import React, { useState, KeyboardEvent } from 'react';
import { Send, Paperclip } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { FileUpload, UploadedFile } from './FileUpload';
import { useThemeStore } from '../stores/theme';

interface ChatInputProps {
  onSendMessage: (message: string, files?: UploadedFile[]) => void;
  disabled?: boolean;
}

export function ChatInput({ onSendMessage, disabled }: ChatInputProps) {
  const { t } = useTranslation();
  const { isDark } = useThemeStore();
  const [input, setInput] = useState('');
  const [showUpload, setShowUpload] = useState(false);

  const handleSubmit = () => {
    if (input.trim() && !disabled) {
      onSendMessage(input.trim());
      setInput('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleUpload = (files: UploadedFile[]) => {
    onSendMessage('Uploaded files:', files);
    setShowUpload(false);
  };

  return (
    <div className={`border-t ${isDark ? 'border-white/10 bg-dark-800/50' : 'border-gray-200 bg-white'} backdrop-blur-lg`}>
      {showUpload && (
        <div className={`p-4 border-b ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
          <FileUpload onUpload={handleUpload} />
        </div>
      )}
      <div className="p-3 sm:p-4">
        <div className="max-w-3xl mx-auto flex gap-2">
          <button
            onClick={() => setShowUpload(!showUpload)}
            className={`p-2.5 rounded-xl transition-colors ${
              isDark 
                ? 'text-gray-400 hover:bg-white/10 active:bg-white/5' 
                : 'text-gray-500 hover:bg-gray-100 active:bg-gray-200'
            }`}
            aria-label={t('common.upload')}
          >
            <Paperclip className="w-5 h-5" />
          </button>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={t('common.inputPlaceholder')}
            disabled={disabled}
            className={`flex-grow p-2.5 text-base rounded-xl min-h-[44px] max-h-[200px] resize-none transition-colors ${
              isDark
                ? 'bg-white/5 border-white/10 text-white placeholder-gray-500 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/25'
                : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
            } border`}
            rows={1}
          />
          <button
            onClick={handleSubmit}
            disabled={disabled || !input.trim()}
            className="p-2.5 rounded-xl tech-gradient text-white hover:opacity-90 active:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg disabled:shadow-none"
            aria-label={t('common.send')}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        <div className={`max-w-3xl mx-auto mt-2 text-xs px-1 ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
          {t('common.enterToSend')}
        </div>
      </div>
    </div>
  );
}