import { createRouter, createWebHistory } from "vue-router";
import NewEmployeeForm from "@/components/NewEmployeeForm.vue";
import Home from "@/components/Home.vue";
import RegisterConsumption from "@/components/RegisterConsumption.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/register-consumption", component: RegisterConsumption },
  { path: "/new-employee", component: NewEmployeeForm },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
