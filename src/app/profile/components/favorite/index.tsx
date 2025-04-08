"use client";
import { FormEvent, useState } from "react";
import { FiEdit, FiX } from "react-icons/fi";

export function FavoriteCard() {
  const [input, setInput] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [gameName, setGameName] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (input.trim() === "") return;

    setGameName(input.trim());
    setInput("");
    setShowInput(false);
  }

  function handleOpenInput() {
    setShowInput(true);
  }

  function handleCloseInput() {
    setShowInput(false);
    setInput("");
  }

  return (
    <div className="w-full bg-gray-900 p-4 h-44 text-white rounded-lg flex justify-between flex-col">
      {showInput ? (
        <form
          onSubmit={handleSubmit}
          className="flex items-center justify-center gap-3"
        >
          <input
            className="w-full rounded-md h-8 text-white px-2"
            type="text"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Digite o nome do jogo..."
            autoFocus
          />
          <button
            type="button"
            onClick={handleCloseInput}
            className="hover:scale-105 transition-all"
          >
            <FiX size={24} color="#FFF" />
          </button>
        </form>
      ) : (
        <button
          className="self-start hover:scale-110 duration-200 transition-all"
          onClick={handleOpenInput}
          title="Editar jogo favorito"
        >
          <FiEdit size={24} color="#FFF" />
        </button>
      )}

      {gameName && (
        <div className="flex flex-col gap-1">
          <span className="text-gray-200 text-sm">Jogo Favorito:</span>
          <p className="font-bold text-lg text-white">{gameName}</p>
        </div>
      )}

      {!gameName && (
        <p className="font-bold text-white text-center">
          Adicione seu jogo favorito
        </p>
      )}
    </div>
  );
}
