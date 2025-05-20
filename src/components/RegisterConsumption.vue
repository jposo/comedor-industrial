<template>
  <v-container>
    <h2>Registrar Consumo</h2>
  </v-container>
  <v-container>
    <v-form ref="form">
      <v-select
        v-model="consumption"
        :hint="`${consumption?.name} ($${consumption?.price.toFixed(2)})`"
        :items="items"
        item-title="name"
        item-value="id"
        label="Consumo"
        persistent-hint
        return-object
        single-line
        required
      ></v-select>
      <v-text-field
        v-model="number"
        label="Número de empleado"
        required
      ></v-text-field>
      <v-btn class="mt-2" @click="registerConsumption" block>Registrar</v-btn>
    </v-form>
    <v-snackbar v-model="snackbar" :timeout="3000">
      {{ snackbarText }}
      <template v-slot:actions>
        <v-btn color="purple" variant="text" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script setup>
import { ref, shallowRef, onMounted } from "vue";

const form = ref();
const submitting = ref(false);
const snackbarText = ref("");
const snackbar = ref(false);
const allow = ref(true);

const consumption = shallowRef({ id: 0, name: "Consumo", price: 0 });
const number = ref("");

const items = ref([]);

const consumptionType = () => {
  const date = new Date();
  const hour = 14; //date.getHours();

  return hour >= 6 && hour < 11
    ? "Desayuno"
    : hour >= 11 && hour < 15
      ? "Comida"
      : undefined;
};

onMounted(async () => {
  const type = consumptionType();

  if (type === undefined) {
    displaySnackbar("Activo entre 6AM - 3PM");
    allow.value = false;
    return;
  }

  const response = await fetch(
    "https://iqkwvr8wsh.execute-api.us-east-1.amazonaws.com/v1/TipoConsumo",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  const body = await response.json();

  const results = body.results.filter((r) => r.tipo === type);
  results.forEach((r) => {
    items.value.push({
      id: r.id_consumo,
      name: r.consumo,
      price: r.precio,
    });
  });

  consumption.value = items.value[0];
});

const registerConsumption = async () => {
  const type = consumptionType();

  if (!number.value || !consumption.value || isNaN(number.value)) {
    displaySnackbar("Formulario no válido");
    return;
  }

  if (submitting.value) {
    displaySnackbar("Se esta registrando un consumo");
    return;
  }

  if (!allow.value || type === undefined) {
    displaySnackbar("Activo entre 6AM - 3PM");
    return;
  }

  submitting.value = true;

  console.log("Registering Consumption:", number.value, consumption.value);

  const response = await fetch(
    "https://iqkwvr8wsh.execute-api.us-east-1.amazonaws.com/v1/RegistrarConsumo",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id_consumo: consumption.value.id,
        id_empleado: parseInt(number.value),
      }),
    },
  );

  const body = await response.json();

  displaySnackbar(body.message);
  form.value.resetValidation();
  submitting.value = false;
};

const displaySnackbar = (text) => {
  snackbarText.value = text;
  snackbar.value = true;
};
</script>
