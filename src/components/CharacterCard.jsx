import React, { useEffect, useState } from "react";

function extractIdFromUrl(url) {
  const match = url.match(/\/(\d+)\/?$/);
  return match ? match[1] : null;
}

export default function CharacterCard({ character, onClick }) {
  const id = extractIdFromUrl(character.url);
  const [species, setSpecies] = useState("…");

  const imgSrc = new URL(
    `../assets/characters/${id}.jpg`,
    import.meta.url
  ).href;

  useEffect(() => {
    let cancelled = false;

    async function fetchSpecies() {
      try {
        if (!character.species || character.species.length === 0) {
          if (!cancelled) setSpecies("Human");
          return;
        }
        const res = await fetch(character.species[0]);
        const data = await res.json();
        if (!cancelled) setSpecies(data.name || "Unknown");
      } catch {
        if (!cancelled) setSpecies("Unknown");
      }
    }

    fetchSpecies();

    return () => {
      cancelled = true;
    };
  }, [character]);

  return (
    <button
    onClick={onClick}
    className="
      group
      rounded-2xl
      overflow-hidden
      bg-gray-900/70
      backdrop-blur
      border border-white/10
      hover:border-indigo-400/40
      transition-all
      duration-300
      hover:shadow-[0_0_25px_rgba(99,102,241,0.5)]
      relative
    "
    >
      {/* Top Section with Image */}
      <div className="relative h-48 bg-gradient-to-br from-yellow-500/20 to-gray-600/30">
        <img
          src={imgSrc}
          alt={character.name}
          onError={(e) => {
            e.currentTarget.src = new URL(
              "../assets/characters/placeholder.jpg",
              import.meta.url
            ).href;
          }}
          className="
            absolute 
            inset-0 
            w-full 
            h-full 
            object-cover 
            object-center
            transition 
            duration-300
            group-hover:scale-110
          "
        />
      </div>

      {/* Bottom Content */}
      <div className="p-4 space-y-1">
        <h3 className="text-lg font-semibold text-white">
          {character.name}
        </h3>

        <p className="text-sm text-gray-300">
          Species: <span className="opacity-80">{species}</span>
        </p>

        <p className="text-sm text-gray-300">
          Birth Year: <span className="opacity-80">{character.birth_year}</span>
        </p>
      </div>
    </button>
  );
}
