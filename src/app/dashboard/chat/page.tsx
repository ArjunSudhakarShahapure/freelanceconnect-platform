"use client";

import { useState } from "react";
import { Search, Send, Circle } from "lucide-react";

interface User {
  id: number;
  name: string;
  role: string;
  isOnline: boolean;
  lastMessage?: string;
  timestamp?: string;
  unread?: number;
}

interface Message {
  id: number;
  sender: string;
  content: string;
  timestamp: string;
  isOwn: boolean;
}

export default function ChatPage() {
  const [users] = useState<User[]>([
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Graphic Designer",
      isOnline: true,
      lastMessage: "Thanks for the feedback!",
      timestamp: "2m ago",
      unread: 2,
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "UI/UX Designer",
      isOnline: true,
      lastMessage: "Let's discuss the project tomorrow",
      timestamp: "1h ago",
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      role: "Graphic Designer",
      isOnline: false,
      lastMessage: "I'll send you the files",
      timestamp: "3h ago",
    },
    {
      id: 4,
      name: "David Park",
      role: "UI/UX Designer",
      isOnline: true,
      lastMessage: "Great work on the landing page!",
      timestamp: "Yesterday",
    },
    {
      id: 5,
      name: "Lisa Anderson",
      role: "Graphic Designer",
      isOnline: false,
      lastMessage: "See you at the meeting",
      timestamp: "2 days ago",
    },
  ]);

  const [selectedUser, setSelectedUser] = useState<User>(users[0]);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "Sarah Johnson",
      content: "Hey! I saw your portfolio. Your design work is amazing!",
      timestamp: "10:30 AM",
      isOwn: false,
    },
    {
      id: 2,
      sender: "You",
      content: "Thank you so much! I really appreciate that.",
      timestamp: "10:32 AM",
      isOwn: true,
    },
    {
      id: 3,
      sender: "Sarah Johnson",
      content: "I'm working on a branding project and could use some feedback. Would you be interested?",
      timestamp: "10:33 AM",
      isOwn: false,
    },
    {
      id: 4,
      sender: "You",
      content: "Absolutely! I'd love to help. Send me the details.",
      timestamp: "10:35 AM",
      isOwn: true,
    },
    {
      id: 5,
      sender: "Sarah Johnson",
      content: "Thanks for the feedback!",
      timestamp: "10:45 AM",
      isOwn: false,
    },
  ]);

  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: messages.length + 1,
        sender: "You",
        content: newMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isOwn: true,
      };
      setMessages([...messages, message]);
      setNewMessage("");
    }
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-screen flex bg-white">
      {/* Users List */}
      <div className="w-80 border-r border-black flex flex-col">
        {/* Search */}
        <div className="p-4 border-b border-black">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2" size={18} />
            <input
              type="text"
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-black focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
        </div>

        {/* User List */}
        <div className="flex-1 overflow-y-auto">
          {filteredUsers.map((user) => (
            <button
              key={user.id}
              onClick={() => setSelectedUser(user)}
              className={`w-full p-4 border-b border-black text-left transition-colors ${
                selectedUser.id === user.id
                  ? "bg-black text-white"
                  : "bg-white text-black hover:bg-gray-100"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="relative">
                  <div className="w-12 h-12 border border-black bg-white flex items-center justify-center flex-shrink-0">
                    <span className={`font-bold text-sm ${selectedUser.id === user.id ? 'text-black' : ''}`}>
                      {user.name.split(" ").map(n => n[0]).join("")}
                    </span>
                  </div>
                  <Circle
                    size={10}
                    className={`absolute bottom-0 right-0 ${
                      user.isOnline ? "fill-black" : "fill-gray-400"
                    }`}
                    fill="currentColor"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-bold text-sm truncate">{user.name}</h4>
                    {user.unread && (
                      <span className={`ml-2 px-2 py-0.5 text-xs font-bold border ${
                        selectedUser.id === user.id
                          ? "border-white bg-white text-black"
                          : "border-black bg-black text-white"
                      }`}>
                        {user.unread}
                      </span>
                    )}
                  </div>
                  <p className={`text-xs mb-1 ${selectedUser.id === user.id ? 'text-gray-300' : 'text-gray-600'}`}>
                    {user.role}
                  </p>
                  {user.lastMessage && (
                    <p className={`text-xs truncate ${selectedUser.id === user.id ? 'text-gray-300' : 'text-gray-500'}`}>
                      {user.lastMessage}
                    </p>
                  )}
                  {user.timestamp && (
                    <p className={`text-xs mt-1 ${selectedUser.id === user.id ? 'text-gray-400' : 'text-gray-400'}`}>
                      {user.timestamp}
                    </p>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="p-4 border-b border-black flex items-center gap-3">
          <div className="relative">
            <div className="w-12 h-12 border border-black bg-white flex items-center justify-center">
              <span className="font-bold text-sm">
                {selectedUser.name.split(" ").map(n => n[0]).join("")}
              </span>
            </div>
            <Circle
              size={10}
              className={`absolute bottom-0 right-0 ${
                selectedUser.isOnline ? "fill-black" : "fill-gray-400"
              }`}
              fill="currentColor"
            />
          </div>
          <div>
            <h3 className="font-bold">{selectedUser.name}</h3>
            <p className="text-sm text-gray-600">{selectedUser.role}</p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isOwn ? "justify-end" : "justify-start"}`}
            >
              <div className={`max-w-md ${message.isOwn ? "text-right" : "text-left"}`}>
                <div
                  className={`inline-block p-4 border border-black ${
                    message.isOwn
                      ? "bg-black text-white"
                      : "bg-white text-black"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {message.timestamp}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="p-4 border-t border-black">
          <div className="flex gap-4">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Type a message..."
              className="flex-1 px-4 py-3 border border-black focus:outline-none focus:ring-2 focus:ring-black"
            />
            <button
              onClick={handleSendMessage}
              className="px-6 py-3 border border-black bg-black text-white hover:bg-white hover:text-black transition-colors flex items-center gap-2"
            >
              <Send size={18} />
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
