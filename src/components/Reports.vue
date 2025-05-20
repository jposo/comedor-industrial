<template>
  <v-container>
    <h2>Resúmenes Ejecutivos</h2>
  </v-container>
  <v-container>
    <h3>Detalles de Consumos del Día</h3>
  </v-container>
  <v-container>
    <v-data-table-server
      v-model:item-per-page="itemsPerPage"
      :headers="headers1"
      :items="items1"
      :items-length="totalItems1"
      :loading="loading1"
      @update:options="consumosDetallados"
    >
      <template v-slot:item.fecha="{ item }">
        {{ new Date(item.fecha).toLocaleDateString() }}
      </template>
      <template v-slot:item.monto_total_venta="{ item }">
        {{ `$${item.monto_total_venta.toFixed(2)}` }}
      </template>
    </v-data-table-server>
  </v-container>

  <v-container>
    <h3>Totales por Día</h3>
  </v-container>
  <v-container>
    <v-data-table-server
      v-model:item-per-page="itemsPerPage"
      :headers="headers2"
      :items="items2"
      :items-length="totalItems2"
      :loading="loading2"
      @update:options="totalesPorDia"
    >
      <template v-slot:item.dia="{ item }">
        {{ new Date(item.dia).toLocaleDateString() }}
      </template>
      <template v-slot:item.total="{ item }">
        {{ `$${item.total.toFixed(2)}` }}
      </template>
    </v-data-table-server>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";

const itemsPerPage = ref(10);
const totalItems1 = ref(0);
const loading1 = ref(true);
const headers1 = ref([
  { title: "Fecha", key: "fecha", sortable: false },
  { title: "Tipo", key: "tipo", sortable: false },
  { title: "Total de Consumos", key: "total_consumos", sortable: false },
  { title: "Total de Venta", key: "monto_total_venta", sortable: false },
]);
const items1 = ref([]);

const totalItems2 = ref(0);
const loading2 = ref(true);
const headers2 = ref([
  { title: "Día", key: "dia", sortable: false },
  { title: "Total", key: "total", sortable: false },
]);
const items2 = ref([]);

const consumosDetallados = async () => {
  loading1.value = true;
  const response1 = await fetch(
    "https://iqkwvr8wsh.execute-api.us-east-1.amazonaws.com/v1/ConsumosDelDiaDetalles",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  const body1 = await response1.json();
  items1.value = body1.results;
  totalItems1.value = body1.results.length;
  loading1.value = false;
};

const totalesPorDia = async () => {
  loading2.value = true;
  const response2 = await fetch(
    "https://iqkwvr8wsh.execute-api.us-east-1.amazonaws.com/v1/TotalesPorDia",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  const body2 = await response2.json();
  console.log(body2);
  items2.value = body2.results;
  totalItems2.value = body2.results.length;
  loading2.value = false;
};
</script>
