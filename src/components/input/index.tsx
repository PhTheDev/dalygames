"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";

export function Input() {
  const [input, setInput] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input === "") return;

    router.push(`/game/search/${input}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full bg-slate-200 my-5 flex gap-2 items-center justify-between rounded-lg p-2 "
    >
      <input
        className="bg-slate-200 w-11/12 outline-none"
        type="text"
        placeholder="Procurando algum jogo?..."
        value={input}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setInput(e.target.value)
        }
      />
      <button type="submit">
        <FiSearch size={24} color="#ea580c" />
      </button>
    </form>
  );
}
