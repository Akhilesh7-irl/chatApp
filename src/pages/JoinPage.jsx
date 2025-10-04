import { useState } from "react";
import { useChat } from "../context/ChatContext";
import { useNavigate } from "react-router-dom";

export default function JoinPage() {
  const [nickname, setNickname] = useState("");
  const [roomCode, setRoomCode] = useState("");
  const { joinRoom } = useChat(); 
  const navigate = useNavigate(); 

  const handleJoin = async () => {
    if (!nickname.trim() || !roomCode.trim()) return;

    await joinRoom({ nickname, roomCode }); 
    navigate(`/room/${roomCode}`); 
  };

  return (
    <div className="join-form">
      <h2>Join a Room</h2>
      <input
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        type="text"
        placeholder="Enter nickname"
      />
      <input
        value={roomCode}
        onChange={(e) => setRoomCode(e.target.value)}
        type="text"
        placeholder="Enter room code"
      />
      <button onClick={handleJoin}>Join</button>
    </div>
  );
}
