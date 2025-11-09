
import React, { useEffect, useMemo, useState } from 'react'
import { fetchResource } from '../api/swapi.js'

function formatMetersFromCm(cm) {
  if (!cm || cm === 'unknown') return 'Unknown'
  const m = Number(cm) / 100
  if (Number.isNaN(m)) return 'Unknown'
  return m.toFixed(2) + ' m'
}

function formatMass(kg) {
  if (!kg || kg === 'unknown') return 'Unknown'
  const n = Number(String(kg).replace(',', ''))
  if (Number.isNaN(n)) return 'Unknown'
  return n + ' kg'
}

function formatDate(iso) {
  if (!iso) return 'Unknown'
  try {
    const d = new Date(iso)
    return d.toLocaleString()
  } catch {
    return 'Unknown'
  }
}

function extractIdFromUrl(url) {
  const match = url.match(/\/(\d+)\/?$/)
  return match ? match[1] : null
}

export default function CharacterModal({ character, onClose }) {
  const [homeworld, setHomeworld] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!character) return
    let cancelled = false
    setLoading(true)
    setError(null)
    setHomeworld(null)

    fetchResource(character.homeworld)
      .then((json) => { if (!cancelled) setHomeworld(json) })
      .catch((e) => { if (!cancelled) setError(e) })
      .finally(() => { if (!cancelled) setLoading(false) })

    return () => { cancelled = true }
  }, [character])

  const id = character ? extractIdFromUrl(character.url) : null
  const imgSrc = new URL(
    `../assets/characters/${id}.jpg`,
    import.meta.url
  ).href;

  if (!character) return null

  return (
    <div className="fixed inset-0 z-20 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
      <div className="w-full max-w-2xl rounded-xl bg-gray-900 border border-white/10 overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
          <h2 className="text-lg font-semibold">{character.name}</h2>
          <button onClick={onClose} className="rounded-md border border-white/10 px-3 py-1 hover:bg-white/10">Close</button>
        </div>

        <div className="p-4 grid gap-4 sm:grid-cols-[160px,1fr]">
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
            w-full 
            h-48 
            sm:h-56
            object-cover 
            object-top 
            rounded-lg 
            border border-white/10
          "
        />


          <div className="space-y-2 text-sm">
            <p><span className="opacity-70">Height:</span> {formatMetersFromCm(character.height)}</p>
            <p><span className="opacity-70">Mass:</span> {formatMass(character.mass)}</p>
            <p><span className="opacity-70">Date added:</span> {formatDate(character.created)}</p>
            <p><span className="opacity-70">Films:</span> {character.films?.length ?? 0}</p>
            <p><span className="opacity-70">Birth year:</span> {character.birth_year}</p>
          </div>
        </div>

        <div className="px-4 pb-4">
          <h3 className="font-medium mb-2">Homeworld</h3>
          {loading && <div className="text-sm opacity-75">Loading homeworld…</div>}
          {error && <div className="text-sm text-red-400">Failed to load homeworld.</div>}
          {homeworld && (
            <div className="grid sm:grid-cols-2 gap-2 text-sm rounded-lg border border-white/10 p-3">
              <p><span className="opacity-70">Name:</span> {homeworld.name}</p>
              <p><span className="opacity-70">Terrain:</span> {homeworld.terrain}</p>
              <p><span className="opacity-70">Climate:</span> {homeworld.climate}</p>
              <p><span className="opacity-70">Population:</span> {homeworld.population}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
