<template>
  <v-container>
    <h2>Registrar Consumo</h2>
  </v-container>
  <v-container>
    <v-form v-model="valid">
      <v-text-field
        v-model="name"
        type="number"
        label="Número de Empleado"
        required
      ></v-text-field>
      <v-btn class="mt-2" type="submit" block>Registrar</v-btn>
    </v-form>
  </v-container>
</template>

<script setup></script>
