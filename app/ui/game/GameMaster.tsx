"use client";

import { useState, useEffect } from "react";
import { GameStatus } from "@/app/lib/types";
import TypeArea from "./TypeArea";

const placeholder = "This is a test. Type this as fast as possible!";

export default function GameMaster({
  gameStatus,
  setGameStatus,
  setWpm,
  setAcc,
  initialTimerVal,
}: {
  gameStatus: GameStatus;
  setGameStatus: (gameStatus: GameStatus) => void;
  setWpm: (wpm: number) => void;
  setAcc: (acc: number) => void;
  initialTimerVal: number;
}) {
  const [timerVal, setTimerVal] = useState(initialTimerVal);
  const [input, setInput] = useState([""]);

  useEffect(() => {
    if (gameStatus === "finished") {
      // analyse input
      const timeTaken = initialTimerVal - timerVal;
      const totalLength = input.reduce(
        (partialSum, curr) => partialSum + curr.length,
        0
      );
      setWpm((totalLength * (60 / timeTaken)) / 5);
    }
  }, [gameStatus]);

  return (
    <div className="flex flex-col">
      <TypeArea
        rawText={placeholder}
        gameStatus={gameStatus}
        setGameStatus={setGameStatus}
        input={input}
        setInput={setInput}
      />
      <Timer
        gameStatus={gameStatus}
        setGameStatus={setGameStatus}
        timerVal={timerVal}
        setTimerVal={setTimerVal}
      />
    </div>
  );
}

function Timer({
  gameStatus,
  setGameStatus,
  timerVal,
  setTimerVal,
}: {
  gameStatus: GameStatus;
  setGameStatus: (gameStatus: GameStatus) => void;
  timerVal: number;
  setTimerVal: (timerVal: number) => void;
}) {
  useEffect(() => {
    if (gameStatus === "started") {
      const timerId = setTimeout(() => {
        setTimerVal(timerVal - 0.1);
      }, 100);

      if (Math.round(timerVal) === 0) {
        clearTimeout(timerId);
        setGameStatus("finished");
      }
    }
  });

  return <div>{Math.round(timerVal)}</div>;
}
