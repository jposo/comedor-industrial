<template>
  <v-container>
    <h2>Consumos del Día</h2>
  </v-container>
  <v-container>
    <v-data-table-server
      v-model:item-per-page="itemsPerPage"
      :headers="headers"
      :items="items"
      :items-length="totalItems"
      :loading="loading"
      @update:options="loadConsumptions"
    >
      <template v-slot:item.foto_url="{ item }">
        <v-img
          :src="item.foto_url"
          alt="Foto"
          max-width="80"
          max-height="80"
          contain
          class="rounded"
        />
      </template>
      <template v-slot:item.precio="{ item }">
        {{ `$${item.precio.toFixed(2)}` }}
      </template>
    </v-data-table-server>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";

const itemsPerPage = ref(10);
const totalItems = ref(0);
const loading = ref(true);
const headers = ref([
  { title: "", key: "foto_url", sortable: false, width: 70 },
  { title: "Nombre", key: "nombre", sortable: false },
  { title: "Número", key: "id_empleado", sortable: false },
  { title: "Consumo", key: "consumo", sortable: false },
  { title: "Tipo de Consumo", key: "tipo", sortable: false },
  { title: "Precio", key: "precio", sortable: false },
]);
const items = ref([]);

onMounted(async () => {
  setInterval(async () => {
    await loadConsumptions();
  }, 60000);
});

const loadConsumptions = async () => {
  loading.value = true;
  const response = await fetch(
    "https://iqkwvr8wsh.execute-api.us-east-1.amazonaws.com/v1/ConsumosDelDia",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  const body = await response.json();
  items.value = body.results;
  totalItems.value = body.results.length;
  loading.value = false;
};
</script>
