<template>
  <v-container> 
    <h2>Consumos del Día</h2>
    <v-data-table-server
      v-model:item-per-page="itemsPerPage"
      :headers="headers"
      :items="items"
      :loading="loading"
      @update:options="loadConsumptions"
    ></v-data-table-server>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';

const itemsPerPage = ref(10);
const loading = ref(true);
const headers = ref([
  {title: 'id', key: 'id'},
]);
const items = ref([]);

const loadConsumptions = async () => {
  loading.value = true;
  const response = await fetch('https://iqkwvr8wsh.execute-api.us-east-1.amazonaws.com/v1/ConsumosDelDia', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const json = await response.json();
  const body = JSON.parse(json.body);
  console.log(body)
  items.value = body.results;
  loading.value = false;
}

// const response = await fetch('https://iqkwvr8wsh.execute-api.us-east-1.amazonaws.com/v1/ConsumosDelDia', {
//   method: 'GET',
//   headers: {
//     'Content-Type': 'application/json'
//   }
// });
// const items = await response.json();
// console.log(items);
</script>
