<template>
  <div class="contenedor">
    <h2>Contador Mejorado</h2>

    <h1 :class="colorContador">
      {{ contador }}
    </h1>

    <div class="botones">
      <button @click="incrementar">
        +1
      </button>

      <button
        @click="decrementar"
        :disabled="contador === -5"
      >
        -1
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const contador = ref(0)

const incrementar = () => {
  contador.value++
}

const decrementar = () => {
  if (contador.value > -5) {
    contador.value--
  }
}

const colorContador = computed(() => {
  if (contador.value > 0) return 'verde'
  if (contador.value < 0) return 'rojo'
  return 'negro'
})
</script>

<style scoped>
.contenedor {
  text-align: center;
  padding: 20px;
}

.botones button {
  margin: 5px;
  padding: 10px 20px;
  font-size: 16px;
}

.verde {
  color: green;
}

.rojo {
  color: red;
}

.negro {
  color: black;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>