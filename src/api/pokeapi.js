
const API = 'https://pokeapi.co/api/v2'

export async function obtenerPokemon(id) {
  const respuesta = await fetch(`${API}/pokemon/${id}`)

  if (!respuesta.ok) {
    throw new Error('Pokémon no encontrado')
  }

  return await respuesta.json()
}

export async function obtenerEspecie(url) {
  const respuesta = await fetch(url)
  return await respuesta.json()
}

export async function obtenerDebilidades(tipo) {
  const respuesta = await fetch(`${API}/type/${tipo}`)
  const datos = await respuesta.json()

  return datos.damage_relations.double_damage_from.map(
    item => item.name
  )
}
