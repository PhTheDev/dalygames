import { Container } from "@/components/container";
import { Input } from "@/components/input";
import { GameProps } from "@/utils/types/game";
import Image from "next/image";
import Link from "next/link";
import { BsArrowRightSquare } from "react-icons/bs";

async function getDailyGame() {
  try {
    const res = await fetch(
      `${process.env.NEXT_API_URL}/next-api/?api=game_day`,
      { next: { revalidate: 320 } }
    );
    return res.json();
  } catch (error) {
    console.error("Error fetching daily game:", error);
    return null;
  }
}

export default async function Home() {
  const dailyGame: GameProps = await getDailyGame();

  if (!dailyGame) {
    return (
      <main className="w-full">
        <Container>
          <h1 className="text-xl font-bold text-center mt-8 mb-5">
            Erro ao carregar o jogo do dia
          </h1>
        </Container>
      </main>
    );
  }

  return (
    <main className="w-full">
      <Container>
        <h1 className="text-2xl font-bold text-center mt-8 mb-5">
          Separamos um jogo exclusivo para você
        </h1>

        <Link href={`/game/${dailyGame.id}`}>
          <section className="w-full bg-black rounded-lg relative h-96">
            <Image
              src={dailyGame.image_url}
              alt={dailyGame.title}
              priority={true}
              quality={100}
              fill={true}
              className="object-cover rounded-lg opacity-50 hover:opacity-100 transition-all duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 44vw"
            />
            <div className="absolute z-20 bottom-0 p-4 w-full bg-gradient-to-t from-black/60 to-transparent">
              <div className="flex items-center gap-2">
                <p className="font-bold text-xl text-white">
                  {dailyGame.title}
                </p>
                <BsArrowRightSquare size={24} color="#fff" />
              </div>
            </div>
          </section>
        </Link>

        <Input />
        
      </Container>
    </main>
  );
}
