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
          ? 'bg-[var(--primary)]/10 ml-auto' 
          : 'bg-[var(--bleu-ardoise)]/10'
      }`}
    >
      <p className={`text-sm font-medium ${
        isUser ? 'text-[var(--primary)]' : 'text-[var(--bleu-ardoise)]'
      }`}>
        {isUser ? 'Vous' : 'Gabin'}
      </p>
      <p className="text-sm">
        {message.text}
      </p>
    </div>
  );
};

export default MessageBubble;