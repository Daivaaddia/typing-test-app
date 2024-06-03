"use client";

import clsx from "clsx";
import { useEffect, useState } from "react";
import { GameStatus } from "@/app/lib/types";

export default function TypeArea({
  rawText,
  gameStatus,
  setGameStatus,
  input,
  setInput,
}: {
  rawText: string;
  gameStatus: GameStatus;
  setGameStatus: (gameStatus: GameStatus) => void;
  input: string[];
  setInput: any;
}) {
  const [focused, setFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [caretWordPos, setCaretWordPos] = useState(0);
  const [caretLetterPos, setCaretLetterPos] = useState(0);

  const text = rawText.split(" ");

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (gameStatus === "idle") setGameStatus("started");

    if (e.target.value === " ") {
      e.target.value = "";
      return;
    }

    const newInput = e.target.value.split(/\s+/);
    setInput(newInput);

    setInputValue(e.target.value.replace(/\s{2,}/g, " "));

    let newCaretPos = e.target.selectionStart ?? 0;
    const editedInputVal = e.target.value
      .slice(0, newCaretPos)
      .replace(/\s{2,}/g, " ");
    newCaretPos -= e.target.value.length - editedInputVal.length;

    const spaces = editedInputVal.slice(0, newCaretPos).match(/\s/g);
    const numSpaces = spaces ? spaces.length : 0;
    setCaretWordPos(numSpaces);

    const lastSpaceIndex = e.target.value
      .slice(0, newCaretPos)
      .lastIndexOf(" ");
    setCaretLetterPos(
      newCaretPos - (lastSpaceIndex === -1 ? 0 : lastSpaceIndex + 1)
    );
  };

  useEffect(() => {
    if (
      inputValue[inputValue.length - 1] === " " &&
      input.length >= text.length &&
      input[text.length - 1].length > 0
    ) {
      setGameStatus("finished");
      return;
    }

    if (
      input.length === text.length &&
      input[text.length - 1].length === text[text.length - 1].length
    ) {
      setGameStatus("finished");
      return;
    }
  }, [input]);

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setFocused(false);
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setFocused(true);
  };

  return (
    <div className="flex flex-row justify-center items-center outline p-12 w-[1000px] text-2xl relative">
      <div className={`absolute ${focused ? "hidden" : ""}`}>
        Click to focus!
      </div>
      <div
        className={`flex flex-row items-center justify-center text-container w-full h-full ${
          focused ? "" : "blur-sm"
        }`}
      >
        <div className="flex flex-row">
          {text.map((word, i) => (
            <Word
              key={i}
              word={
                i >= input.length || word.length >= input[i].length
                  ? word
                  : word + input[i].slice(word.length)
              }
              ogWord={word}
              input={input}
              index={i}
              caretWordPos={caretWordPos}
              caretLetterPos={caretLetterPos}
              focused={focused}
            ></Word>
          ))}
        </div>
      </div>
      <input
        value={inputValue}
        onChange={inputHandler}
        onBlur={handleBlur}
        onFocus={handleFocus}
        className="text-black w-full h-full top-0 left-0 absolute opacity-0"
        type="text"
      ></input>
    </div>
  );
}

function Word({
  word,
  ogWord,
  input,
  index,
  caretWordPos,
  caretLetterPos,
  focused,
}: {
  word: string;
  ogWord: string;
  input: string[];
  index: number;
  caretWordPos: number;
  caretLetterPos: number;
  focused: boolean;
}) {
  const mustNeutral = index >= input.length;
  return (
    <div className="flex flex-row">
      {word.split("").map((letter, i) => (
        <Letter
          key={i}
          isNeutral={mustNeutral || i >= input[index].length}
          isCorrect={
            !(mustNeutral || i >= input[index].length) &&
            i < ogWord.length &&
            input[index][i] === letter
          }
          isExtra={i >= ogWord.length}
          letter={letter}
          hasCaret={index === caretWordPos && i === caretLetterPos}
          focused={focused}
        ></Letter>
      ))}
      <Letter
        isNeutral={true}
        isCorrect={false}
        isExtra={false}
        letter={`\xA0`}
        hasCaret={index === caretWordPos && word.length === caretLetterPos}
        focused={focused}
      ></Letter>
    </div>
  );
}

function Letter({
  isNeutral,
  isCorrect,
  isExtra,
  letter,
  hasCaret,
  focused,
}: {
  isNeutral: boolean;
  isCorrect: boolean;
  isExtra: boolean;
  letter: string;
  hasCaret: boolean;
  focused: boolean;
}) {
  const className = clsx("w-4/5 text-2xl", {
    "text-gray-600": isNeutral,
    "text-green-900": !isNeutral && isCorrect,
    "text-red-700": (!isNeutral && !isCorrect) || isExtra,
  });

  if (letter === " ") {
    letter = "\u00A0";
  }

  return (
    <div
      className={`flex flex-row ${className} ${isExtra ? "opacity-50" : ""}`}
    >
      <div>{letter}</div>
      {hasCaret && (
        <div
          className={`absolute -ml-1 text-white animate-[caret-blink_1s_infinite] ${
            focused ? "" : "hidden"
          }`}
        >
          {`\x7c`}
        </div>
      )}
    </div>
  );
}
