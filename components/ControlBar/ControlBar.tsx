import { FunctionComponent, useState } from "react";
import { Button } from "../ui/button";
import PointsInput from "./PointsInput";
import MultiplierInput from "./MultiplierInput";
import socket from "@/lib/websocket";

interface ControlBarProps {
  username: string;
  gameStatus: string;
}

const ControlBar: FunctionComponent<ControlBarProps> = ({
  username,
  gameStatus,
}) => {
  const [multiplier, setMultiplier] = useState(2.5);
  const [wager, setWager] = useState(50);

  const startRound = () => {
    socket.emit("start_round", {
      username,
      wager,
      multiplier,
    });
  };
  return (
    <div className="grid grid-cols-2 gap-2">
      <PointsInput onValueUpdate={(value) => setWager(value)} />
      <MultiplierInput onValueUpdate={(value) => setMultiplier(value)} />
      <div className="col-span-2">
        <Button
          onClick={() => startRound()}
          className={`w-full bg-gradient-to-l from-[#d54f88] to-[#ec7359] text-white`}
          disabled={gameStatus === "hold"}
        >
          Start
        </Button>
      </div>
    </div>
  );
};

export default ControlBar;
