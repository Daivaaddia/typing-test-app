export default function Results({ wpm, acc }: { wpm: number; acc: number }) {
  return (
    <div className="flex flex-col">
      <div>WPM: {wpm}</div>
      <div>Acc: {acc}</div>
    </div>
  );
}
