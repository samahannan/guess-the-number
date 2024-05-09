"use client";
import Chart from "@/components/Chart";
import ControlBar from "@/components/ControlBar/ControlBar";
import InfoBar from "@/components/InfoBar/index";
import Trophy from "@/public/svgs/trophy.svg";
import WelcomeBlock from "@/components/WelcomeBlock";
import socket from "@/lib/websocket";
import { createContext, useEffect, useState } from "react";
import SpeedSlider from "@/components/SpeedSlider";
import Chat from "@/components/Chat";
import { EMPTY_RANKINGS, EMPTY_ROUND } from "@/lib/constants";
import RoundTable from "@/components/RoundTable";
import RankingTable from "@/components/RankingTable";

export interface Player {
  id?: string;
  name: string;
  points: number;
  multiplier?: number;
  pointsPlaced?: number;
  no?: number;
}

export interface InitialContext {
  playerOne: Player | null;
  players: Player[];
}

export const GlobalStateContext = createContext<InitialContext>({
  playerOne: null,
  players: [],
});

export default function Home() {
  const [showControls, setShowControls] = useState(false);
  const [players, setPlayers] = useState([]);
  const [playerOne, setPlayerOne] = useState<Player | null>(null);
  const [rankings, setRankings] = useState<any>(EMPTY_RANKINGS);
  const [roundPlayers, setRoundPlayers] = useState<any>(EMPTY_ROUND);
  const [gameStatus, setGameStatus] = useState<any>(EMPTY_ROUND);

  useEffect(() => {
    socket.on("setup_game", ({ players, human }) => {
      setShowControls(true);
      setPlayers(players);
      setPlayerOne(human);
    });

    socket.on("round_update", ({ roundData, rankings, human }: any) => {
      setRoundPlayers(roundData);
      setRankings(rankings);
      setPlayerOne(human);
    });

    socket.on("game_status", ({ status }) => {
      setGameStatus(status);
    });

    // return () => {
    //   socket.disconnect();
    // };
  }, []);

  return (
    <GlobalStateContext.Provider value={{ playerOne, players }}>
      <main className="flex min-h-screen flex-col gap-4 justify-between p-24">
        <div className="grid lg:grid-cols-6 w-full gap-4">
          <div className="lg:col-span-2 self-stretch">
            {showControls ? (
              <div className="flex flex-col gap-4">
                {playerOne && (
                  <ControlBar
                    username={playerOne?.name}
                    gameStatus={gameStatus}
                  />
                )}
                <div className="mb-4">
                  <RoundTable
                    gameStatus={gameStatus}
                    icon={Trophy}
                    title={"Current Round"}
                    data={roundPlayers}
                  />
                </div>
                <SpeedSlider />
              </div>
            ) : (
              <WelcomeBlock />
            )}
          </div>
          <div className="lg:col-span-4 flex flex-col gap-3">
            <InfoBar
              username={playerOne?.name || ""}
              points={playerOne?.points.toString()}
            />
            <Chart />
          </div>
        </div>
        <div className="grid lg:grid-cols-7 gap-4">
          <div className="lg:col-span-4">
            <RankingTable icon={Trophy} title={"Ranking"} data={rankings} />
          </div>
          <div className="lg:col-span-3">
            <Chat username={playerOne?.name} disabled={!showControls} />
          </div>
        </div>
      </main>
    </GlobalStateContext.Provider>
  );
}
