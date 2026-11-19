<script setup>
import {ref} from 'vue';
import tarjetasaludo from './components/tarjetasaludo.vue';

const numero1 = 5;
const numero2 = 8;
let resultado = ref(0);

function sumar(){
resultado.value = numero1 + numero2
  
}
function restar(){
 resultado.value = numero1 - numero2
}


let edad = ref(10);

const frutas = ref([
    "manzana", "pera", "naranja"
])

const estudiantes = ref([
    {id:1,
    nombre:"pepa",
    edad:14

    },

    {
        id:2,
        nombre:"juan",
        edad:23
    },


    {
        id:3,
        nombre:"luis",
        edad:16

    }
])
</script>

<template>
 <h1>Mi primera APP</h1>
 <p>el resultado es {{ resultado }}</p>
<button @click="restar">restar</button>
<button @click="sumar">sumar</button>
<p v-if="edad>18">es mayor de edad</p>

<button @click="edad=19">19 años</button>
<button @click="edad=10">reset</button>


<br/>
<br/>
<br/>
<hr>

<ul>
    <li v-for="estudiante in estudiantes" key="estudiante.id">
        <h3>Hola soy {{ estudiante.nombre }} y tengo {{ estudiante.edad }} años</h3>
    </li>
</ul>


<br/>
<br/>
<br/>
<hr>

<ul>
    <li v-for="fruta in frutas" key="fruta">
        <h4>{{ fruta }}</h4>
    </li>
</ul>

<br/>
<br/>
<br/>
<hr>

<ul>
    <li v-for="estudiante in estudiantes" key="estudiante.id">
        <h3 v-if="estudiante.edad >= 22">Hola soy {{ estudiante.nombre }} y tengo {{ estudiante.edad }} años</h3>
    </li>
</ul>



</template>
 



<style lang="css">


</style>