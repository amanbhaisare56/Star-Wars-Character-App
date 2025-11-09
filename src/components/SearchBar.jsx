
import React, { useEffect, useState } from 'react'

export default function SearchBar({ value, onChange, onClear }) {
  const [local, setLocal] = useState(value ?? '')
  useEffect(() => { setLocal(value ?? '') }, [value])

  // Debounce input
  useEffect(() => {
    const id = setTimeout(() => onChange?.(local.trim()), 400)
    return () => clearTimeout(id)
  }, [local])

  return (
    <div className="flex items-center gap-2">
      <input
        className="w-full rounded-md bg-white/5 border border-white/10 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
        placeholder="Search characters by name…"
        value={local}
        onChange={(e) => setLocal(e.target.value)}
      />
      {value && (
        <button
          onClick={onClear}
          className="shrink-0 rounded-md border border-white/10 px-3 py-2 hover:bg-white/10"
        >
          Clear
        </button>
      )}
    </div>
  )
}
