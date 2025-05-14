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
      <v-btn class="mt-2" type="submit" block>Registrar</v-btn>
    </v-form>
  </v-container>
</template>

<script setup></script>
