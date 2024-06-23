import React from 'react';

// Props para ChatWindow
interface ChatWindowProps {
  messages: { type: 'user' | 'bot' | 'file'; text: string }[];
}

const ChatWindow: React.FC<ChatWindowProps> = ({ messages }) => {
  return (
    <div className="chat-window">
      {messages.map((message, index) => (
        <div key={index} className={`message ${message.type}`}>
          {message.text}
        </div>
      ))}
    </div>
  );
};

export default ChatWindow;
