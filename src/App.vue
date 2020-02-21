<template>
  <v-app>
    <router-view />
    <Navigator />
  </v-app>
</template>


<script lang="ts">
import Vue from "vue";
import Navigator from "./components/navigator.vue";

export default Vue.extend({
  components: { Navigator }
});
</script>


<style>
body {
  font-family: "Avenir", Helvetica, Arial, "sans-serif";
}
</style>
