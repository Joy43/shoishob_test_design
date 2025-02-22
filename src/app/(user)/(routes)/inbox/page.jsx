'use client';

import { useState } from 'react';
import Image from 'next/image';

const Chat = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: 'hi', time: '10:33PM | Nov 30' },
    { id: 2, text: 'hello', time: '08:55PM | Feb 22' }
  ]);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-1/4 bg-white border-r p-4">
        <h2 className="text-lg font-semibold mb-4">Messages</h2>
        <input 
          type="text" 
          placeholder="Search..." 
          className="w-full p-2 border rounded mb-4" 
        />
        <div>
          <h3 className="text-orange-500 font-semibold">Vendor</h3>
          <div className="flex items-center gap-3 p-2 border rounded mt-2 cursor-pointer bg-gray-50">
            <Image src="/user-avatar.png" width={40} height={40} className="rounded-full" alt="User" />
            <div>
              <p className="font-semibold">RSm</p>
              <p className="text-sm text-gray-500">user@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Chat Window */}
      <div className="flex-1 flex flex-col">
        <div className="p-4 bg-white border-b flex items-center gap-3">
          <Image src="/user-avatar.png" width={40} height={40} className="rounded-full" alt="User" />
          <p className="font-semibold">RSm</p>
        </div>
        <div className="flex-1 p-4 bg-gray-50 overflow-y-auto">
          {messages.map((msg) => (
            <div key={msg.id} className="flex flex-col items-end mb-3">
              <div className="bg-orange-500 text-white py-2 px-4 rounded-lg max-w-xs">
                {msg.text}
              </div>
              <span className="text-sm text-gray-500 mt-1">{msg.time}</span>
            </div>
          ))}
        </div>
        <div className="p-4 border-t bg-white flex items-center gap-3">
          <input 
            type="text" 
            placeholder="Type a message..." 
            className="flex-1 p-2 border rounded" 
          />
          <button className="bg-orange-500 text-white px-4 py-2 rounded">Send</button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
