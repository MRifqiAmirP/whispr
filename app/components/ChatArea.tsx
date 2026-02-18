"use client";

import { useEffect, useState, useRef } from "react";
import { getMqttClient } from "@/app/lib/mqtt";
import MessageBubble from "./MessageBubble";

interface Message {
  username?: string;
  message: string;
  time: string;
  self?: boolean;
}

interface User {
  username: string;
  name: string;
  gender: string;
  location: string;
}

interface Props {
  saveTrigger: number;
  totalUsers: number;
}

export default function ChatArea({ saveTrigger, totalUsers }: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [dataUser, setDataUser] = useState<User | null>(null);
  const dataUserRef = useRef<User | null>(null);

  useEffect(() => {
    const checkLocalStorage = () => {
      const dataLocalStorage = localStorage.getItem("whispr_user");
      const data = dataLocalStorage ? JSON.parse(dataLocalStorage) : null;

      // if (!data) {
      //   location.reload();
      //   return;
      // }

      setDataUser(data);
    };

    checkLocalStorage();
  }, [saveTrigger]);

  useEffect(() => {
    dataUserRef.current = dataUser;
  }, [dataUser]);

  useEffect(() => {
    const client = getMqttClient();

    client.subscribe("chat/global");

    client.on("message", (topic, payload) => {
      if (topic === "chat/global") {
        let data;
        try {
          data = JSON.parse(payload.toString());
        } catch {
          data = {
            message: payload.toString(),
            time: new Date().toLocaleTimeString(),
          };
        }

        const name = dataUserRef.current?.name ?? "Unknown";
        const username = dataUserRef.current?.username ?? "unknown";

        const isSelf = data.username === username;

        if (isSelf) return;

        const newMessage = {
          message: data.message,
          name: data.name,
          username: data.username,
          time: data.time,
          self: isSelf,
        };

        setMessages((prev) => [...prev, newMessage]);
      }
    });

    return () => {
      client.unsubscribe("chat/global");
    };
  }, []);

  const sendMessage = () => {
    if (!input.trim()) return;

    const name = dataUser?.name ?? "Unknown";
    const username = dataUser?.username ?? "unknown";

    const client = getMqttClient();

    const messageData = {
      name,
      username,
      message: input,
      time: new Date().toLocaleTimeString(),
      self: true,
    };

    setMessages((prev) => [...prev, messageData]);

    client.publish("chat/global", JSON.stringify(messageData));

    setInput("");
  };

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <div className="p-4 bg-white border-b flex justify-between items-center">
        <h2 className="font-semibold text-lg text-black"># Global Chat</h2>
        <div className="flex items-center gap-2">
          <div className="bg-green-500 w-2 h-2 rounded-full"></div>
          <p className="text-sm text-slate-400">{totalUsers} users online</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((msg, i) => (
          <MessageBubble key={i} {...msg} />
        ))}
      </div>

      {/* Input */}
      <div className="p-4 bg-white border-t">
        <div className="flex items-center bg-slate-100 rounded-xl px-4 py-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-transparent outline-none text-sm text-black"
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            onClick={sendMessage}
            className="bg-teal-500 text-white px-4 py-2 rounded-lg ml-2"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
