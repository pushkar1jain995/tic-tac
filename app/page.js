import GameBoard from "@/components/GameBoard";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <GameBoard/>
    </div>
  );
}
