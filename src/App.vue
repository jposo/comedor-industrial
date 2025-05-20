<template>
  <v-card style="height: 100vh">
    <v-layout>
      <v-navigation-drawer floating permanent>
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
      <v-main style="width: 100%; height: 100vh">
        <v-app>
          <router-view />
        </v-app>
      </v-main>
    </v-layout>
  </v-card>
</template>

<script setup lang="ts">
//
</script>

<style>
a {
  text-decoration: none;
}
</style>
