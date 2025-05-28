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
      <v-container class="d-flex flex-row align-center justify-center ga-3">
        <v-avatar size="64px">
          <v-img v-if="foto" :src="createObjectURL(foto)" alt="Foto" />
          <v-icon size="64px" v-else icon="mdi-account-circle" />
        </v-avatar>
        <v-file-input
          v-model="foto"
          :rules="fotoRules"
          accept="image/*"
          label="Fotografía"
          prepend-icon="mdi-camera"
          required
        ></v-file-input>
      </v-container>
      <v-btn
        class="mt-2"
        @click="registerEmployee"
        block
        :loading="submitting"
        :disabled="submitting"
      >
        {{ submitting ? "Registrando..." : "Registrar" }}
        <template v-slot:loader>
          <v-progress-circular
            indeterminate
            color="white"
          ></v-progress-circular>
        </template>
      </v-btn>
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
  <v-container>
    <v-data-table-server
      v-model:item-per-page="itemsPerPage"
      :headers="headers"
      :items="items"
      :items-length="totalItems"
      :loading="loading"
      @update:options="loadEmployees"
    >
      <template v-slot:item.foto_url="{ item }">
        <v-avatar size="64px">
          <v-img :src="item.foto_url" alt="Foto" />
        </v-avatar>
      </template>
    </v-data-table-server>
  </v-container>
</template>

<script setup>
import { ref } from "vue";

const itemsPerPage = ref(10);
const totalItems = ref(0);
const loading = ref(true);
const headers = ref([
  { title: "", key: "foto_url", sortable: false, align: "end", width: "64px" },
  { title: "Número de Empleado", key: "id_empleado" },
  { title: "Nombre", key: "nombre" },
  { title: "Departamento", key: "departamento" },
]);
const items = ref([]);

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

const loadEmployees = async ({ sortBy }) => {
  loading.value = true;
  const response = await fetch(
    "https://iqkwvr8wsh.execute-api.us-east-1.amazonaws.com/v1/RegistrarEmpleado",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  const body = await response.json();
  const _items = body.results;
  if (sortBy.length) {
    const sortKey = sortBy[0].key;
    const sortOrder = sortBy[0].order;
    items.value = _items.sort((a, b) => {
      if (sortOrder === "asc") {
        return a[sortKey] > b[sortKey] ? 1 : -1;
      } else {
        return a[sortKey] < b[sortKey] ? 1 : -1;
      }
    });
  } else {
    items.value = _items;
  }
  totalItems.value = body.results.length;
  loading.value = false;
};

const displaySnackbar = (text) => {
  snackbarText.value = text;
  snackbar.value = true;
};

const createObjectURL = (file) => {
  if (file) {
    return URL.createObjectURL(file);
  }
  return null;
};

const registerEmployee = async () => {
  if (!name.value || !departamento.value || !foto.value) {
    return;
  }

  if (submitting.value) {
    return;
  }

  submitting.value = true;
  console.log("Registering Employee:", name.value, departamento.value);

  // base 64 encoding of the image
  let imagen_b64 = "";
  const reader = new FileReader();
  reader.readAsDataURL(foto.value);
  await new Promise((resolve) => {
    reader.onload = () => {
      imagen_b64 = reader.result.split(",")[1];
      resolve();
    };
  });

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

  if (response1.status !== 200) {
    displaySnackbar("Error al subir la foto");
    submitting.value = false;
    return;
  }

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

  displaySnackbar(
    body2.message + `\nNúmero de nuevo empleado: ${body2.results.insertId}`,
  );
  form.value.resetValidation();
  name.value = "";
  departamento.value = "";
  foto.value = null;
  submitting.value = false;
  loadEmployees();
};
</script>
