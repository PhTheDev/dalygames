import { Container } from "@/components/container";
import { Metadata } from "next";
import Image from "next/image";
import { FaShareAlt } from "react-icons/fa";
import userImg from "../../../public/user.png";
import { FavoriteCard } from "./components/favorite";

export const metadata: Metadata = {
  title: "Meu Perfil - Daly Games sua plataforma de jogos",
  description:
    "Perfil do usuario, onde voce pode adicionar e gerenciar seus jogos favoritos",
};

export default function Profile() {
  return (
    <main className="w-full text-black">
      <Container>
        <section className="mt-8 mb-8 flex flex-col items-center justify-between relative gap-3 sm:flex-row">
          <div className="w-full flex items-center gap-4 text-lg flex-col sm:flex-row justify-center sm:justify-normal">
            <Image
              src={userImg}
              alt="Imagem de perfil do usuario"
              className="w-56 h-56 rounded-full object-cover"
            />
            <h1>Nome do usuario</h1>
          </div>

          <div className="sm:absolute top-0 right-0 gap-3 flex items-center justify-center mt-2">
            <div className="bg-gray-700 px-4 py-3 rounded-lg text-white">
              <button>Configuracoes</button>
            </div>
            <div className="bg-gray-700 px-4 py-3 rounded-lg text-white">
              <FaShareAlt size={24} color="#fff" />
            </div>
          </div>
        </section>

        <section className="flex flex-wrap gap-5 flex-col md:flex-row">
          <div className="flex-grow flex-wrap">
            <FavoriteCard />
          </div>

          <div className="flex-grow flex-wrap">
            <FavoriteCard />
          </div>

          <div className="flex-grow flex-wrap">
            <FavoriteCard />
          </div>
        </section>
      </Container>
    </main>
  );
}
