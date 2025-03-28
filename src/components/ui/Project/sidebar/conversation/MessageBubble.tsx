// components/project/conversation/MessageBubble.tsx
import React from 'react';
import { Message } from '@/components/ui/Project/types/project-detail';

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.sender === 'user';
  
  return (
    <div 
      className={`p-3 rounded-lg max-w-[80%] ${
        isUser 
          ? 'bg-white ml-auto text-[var(--terracotta)]' 
          : 'bg-white/20'
      }`}
    >
      <p className={`text-sm font-medium ${
        isUser ? 'text-[var(--terracotta)]' : 'text-white'
      }`}>
        {isUser ? 'Vous' : 'Gabin'}
      </p>
      <p className={`text-sm ${isUser ? 'text-[var(--terracotta)]' : 'text-white'}`}>
        {message.text}
      </p>
    </div>
  );
};

export default MessageBubble;