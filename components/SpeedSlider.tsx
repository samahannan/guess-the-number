import { FunctionComponent, useState } from "react";
import { Slider } from "@/components/ui/slider";
import Card from "./Card";
import CardTitle from "./CardTitle";
import Speed from "@/public/svgs/speed.svg";
import socket from "@/lib/websocket";

interface SpeedSliderProps {}

const speeds = ["1x", "2x", "3x"];

const SpeedSlider: FunctionComponent<SpeedSliderProps> = () => {
  const [speed, setSpeed] = useState(1);
  return (
    <div>
      <CardTitle text="Speed" icon={Speed} />
      <Card className="p-4">
        <Slider
          className="mb-2"
          defaultValue={[1]}
          onValueChange={(e: any) => {
            setSpeed(e[0]);
            socket.emit("speed", { speed });
          }}
          min={1}
          max={5}
          step={1}
        />
        <div className="flex justify-between">
          {Array.from({ length: 5 }, (_, index) => (
            <div className={speed >= index + 1 ? "text-[#d54f88]" : ""}>
              {index + 1}x
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default SpeedSlider;
