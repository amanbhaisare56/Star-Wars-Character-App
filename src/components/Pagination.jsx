
import React from 'react'

export default function Pagination({ page, totalPages, hasPrev, hasNext, onPrev, onNext }) {
  if (totalPages <= 1) return null
  return (
    <div className="flex items-center justify-center gap-3 py-4">
      <button
        disabled={!hasPrev}
        onClick={onPrev}
        className="rounded-md border border-white/10 px-3 py-2 disabled:opacity-40 hover:bg-white/10"
      >
        Prev
      </button>
      <span className="text-sm opacity-75">
        Page {page} of {totalPages}
      </span>
      <button
        disabled={!hasNext}
        onClick={onNext}
        className="rounded-md border border-white/10 px-3 py-2 disabled:opacity-40 hover:bg-white/10"
      >
        Next
      </button>
    </div>
  )
}
