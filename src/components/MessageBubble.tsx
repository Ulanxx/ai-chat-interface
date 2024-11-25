import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Bot, User, Image as ImageIcon, Music, Video, File } from 'lucide-react';
import { useThemeStore } from '../stores/theme';
import type { Message } from '../types';

interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const { isDark } = useThemeStore();
  const isAssistant = message.role === 'assistant';

  const formatTime = (timestamp: string) => {
    try {
      const date = new Date(timestamp);
      return date.toLocaleTimeString();
    } catch (error) {
      return '';
    }
  };

  const FilePreview = ({ file }: { file: NonNullable<Message['files']>[0] }) => {
    switch (file.type) {
      case 'image':
        return (
          <div className="relative group">
            <img
              src={file.preview}
              alt={file.file.name}
              className="max-w-[300px] max-h-[200px] rounded-xl object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity rounded-xl">
              <a
                href={file.preview}
                target="_blank"
                rel="noopener noreferrer"
                className="opacity-0 group-hover:opacity-100 bg-white p-2 rounded-xl shadow-lg transition-all transform scale-95 group-hover:scale-100"
              >
                <ImageIcon className="w-5 h-5" />
              </a>
            </div>
          </div>
        );
      case 'audio':
        return (
          <audio controls className="max-w-full rounded-lg">
            <source src={file.preview} type={file.file.type} />
          </audio>
        );
      case 'video':
        return (
          <video controls className="max-w-[300px] max-h-[200px] rounded-xl">
            <source src={file.preview} type={file.file.type} />
          </video>
        );
      default:
        return (
          <div className={`flex items-center gap-2 p-2 rounded-xl ${isDark ? 'bg-white/5' : 'bg-gray-50'}`}>
            <File className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
            <span className={`text-sm truncate ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
              {file.file.name}
            </span>
          </div>
        );
    }
  };

  return (
    <div className={`flex gap-3 sm:gap-4 p-4 sm:p-6 ${
      isDark
        ? isAssistant ? 'bg-white/5' : 'bg-white/[0.02]'
        : isAssistant ? 'bg-gray-50' : 'bg-white'
    }`}>
      <div className="flex-shrink-0">
        <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center shadow-lg ${
          isAssistant ? 'tech-gradient' : 'bg-blue-600'
        }`}>
          {isAssistant ? (
            <Bot className="w-5 h-5 sm:w-5 sm:h-5 text-white" />
          ) : (
            <User className="w-5 h-5 sm:w-5 sm:h-5 text-white" />
          )}
        </div>
      </div>
      <div className="flex-grow min-w-0 max-w-3xl space-y-1">
        <ReactMarkdown
          className={`prose prose-sm sm:prose max-w-none break-words ${isDark ? 'prose-invert' : ''}`}
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || '');
              return !inline && match ? (
                <SyntaxHighlighter
                  style={atomDark}
                  language={match[1]}
                  PreTag="div"
                  customStyle={{ 
                    margin: '1em 0',
                    background: isDark ? '#111827' : '#1f2937',
                    borderRadius: '0.75rem'
                  }}
                  {...props}
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              ) : (
                <code className={`${isDark ? 'bg-gray-800 text-gray-100' : 'bg-gray-100 text-gray-900'} rounded px-1 py-0.5`} {...props}>
                  {children}
                </code>
              );
            }
          }}
        >
          {message.content}
        </ReactMarkdown>
        {message.files && message.files.length > 0 && (
          <div className="mt-3 grid gap-3 grid-cols-1 sm:grid-cols-2">
            {message.files.map((file) => (
              <FilePreview key={file.id} file={file} />
            ))}
          </div>
        )}
        <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
          {formatTime(message.timestamp)}
        </div>
      </div>
    </div>
  );
}