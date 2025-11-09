
import { useEffect, useState } from 'react'
import { fetchPeople } from '../api/swapi.js'

export default function useCharacters(page, search) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)

    fetchPeople(page, search)
      .then((json) => { if (!cancelled) setData(json) })
      .catch((e) => { if (!cancelled) setError(e) })
      .finally(() => { if (!cancelled) setLoading(false) })

    return () => { cancelled = true }
  }, [page, search])

  return { data, loading, error }
}
