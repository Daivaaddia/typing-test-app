import { georama } from "./ui/fonts";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col justify-center items-center">
      <h1 className={`${georama.className} text-600 text-5xl`}>Welcome</h1>
      <div className="bg-white text-black">
        <Link href="/game">Game</Link>
      </div>
    </main>
  );
}
