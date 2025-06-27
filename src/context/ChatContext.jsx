import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { io } from "socket.io-client";
const backendUrl = import.meta.env.VITE_API_URL
const ChatContext = createContext({});

export const useChat = () => useContext(ChatContext);

const ChatProvider = ({ children }) => {
  const [nickname, setNickname] = useState("");
  const [roomCode, setRoomCode] = useState("");
  const [messages, setMessages] = useState([]);
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = io(`${backendUrl}`);

    socketRef.current.on("receive-message", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  const joinRoom = async ({ nickname, roomCode }) => {
    setNickname(nickname);
    setRoomCode(roomCode);

    socketRef.current?.emit("join-room", roomCode);

    try {
      const res = await fetch(
        `${backendUrl}/room/${roomCode}/messages`
      );
      const data = await res.json();
      if (data.success) {
        setMessages(data.messages);
      } else {
        console.error("Failed to load messages");
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const sendMessage = (text) => {
    if (!text.trim()) return;
    socketRef.current?.emit("send-message", { roomCode, nickname, text });
  };

  return (
    <ChatContext.Provider
      value={{ nickname, roomCode, messages, joinRoom, sendMessage }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;
