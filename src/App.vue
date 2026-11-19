<template>
  <div class="pagina">

    <header>
      <h1>Pokémon</h1>
      <p>POKÉDEX</p>
    </header>

    <button class="btn-cambiar" @click="cambiarPokemon">
      🔄 Cambiar Pokémon
    </button>

    <p v-if="cargando" class="mensaje">
      Cargando Pokémon...
    </p>

    <p v-if="error" class="mensaje">
      {{ error }}
    </p>

    <main v-if="pokemon && !cargando" class="contenido">

      <!-- Tarjeta del Pokémon -->
      <section
        class="tarjeta"
        :style="{ background: fondoTarjeta }"
      >
        <h2>{{ nombre }}</h2>

        <img
          :src="pokemon.sprites.other['official-artwork'].front_default"
          :alt="nombre"
          class="imagen-pokemon"
        />

        <div class="datos">
          <span>Altura: {{ pokemon.height / 10 }} m</span>
          <span>Peso: {{ pokemon.weight / 10 }} kg</span>
        </div>
      </section>

      <!-- Información y tipos -->
      <section class="informacion">
        <h2 class="numero"># {{ pokemon.id }}</h2>

        <h2>Tipos del Pokémon</h2>
        <div class="tipos">
          <span
            v-for="tipo in pokemon.types"
            :key="tipo.type.name"
            class="etiqueta"
            :style="{ background: colores[tipo.type.name] || '#777' }"
          >
            {{ emojis[tipo.type.name] }}
            {{ tipo.type.name.toUpperCase() }}
          </span>
        </div>

        <h2>Debilidades del Pokémon</h2>
        <div class="tipos">
          <span
            v-for="debilidad in debilidades"
            :key="debilidad"
            class="etiqueta"
            :style="{ background: colores[debilidad] || '#777' }"
          >
            {{ emojis[debilidad] }}
            {{ debilidad.toUpperCase() }}
          </span>
        </div>
      </section>

      <!-- Estadísticas -->
      <section class="estadisticas">
        <h2>Estadísticas</h2>

        <div
          v-for="stat in pokemon.stats"
          :key="stat.stat.name"
          class="estadistica"
        >
          <strong>
            {{ nombresStats[stat.stat.name] }}:
            {{ stat.base_stat }}/255
          </strong>

          <div class="barra">
            <div
              class="progreso"
              :style="{
                width: Math.min(stat.base_stat / 255 * 100, 100) + '%',
                background: fondoTarjeta
              }"
            ></div>
          </div>
        </div>
      </section>

    </main>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import {
  obtenerPokemon,
  obtenerEspecie,
  obtenerDebilidades
} from './api/pokeapi'

const pokemon = ref(null)
const debilidades = ref([])
const nombre = ref('')
const cargando = ref(false)
const error = ref('')

// Colores sólidos para poder mezclarlos si hay 2 tipos
const colores = {
  fire: '#F08030',
  water: '#6890F0',
  grass: '#78C850',
  electric: '#F8D030',
  ground: '#E0C068',
  rock: '#B8A038',
  ice: '#98D8D8',
  psychic: '#F85888',
  poison: '#A040A0',
  bug: '#A8B820',
  flying: '#A890F0',
  fighting: '#C03028',
  dragon: '#7038F8',
  ghost: '#705898',
  dark: '#705848',
  steel: '#B8B8D0',
  fairy: '#EE99AC',
  normal: '#A8A878'
}

const emojis = {
  fire: '🔥', water: '💧', grass: '🌿', electric: '⚡',
  ground: '🌍', rock: '🪨', ice: '❄️', psychic: '🔮',
  poison: '☠️', bug: '🐛', flying: '🪽', fighting: '🥊',
  dragon: '🐉', ghost: '👻', dark: '🌑', steel: '⚙️',
  fairy: '🧚', normal: '⭐'
}

const nombresStats = {
  hp: 'HP',
  attack: 'Ataque',
  defense: 'Defensa',
  'special-attack': 'Ataque especial',
  'special-defense': 'Defensa especial',
  speed: 'Velocidad'
}

// Si tiene 2 tipos combina ambos colores; si tiene 1, lo desvanece con blanco
const fondoTarjeta = computed(() => {
  if (!pokemon.value) return '#F08030'

  const tipos = pokemon.value.types
  const color1 = colores[tipos[0].type.name] || '#A8A878'

  if (tipos.length > 1) {
    const color2 = colores[tipos[1].type.name] || '#A8A878'
    return `linear-gradient(135deg, ${color1}, ${color2})`
  }

  return `linear-gradient(135deg, ${color1}, #ffffff88)`
})

