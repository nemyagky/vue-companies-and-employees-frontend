import Vue from 'vue';
import VueRouter from 'vue-router';
import Companies from "../components/companies.vue";
import Employees from "../components/employees.vue";

Vue.use(VueRouter);

export default new VueRouter({
  mode: "history",
  routes: [
    {
      path: '/employees',
      name: 'Employees',
      component: Employees,
    },
    {
      path: '/companies',
      name: 'Companies',
      component: Companies,
    }
  ]
});
