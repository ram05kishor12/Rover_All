import React from 'react';
import ChatHistory from '@/components/chathistory';

const ChatComponent: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Chat Application</h1>
      <ChatHistory />
    </div>
  );
};

export default ChatComponent;
