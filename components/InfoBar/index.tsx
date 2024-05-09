"use client";
import { FunctionComponent, useEffect, useState } from "react";
import InfoBlock from "./InfoBlock";
import Medal from "@/public/svgs/medal.svg";
import User from "@/public/svgs/user.svg";
import Clock from "@/public/svgs/clock.svg";

interface InfoBarProps {
  username?: string;
  points?: string;
}

const InfoBar: FunctionComponent<InfoBarProps> = ({
  username = "",
  points = "",
}) => {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const timer = setInterval(() => {
      const date = new Date();
      const formattedTime = date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false, // 24-hour format
      });
      setTime(formattedTime);
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="grid grid-cols-3 gap-3">
      <InfoBlock text={points.toString()} icon={Medal} />
      <InfoBlock text={username} icon={User} />
      <InfoBlock text={time} icon={Clock} />
    </div>
  );
};

export default InfoBar;
