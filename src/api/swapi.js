
const BASE = 'https://swapi.dev/api'

export async function fetchPeople(page = 1, search = '') {
  const url = new URL(BASE + '/people/')
  if (page) url.searchParams.set('page', page)
  if (search) url.searchParams.set('search', search)
  const res = await fetch(url)
  if (!res.ok) throw new Error('Failed to fetch people')
  return res.json()
}

export async function fetchResource(url) {
  const res = await fetch(url)
  if (!res.ok) throw new Error('Failed to fetch resource')
  return res.json()
}
