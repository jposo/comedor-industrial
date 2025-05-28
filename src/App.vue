<template>
  <v-app>
    <v-app-bar>
      <v-app-bar-nav-icon
        @click="drawer = !drawer"
        class="d-sm-none"
      ></v-app-bar-nav-icon>
      <v-app-bar-title>Comedor Industrial</v-app-bar-title>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      :permanent="$vuetify.display.smAndUp"
      :temporary="$vuetify.display.xs"
    >
      <v-list density="compact" nav>
        <v-list-item
          prepend-icon="mdi-view-list"
          title="Consumos Del Día"
          to="/"
          router
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-food-drumstick"
          title="Registrar Consumo"
          to="/register-consumption"
          router
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-account-plus"
          title="Nuevo Empleado"
          to="/new-employee"
          router
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-finance"
          title="Resúmenes Ejecutivos"
          to="/reports"
          router
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const drawer = ref(true);
</script>

<style>
a {
  text-decoration: none;
}
</style>
