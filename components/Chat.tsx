import socket from "@/lib/websocket";
import {
  useState,
  useEffect,
  ChangeEvent,
  KeyboardEvent,
  FunctionComponent,
} from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import CardTitle from "./CardTitle";
import ChatIcon from "@/public/svgs/chat.svg";
import { v4 as uuidv4 } from "uuid";

interface Message {
  id?: number;
  text: string;
  username: string;
}

interface ChartProps {
  username?: string;
  disabled: boolean;
}

const Chat: FunctionComponent<ChartProps> = ({ username = "", disabled }) => {
  const [message, setMessage] = useState<string>("");
  const [chat, setChat] = useState<Message[]>([]);

  useEffect(() => {
    // Listen for incoming messages
    socket.on("message", (receivedMessage: Message) => {
      setChat((prevChat) => [...prevChat, receivedMessage]);
    });

    return () => {
      socket.off("message"); // Clean up the event listener
    };
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  const sendMessage = () => {
    if (message.trim() !== "") {
      const messageId = uuidv4();
      const newMessage = { id: messageId, text: message, username };
      // emit message to the server
      socket.emit("message", newMessage);
      setMessage("");
    }
  };

  return (
    <div className="">
      <CardTitle text="Chat" icon={ChatIcon} />
      <div className="mb-4p-4 shadow-sm rounded-tr-md rounded-tl-md bg-gray-900 p-3">
        <ul className="overflow-y-auto h-[137px] text-white">
          {chat.map(({ text, username, id }) => (
            <li key={id} className="mb-4 text-[12px] font-bold">
              <span className="text-[#d54f88]">{username}:</span>{" "}
              <span className="px-1 bg-slate-500 rounded-md ml-2 inline-block">
                {text}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex gap-2 p-2 bg-gray-600 rounded-lg">
        <Input
          type="text"
          className="flex-1 border rounded shadow-sm h-[auto]"
          placeholder="Type your message..."
          value={message}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <Button
          className="gradient_button self-stretch"
          onClick={() => sendMessage()}
          disabled={disabled}
        >
          Send
        </Button>
      </div>
    </div>
  );
};

export default Chat;
