<template>
  <v-container>
    <h2>Nuevo Empleado</h2>
  </v-container>
  <v-container>
    <v-form v-model="valid">
      <v-text-field v-model="name" label="Nombre" required></v-text-field>
      <v-text-field
        v-model="departamento"
        label="Departamento"
        required
      ></v-text-field>
      <v-file-input
        v-model="foto"
        label="Fotografía"
        prepend-icon="mdi-camera"
        required
      ></v-file-input>
      <v-btn class="mt-2" @click="registerEmployee" block>Registrar</v-btn>
    </v-form>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';

const name = ref('');
const departamento = ref('');
const foto = ref(null);

const registerEmployee = async () => {
  console.log('registerEmployee', name.value, departamento.value);
  // base 64 encoding of the image
  const reader = new FileReader();
  let foto_b64 = '';
  reader.readAsDataURL(foto.value);
  reader.onload = () => {
    foto_b64 = reader.result.split(',')[1];
  };

  await fetch('')

  await fetch('https://iqkwvr8wsh.execute-api.us-east-1.amazonaws.com/v1/RegistrarEmpleado', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      nombre: name.value,
      departamento: departamento.value,
      foto_b64
    })
  })
};
</script>
