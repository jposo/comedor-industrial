<template>
  <v-container> 
    <h2>Consumos del Día</h2>
    <v-data-table-server>
      v-model:item-per-page="5"
      :headers="headers"
      :items="items"
    </v-data-table-server>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
</script>
