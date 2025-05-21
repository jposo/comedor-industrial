<template>
  <v-container>
    <h2>Registrar Consumo</h2>
  </v-container>
  <v-container>
    <h3>Tiempo Actual: {{ time }}</h3>
    <h3>Tipo de Consumo: {{ type }}</h3>
  </v-container>
  <v-container>
    <v-form ref="form">
      <v-number-input
        v-model="number"
        label="Número de empleado"
        control-variant="stacked"
        required
      ></v-number-input>
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
const number = ref(1);

const time = ref('');
const type = ref('');

onMounted(() => {
  updateTime();
  setInterval(() => {
    updateTime();
  }, 1000);
});

const updateTime = () => {
  const date = new Date();
  time.value = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  type.value = consumptionType() ?? "No disponible";
}

const consumptionType = () => {
  const date = new Date();
  const hour = 14; //date.getHours();

  return hour >= 6 && hour < 11
    ? "Desayuno"
    : hour >= 11 && hour < 15
      ? "Comida"
      : undefined;
};

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

  console.log("Registering Consumption:", number.value, type);

  const response = await fetch(
    "https://iqkwvr8wsh.execute-api.us-east-1.amazonaws.com/v1/RegistrarConsumo",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tipo_consumo: type,
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
