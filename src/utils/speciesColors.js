
// Map a species name to a Tailwind color utility string
const map = {
  Human: 'from-yellow-500 to-amber-600',
  Droid: 'from-slate-500 to-gray-600',
  Wookiee: 'from-orange-700 to-amber-800',
  'Rodian': 'from-emerald-600 to-green-700',
  'Hutt': 'from-lime-600 to-lime-700',
  "Yoda's species": "from-green-600 to-emerald-700",
  'Trandoshan': 'from-teal-600 to-teal-700',
  'Mon Calamari': 'from-cyan-600 to-sky-700',
  'Ewok': 'from-brown-600 to-amber-700',
  'Sullustan': 'from-pink-600 to-rose-700',
  'Neimodian': 'from-emerald-700 to-teal-700',
  'Gungan': 'from-indigo-600 to-blue-700',
}

export function colorForSpecies(name) {
  return map[name] ?? 'from-purple-600 to-fuchsia-700'
}
  