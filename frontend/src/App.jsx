import { useEffect, useState } from "react";
import { io } from "socket.io-client";

// connect to backend
const socket = io("http://localhost:5000", { transports: ["websocket"] });

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  // Listen for incoming messages
  useEffect(() => {
    socket.on("receiveMessage", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  const sendMessage = () => {
    if (input.trim() === "") return;

    const messageData = { text: input, sender: "user" };
    socket.emit("sendMessage", messageData);
    setInput("");
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      <header className="bg-gray-800 p-4 text-center text-lg font-bold">
        Chat App
      </header>
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((msg, index) => (
          <div key={index} className="mb-2">
            <span className="font-bold">{msg.sender}: </span>
            {msg.text}
          </div>
        ))}
      </div>
      <footer className="p-4 bg-gray-800 flex">
        <input
          type="text"
          className="flex-1 p-2 rounded-md bg-white px-3.5 py-2 text-base text-black outline outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 sm:text-sm/6"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className="flex-none px-4 py-2 ml-2 rounded-md bg-indigo-500 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          onClick={sendMessage}
        >
          Send
        </button>
      </footer>
    </div>
  );
}

export default App;
