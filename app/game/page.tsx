import TestMain from "../ui/game/TestMain";

export default function Page() {
  return (
    <main className="flex flex-col justify-center items-center">
      <div className={`text-5xl pb-20 pt-10`}>The Game</div>
      <TestMain />
    </main>
  );
}
