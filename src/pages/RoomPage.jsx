import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useChat } from "../context/ChatContext";
import ChatBox from "../components/ChatBox";

export default function RoomPage() {
  const { code } = useParams();
  const navigate = useNavigate();
  const { nickname, roomCode, messages, joinRoom, sendMessage } = useChat();

  useEffect(() => {
    if (!nickname) {
      navigate("/");
      return;
    }

    if (!roomCode) {
      joinRoom({ nickname, roomCode: code });
    }
  }, [nickname, roomCode, code, joinRoom, navigate]);

  if (!nickname || !roomCode) return null;

  return (
    <div className="room-page">
      <ChatBox
        nickname={nickname}
        roomName={roomCode}
        messages={messages}
        sendMessage={sendMessage}
      />
    </div>
  );
}
