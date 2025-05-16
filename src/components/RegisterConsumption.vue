<template>
  <v-container>
    <h2>Registrar Consumo</h2>
  </v-container>
  <v-container>
    <v-form v-model="valid">
      <v-select
        v-model="consumption"
        label="Seleccione el Consumo"
        :items="consumptions"
        required
      >
      </v-select>
      <v-text-field
        v-model="name"
        type="number"
        label="Número de Empleado"
        :rules="[v => !isNaN(v) || 'El número de empleado es requerido']"
        required
      ></v-text-field>
      <v-btn class="mt-2" block @click="registerConsumption">Registrar</v-btn>
    </v-form>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';

const consumptions = ref([
  'Consumo 1',
  'Consumo 2',
  'Consumo 3',
]);

const valid = ref(false);
const consumption = ref(null);
const name = ref('');

const registerConsumption = () => {
  if (valid.value) {
    console.log(`Registrando consumo: ${consumption.value} para el empleado: ${name.value}`);
  } else {
    console.log('Formulario no válido');
  }
};
</script>
