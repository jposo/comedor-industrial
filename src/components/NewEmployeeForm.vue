<template>
  <v-container>
    <h2>Nuevo Empleado</h2>
  </v-container>
  <v-container>
    <v-form ref="form">
      <v-text-field
        v-model="name"
        :rules="nameRules"
        label="Nombre"
        required
      ></v-text-field>
      <v-text-field
        v-model="departamento"
        :rules="dptRules"
        label="Departamento"
        required
      ></v-text-field>
      <v-file-input
        v-model="foto"
        :rules="fotoRules"
        accept="image/*"
        label="Fotografía"
        prepend-icon="mdi-camera"
        required
      ></v-file-input>
      <v-btn class="mt-2" @click="registerEmployee" block>Registrar</v-btn>
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
import { ref } from "vue";

const form = ref();
const submitting = ref(false);
const snackbarText = ref("");
const snackbar = ref(false);

const name = ref("");
const nameRules = [
  (value) => {
    if (value?.length >= 3) return true;
    return "Nombre debe de ser al menos 3 caracteres";
  },
];
const departamento = ref("");
const dptRules = [
  (value) => {
    if (value?.length >= 2) return true;
    return "Departamento debe de ser al menos 2 caracteres";
  },
];
const foto = ref(null);
const fotoRules = [
  (value) => {
    if (value) return true;
    return "Fotografía debe de proporcionarse";
  },
];

const displaySnackbar = (text) => {
  snackbarText.value = text;
  snackbar.value = true;
};

const registerEmployee = async () => {
  if (!name.value || !departamento.value || !foto.value) {
    return;
  }

  if (submitting.value) {
    return;
  }

  submitting.value = true;

  name.console.log("Registering Employee:", name.value, departamento.value);

  // base 64 encoding of the image
  let imagen_b64 = "";
  if (foto.value) {
    const reader = new FileReader();
    reader.readAsDataURL(foto.value);
    await new Promise((resolve) => {
      reader.onload = () => {
        imagen_b64 = reader.result.split(",")[1];
        resolve();
      };
    });
  }

  const response1 = await fetch(
    "https://iqkwvr8wsh.execute-api.us-east-1.amazonaws.com/v1/SubirFoto",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        imagen_b64,
      }),
    },
  );

  const body1 = await response1.json();

  const response2 = await fetch(
    "https://iqkwvr8wsh.execute-api.us-east-1.amazonaws.com/v1/RegistrarEmpleado",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre: name.value,
        departamento: departamento.value,
        foto_url: body1.url,
      }),
    },
  );

  const body2 = await response2.json();

  displaySnackbar(body2.message);
  form.value.resetValidation();
  submitting.value = false;
};
</script>