async function buscarPokemon(id) {
  cargando.value = true
  error.value = ''

  try {
    const datos = await obtenerPokemon(id)
    pokemon.value = datos

    const especie = await obtenerEspecie(datos.species.url)
    const nombreEspanol = especie.names.find(item => item.language.name === 'es')
    nombre.value = nombreEspanol ? nombreEspanol.name : datos.name

    const primerTipo = datos.types[0].type.name
    debilidades.value = await obtenerDebilidades(primerTipo)
  } catch (e) {
    error.value = 'No se pudo cargar el Pokémon. Intenta nuevamente.'
    pokemon.value = null
  } finally {
    cargando.value = false
  }
}

function cambiarPokemon() {
  let nuevoId
  do {
    nuevoId = Math.floor(Math.random() * 1025) + 1
  } while (pokemon.value && nuevoId === pokemon.value.id)

  buscarPokemon(nuevoId)
}

onMounted(() => {
  buscarPokemon(322)
})
</script>

<style>
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: Arial, sans-serif;
  background: #f5f5f5;
  color: #222;
}

.pagina {
  width: 100%;
  min-height: 100vh;
  padding: 20px;
}

header {
  text-align: center;
  margin-bottom: 15px;
}

header h1 {
  margin: 0;
  color: #2455A4;
  font-size: 48px;
  font-weight: 900;
  -webkit-text-stroke: 1px #F4D33D;
}

header p {
  margin-top: 8px;
  letter-spacing: 5px;
  font-weight: bold;
}

.btn-cambiar {
  display: block;
  margin: 15px auto 25px;
  padding: 12px 25px;
  background: #ef8731;
  border: none;
  border-radius: 10px;
  color: white;
  font-size: 16px;
  cursor: pointer;
  box-shadow: 0 3px 6px rgba(0,0,0,0.15);
}

.btn-cambiar:hover {
  background: #d96d1e;
}

.contenido {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
  gap: 35px;
  max-width: 1400px;
  margin: auto;
}

.tarjeta {
  min-height: 500px;
  border-radius: 20px;
  padding: 25px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  color: white;
  box-shadow: 0 8px 20px rgba(0,0,0,0.12);
  transition: background 0.3s;
}

.tarjeta h2 {
  color: white;
  text-shadow: 1px 1px 4px rgba(0,0,0,0.4);
  font-size: 28px;
  margin: 0;
}

.imagen-pokemon {
  width: 85%;
  max-height: 310px;
  object-fit: contain;
  filter: drop-shadow(0 8px 12px rgba(0,0,0,0.25));
}

.datos {
  display: flex;
  width: 100%;
  justify-content: space-around;
  background: rgba(0, 0, 0, 0.15);
  padding: 10px;
  border-radius: 12px;
  font-size: 18px;
}

.informacion {
  text-align: center;
}

.informacion h2 {
  font-size: 24px;
  margin: 20px 0;
}

.numero {
  font-size: 65px !important;
  color: #ed8431;
  margin: 0;
}

.tipos {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
  margin: 15px 0;
}

.etiqueta {
  padding: 10px 16px;
  color: white;
  border-radius: 20px;
  font-size: 13px;
  font-weight: bold;
  box-shadow: 0 2px 5px rgba(0,0,0,0.15);
}

.estadisticas {
  text-align: center;
  width: 100%;
}

.estadisticas h2 {
  font-size: 26px;
  margin-bottom: 25px;
}

.estadistica {
  margin-bottom: 20px;
}

.estadistica strong {
  display: block;
  font-size: 14px;
  margin-bottom: 8px;
}

.barra {
  width: 100%;
  height: 16px;
  background: #e0e0e0;
  border-radius: 20px;
  overflow: hidden;
}

.progreso {
  height: 100%;
  transition: width 0.4s;
}

.mensaje {
  text-align: center;
  font-size: 18px;
}

@media (max-width: 900px) {
  .contenido {
    grid-template-columns: 1fr;
  }

  .tarjeta {
    min-height: 400px;
  }

  .imagen-pokemon {
    max-height: 250px;
  }

  .numero {
    font-size: 50px !important;
  }
}
</style>