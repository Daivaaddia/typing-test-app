"use client";

import { useState } from "react";
import { GameStatus } from "@/app/lib/types";
import GameMaster from "./GameMaster";
import Results from "./Results";

export default function TestMain() {
  const [wpm, setWpm] = useState(0);
  const [acc, setAcc] = useState(0);
  const [gameStatus, setGameStatus] = useState<GameStatus>("idle");

  return (
    <div className="flex flex-col">
      <div className={`${gameStatus === "finished" ? "hidden" : ""}`}>
        <GameMaster
          gameStatus={gameStatus}
          setGameStatus={setGameStatus}
          setWpm={setWpm}
          setAcc={setAcc}
          initialTimerVal={10}
        />
      </div>

      <div className={`${gameStatus === "finished" ? "" : "hidden"}`}>
        <Results wpm={wpm} acc={acc}></Results>
      </div>
    </div>
  );
}
