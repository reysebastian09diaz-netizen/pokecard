<script setup>
import { ref } from 'vue';
const numero1 = ref(5);
const numero2 = ref(8);
function sumar() {
  return numero1.value + numero2.value;
}
</script>


<template>
<article class="tarjeta">
<h1>hola{{message}}</h1>
</article>

</template>




<style lang="css">
.tarjeta{
  background-color: rgb(18, 17, 20);
border: 40px solid rgb(rgb(0, 213, 255));
  padding: 1rem;

}

</style>