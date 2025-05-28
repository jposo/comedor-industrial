<template>
  <v-container>
    <h2>Resúmenes Ejecutivos</h2>
  </v-container>
  <v-container>
    <h3>Detalles de Consumos del Día</h3>
  </v-container>
  <v-container>
    <v-row>
      <v-col cols="12" md="6">
        <v-date-picker
          v-model="date"
          @update:modelValue="updateDate"
          hide-header
          class="mx-auto"
        />
      </v-col>
      <v-col cols="12" md="6">
        <v-data-table-server
          v-model:item-per-page="itemsPerPage"
          :headers="headers1"
          :items="items1"
          :items-length="totalItems1"
          :loading="loading1"
          @update:options="consumosDetallados"
        >
        <template v-slot:item.monto_total_venta="{ item }">
          {{ `$${item.monto_total_venta.toFixed(2)}` }}
        </template>
        </v-data-table-server>
      </v-col>
    </v-row>
  </v-container>

  <v-container>
    <h3>Totales por Día</h3>
  </v-container>
  <v-container>
    <v-row>
      <v-col cols="8" md="8">
        <v-select
          v-model="month"
          label="Mes"
          :items="months"
          item-title="title"
          item-value="value"
          return-object
          @update:modelValue="updateMonth"
        />
      </v-col>
      <v-col cols="8" md="4">
        <v-number-input
          v-model="year"
          label="Año"
          control-variant="stacked"
          required
          @update:modelValue="updateYear"
        />
      </v-col>
    </v-row>
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
        {{ adjustDate(item.dia).toLocaleDateString() }}
      </template>
      <template v-slot:item.total="{ item }">
        {{ `$${item.total.toFixed(2)}` }}
      </template>
    </v-data-table-server>
  </v-container>
</template>

<script setup>
import { ref, shallowRef, computed } from "vue";

const months = [
  { title: "Enero", value: 1 },
  { title: "Febrero", value: 2 },
  { title: "Marzo", value: 3 },
  { title: "Abril", value: 4 },
  { title: "Mayo", value: 5 },
  { title: "Junio", value: 6 },
  { title: "Julio", value: 7 },
  { title: "Agosto", value: 8 },
  { title: "Septiembre", value: 9 },
  { title: "Octubre", value: 10 },
  { title: "Noviembre", value: 11 },
  { title: "Diciembre", value: 12 },
];
const month = shallowRef(
  months.find((month) => month.value === new Date().getMonth() + 1),
);
const year = shallowRef(new Date().getFullYear());

const totalVenta = ref(0);
const totalConsumos = ref(0);

const itemsPerPage = ref(10);
const totalItems1 = ref(0);
const loading1 = ref(true);
const headers1 = computed(() => [
  // { title: "Fecha", key: "fecha", sortable: false },
  { title: "Tipo", key: "tipo", sortable: false },
  {
    title: `Total de Consumos (${totalConsumos.value})`,
    key: "total_consumos",
    sortable: false,
  },
  {
    title: `Total de Venta ($${totalVenta.value.toFixed(2)})`,
    key: "monto_total_venta",
    sortable: false,
  },
]);
const items1 = ref([]);
const date = ref(new Date());

const totalItems2 = ref(0);
const loading2 = ref(true);
const headers2 = ref([
  { title: "Día", key: "dia", sortable: false },
  { title: "Total", key: "total", sortable: false },
]);
const items2 = ref([]);

const consumosDetallados = async () => {
  loading1.value = true;
  const day = date.value.toISOString().split("T")[0];
  const queryString = `?fecha=${day}`;
  const response1 = await fetch(
    "https://iqkwvr8wsh.execute-api.us-east-1.amazonaws.com/v1/ConsumosDelDiaDetalles" +
      queryString,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  const body1 = await response1.json();
  totalConsumos.value = 0;
  totalVenta.value = 0;
  body1.results.forEach((r) => {
    totalVenta.value += r.monto_total_venta;
    totalConsumos.value += r.total_consumos;
  });
  items1.value = body1.results;
  totalItems1.value = body1.results.length;
  loading1.value = false;
};

const totalesPorDia = async () => {
  loading2.value = true;
  const queryString = `?month=${month.value.value}&year=${year.value}`;
  const response2 = await fetch(
    "https://iqkwvr8wsh.execute-api.us-east-1.amazonaws.com/v1/TotalesPorDia" +
      queryString,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  const body2 = await response2.json();
  items2.value = body2.results;
  totalItems2.value = body2.results.length;
  loading2.value = false;
};

const updateDate = (value) => {
  date.value = value;
  consumosDetallados();
};

const updateMonth = (value) => {
  month.value = value;
  totalesPorDia();
};

const updateYear = (value) => {
  year.value = value;
  totalesPorDia();
};

const adjustDate = (dateString) => {
  const date = new Date(dateString);
  return new Date(date.getTime() + (24 * 60 * 60 * 1000));
};
</script>
