import { Container } from "@/components/container";
import { GameCard } from "@/components/GameCard";
import { GameProps } from "@/utils/types/game";
import { Metadata } from "next";
import Image from "next/image";
import { redirect } from "next/navigation";
import Label from "./components/label";

interface PropsParams {
  params: { id: string };
}

export async function generateMetadata({
  params,
}: PropsParams): Promise<Metadata> {
  try {
    const response = await fetch(
      `${process.env.NEXT_API_URL}/next-api/?api=game&id=${params.id}`,
      { next: { revalidate: 60 } }
    )
      .then((res) => res.json())
      .catch(() => {
        return {
          title: "Daily Game - Descubra jogos incriveis para se divertir",
        };
      });

    return {
      title: response.title,
      description: `${response.description.slice(0, 100)}...`,
      openGraph: {
        title: response.title,
        description: `${response.description.slice(0, 100)}...`,
        images: [
          {
            url: response.image_url,
          },
        ],
      },
    };
  } catch (err) {
    return {
      title: "Daily Game - Descubra jogos incriveis para se divertir",
    };
  }
}

async function getData(id: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_API_URL}/next-api/?api=game&id=${id}`
    );
    return res.json();
  } catch (err) {
    throw new Error("Erro ao buscar dados do jogo");
  }
}

async function getGameSorted() {
  try {
    const res = await fetch(
      `${process.env.NEXT_API_URL}/next-api/?api=game_day`,
      { cache: "no-store" }
    );
    return res.json();
  } catch (err) {
    throw new Error("Erro ao buscar dados do jogo");
  }
}
export default async function Game({
  params: { id },
}: {
  params: { id: string };
}) {
  const data: GameProps = await getData(id);
  const sortedGame: GameProps = await getGameSorted();

  if (!data) {
    redirect("/");
  }

  return (
    <main className="w-full text-black">
      <div className="bg-black h-80 sm:h-96 w-full relative">
        <Image
          src={data.image_url}
          alt={data.title}
          priority
          fill={true}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 44vw"
          className="object-cover w-full h-80 sm:h-96 opacity-75"
          quality={100}
        />
      </div>
      <Container>
        <h1 className="text-xl font-bold">{data.title}</h1>
        <p>{data.description}</p>

        <h2 className="text-lg font-bold">Clique no botão abaixo para jogar</h2>

        <h2 className="text-lg font-bold mt-7 mb-2">Plataformas</h2>
        <div className="flex gap-2 flex-wrap">
          {data.platforms.map((item) => (
            <Label key={item} name={item} />
          ))}
        </div>

        <h2 className="text-lg font-bold mt-7 mb-2">Categorias</h2>
        <div className="flex gap-2 flex-wrap">
          {data.categories.map((item) => (
            <Label key={item} name={item} />
          ))}
        </div>

        <p className="mt-7 mb-2">
          <strong>Data de lançamento: </strong>
          {data.release}
        </p>

        <h2 className="text-lg font-bold mt-7 mb-2">Jogos recomendado:</h2>
        <div className="flex">
          <div className="flex-grow">
            <GameCard data={sortedGame} />
          </div>
        </div>
      </Container>
    </main>
  );
}
