import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

interface Message {
  user: string;
  message: string;
}

const ChatHistory: React.FC = () => {
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    const storedHistory = Cookies.get('chatHistory');
    if (storedHistory) {
      setChatHistory(JSON.parse(storedHistory));
    }
  }, []);

  const toggleHistory = () => {
    setShowHistory(!showHistory);
  };

  return (
    <div>
      <button
        onClick={toggleHistory}
        className="bg-blue-500 text-white rounded-md px-4 py-2 mb-4"
      >
        Show History
      </button>
      {showHistory && (
        <div className="bg-gray-200 p-4 rounded-md shadow-md">
          <h2 className="text-lg font-bold mb-2">Chat History</h2>
          <div className="space-y-2">
            {chatHistory.map((msg, index) => (
              <div
                key={index}
                className="bg-white rounded-md p-2 shadow-sm"
              >
                <p className="font-bold">{msg.user}</p>
                <p>{msg.message}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatHistory;
