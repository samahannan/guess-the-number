"use client";
import { useState, KeyboardEvent, FunctionComponent } from "react";
import Card from "./Card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import socket from "@/lib/websocket";
interface WelcomeBlockProps {}

const WelcomeBlock: FunctionComponent<WelcomeBlockProps> = () => {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);

  const joinGame = () => {
    if (username) {
      setLoading(true);
      socket.emit("username_set", username, () => {
        setLoading(false);
      });
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      joinGame();
    }
  };

  return (
    <Card className="text-center py-20 px-8 h-full">
      <h1 className="mb-20 font-bold text-3xl">Welcome</h1>
      <div>
        <h5 className="text-gray-400 text-[14px] font-medium mb-3">
          Please insert your name
        </h5>
        <Input
          className="mb-4"
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Button
          disabled={loading || username === ""}
          className={`w-full ${
            loading || username === ""
              ? "bg-slate-50 text-zinc-800"
              : "bg-gradient-to-l from-[#d54f88] to-[#ec7359] text-white"
          }`}
          onClick={() => joinGame()}
        >
          Accept
        </Button>
      </div>
    </Card>
  );
};

export default WelcomeBlock;
