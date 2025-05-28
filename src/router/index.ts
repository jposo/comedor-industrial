import { createRouter, createWebHistory } from "vue-router";
// @ts-ignore
import NewEmployeeForm from "@/components/NewEmployeeForm.vue";
// @ts-ignore
import Home from "@/components/Home.vue";
// @ts-ignore
import RegisterConsumption from "@/components/RegisterConsumption.vue";
// @ts-ignore
import Reports from "@/components/Reports.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/register-consumption", component: RegisterConsumption },
  { path: "/new-employee", component: NewEmployeeForm },
  { path: "/reports", component: Reports },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
