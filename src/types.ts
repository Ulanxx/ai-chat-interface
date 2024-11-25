export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string; // ISO string format
  files?: {
    id: string;
    file: File;
    preview: string;
    type: 'image' | 'audio' | 'video' | 'other';
    progress: number;
  }[];
}

export interface Chat {
  id: string;
  title: string;
  messages: Message[];
  createdAt: string; // ISO string format
  updatedAt: string; // ISO string format
}

export interface ChatState {
  messages: Message[];
  isTyping: boolean;
}

export interface MoreOption {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  onClick: () => void;
}