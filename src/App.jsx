import React, { useMemo, useState } from 'react'
import SearchBar from './components/SearchBar.jsx'
import Pagination from './components/Pagination.jsx'
import CharacterCard from './components/CharacterCard.jsx'
import CharacterModal from './components/CharacterModal.jsx'
import useCharacters from './hooks/useCharacters.js'

export default function App() {
  const [page, setPage] = useState(1)
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(null)

  const { data, loading, error } = useCharacters(page, query)

  const characters = data?.results ?? []
  const count = data?.count ?? 0
  const totalPages = useMemo(() => Math.max(1, Math.ceil(count / 10)), [count])

  return (
    <div>
      <header className="sticky top-0 z-10 backdrop-blur bg-black/40 border-b border-white/10">
        <div className="container-px py-4 flex items-center justify-between gap-3">
          <h1 className="text-xl sm:text-2xl font-semibold">Star Wars Directory</h1>
        </div>
      </header>

      <main className="container-px py-6 space-y-6">
        <SearchBar value={query} onChange={setQuery} onClear={() => setQuery('')} />

        {loading && (
          <div className="text-center py-12 animate-pulse">Loading characters…</div>
        )}

        {error && (
          <div className="text-center py-6 text-red-400">
            Failed to load characters. Please try again.
          </div>
        )}

        {!loading && !error && characters.length === 0 && (
          <div className="text-center py-12">No characters found.</div>
        )}

        <section className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {characters.map((c) => (
            <CharacterCard key={c.url} character={c} onClick={() => setSelected(c)} />
          ))}
        </section>

        <Pagination
          page={page}
          totalPages={totalPages}
          hasPrev={Boolean(data?.previous)}
          hasNext={Boolean(data?.next)}
          onPrev={() => setPage((p) => Math.max(1, p - 1))}
          onNext={() => setPage((p) => Math.min(totalPages, p + 1))}
        />
      </main>

      <CharacterModal character={selected} onClose={() => setSelected(null)} />
    </div>
  )
}
