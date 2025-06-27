import { useState, useEffect, useRef } from "react";

export default function ChatBox({ roomName, messages, nickname, sendMessage }) {
  const [text, setText] = useState("");
  const messagesEndRef = useRef(null);

  const handleSend = () => {
    if (text.trim()) {
      sendMessage(text);
      setText("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSend();
  };

  useEffect(() => {
    // Auto-scroll to bottom on new messages
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chatbox">
      <div className="roominfo">
        <h2>Room: {roomName}</h2>
      </div>

      <div className="messages">
        {messages.length === 0 ? (
          <p className="no-messages">No messages yet...</p>
        ) : (
          messages.map((msg) => (
            <div
              key={msg._id || Math.random()}
              className={`message ${msg.nickname === nickname ? "own" : ""}`}
            >
              <div className="meta">
                <span className="nickname">{msg.nickname}</span>
                <span className="timestamp">
                  {new Date(msg.createdAt).toLocaleTimeString()}
                </span>
              </div>
              <div className="text">{msg.text}</div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="message-input">
        <input
          type="text"
          value={text}
          placeholder="Type a message..."
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}
