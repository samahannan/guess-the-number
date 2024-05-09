import { FunctionComponent, useEffect, useState } from "react";
import Card from "./Card";
import socket from "@/lib/websocket";
import CountUp from "react-countup";
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { generateSpeed } from "@/lib/utils";
import { CHART_SPEED } from "@/lib/constants";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);

export const options: any = {
  responsive: true,
  bezierCurve: true,
  animation: {
    duration: CHART_SPEED * 1000, // Animation duration in milliseconds (3 seconds)
  },
  scales: {
    x: {
      type: "linear",
      position: "bottom",
      min: 1,
      max: 10,
      ticks: {
        stepSize: 1,
      },
    },
    y: {
      min: 1,
      max: 10,
      ticks: {
        display: false,
      },
    },
  },
};

const labels = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
const data_options = {
  borderColor: "#d54f88",
  backgroundColor: "#d54f88",
  showLine: true,
};
interface ChartProps {}

const Chart2: FunctionComponent<ChartProps> = () => {
  const [multiplier, setMultiplier] = useState(0.0);
  const [data, setData] = useState<any>({
    labels,
    datasets: [
      {
        label: "",
        data: [{ x: 0, y: 0 }],
        tension: 1,
        ...data_options,
      },
    ],
  });
  const [speed, setSpeed] = useState(1);

  socket.on("new_multiplier", ({ randomMultiplier }) => {
    setMultiplier(randomMultiplier);
    console.log("multiplier", multiplier);
    const data = [
      { x: 0, y: 0 },
      { x: multiplier / 8, y: multiplier / 8 },
      { x: multiplier, y: multiplier },
    ];
    setData({
      labels,
      datasets: [
        {
          label: "",
          data: data,
          ...data_options,
        },
      ],
    });
  });

  useEffect(() => {
    socket.on("speed updated", ({ speed }) => {
      setSpeed(speed);
      console.log("generateSpeed", generateSpeed(speed));
    });
  }, []);

  return (
    <div className="min-h-[612px] bg-red h-full">
      <Card className="pt-12 h-full">
        <CountUp
          className="text-6xl font-bold text-center w-full block"
          start={0}
          end={multiplier}
          redraw={false}
          duration={CHART_SPEED}
          separator=" "
          decimals={2}
          decimal="."
          prefix=""
          suffix="x"
        ></CountUp>
        <div className="p-6">
          <Line options={options} data={data} />
        </div>
      </Card>
    </div>
  );
};

export default Chart2;
