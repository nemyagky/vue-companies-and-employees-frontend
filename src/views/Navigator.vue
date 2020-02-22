<template>
  <router-link :to="$route.path === '/employees' ? '/companies' : '/employees'">
    <v-btn
      depressed
      large
      color="primary"
    >{{$route.path === "/employees" ? "К списку компаний" : "К списку сотрудников"}}</v-btn>
  </router-link>
</template>


<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({})
export default class Navigator extends Vue {}
</script>


<style lang="scss" scoped>
.v-btn {
  position: absolute;
  bottom: 20px;
  right: 20px;
}
</style>
