// components/project/sidebar/ConversationTab.tsx
import React, { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import { ProjectDetails, Message } from '@/components/ui/Project/types/project-detail';
import MessageBubble from '@/components/ui/Project/sidebar/conversation/MessageBubble';

interface ConversationTabProps {
  project: ProjectDetails;
}

const ConversationTab: React.FC<ConversationTabProps> = ({ project }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'assistant',
      text: `Bonjour ! Je suis Gabin, votre assistant d'urbanisme. Comment puis-je vous aider avec votre projet situé au ${project.address} ?`
    },
    {
      sender: 'user',
      text: 'Quelles sont les règles de hauteur applicables à ma parcelle ?'
    },
    {
      sender: 'assistant',
      text: `D'après le règlement de la zone ${project.zone}, la hauteur maximale autorisée est de 12 mètres au faîtage. Cette information se trouve à l'article ${project.zone}10 du règlement du PLU.`
    }
  ]);
  
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim()) return;
    
    // Ajouter le message de l'utilisateur
    const userMessage: Message = {
      sender: 'user',
      text: newMessage.trim(),
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    
    // Simuler une réponse de l'assistant
    setTimeout(() => {
      const assistantMessage: Message = {
        sender: 'assistant',
        text: `Je vais rechercher cette information concernant votre projet en zone ${project.zone}. Merci de patienter un instant.`,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    }, 1000);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 bg-white/10 rounded-lg p-4 mb-4 overflow-y-auto">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <MessageBubble key={index} message={message} />
          ))}
        </div>
      </div>
      
      <form onSubmit={handleSendMessage} className="relative">
        <input 
          type="text" 
          placeholder="Posez votre question à Gabin..." 
          className="w-full pl-4 pr-12 py-3 rounded-lg border border-white/30 bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/50 text-white placeholder-white/50"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button 
          type="submit"
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white hover:text-white/80"
        >
          <MessageSquare size={20} />
        </button>
      </form>
    </div>
  );
};

export default ConversationTab;