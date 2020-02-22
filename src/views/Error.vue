<template>
  <v-alert
    :value="isActive"
    border="right"
    colored-border
    type="error"
    elevation="7"
    transition="scale-transition"
  >{{text}}</v-alert>
</template>


<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({})
export default class Error extends Vue {
  private text: string = "";
  private isActive: boolean = false;

  public showError(text: string) {
    this.text = text;
    this.isActive = true;

    setTimeout(() => {
      this.isActive = false;
    }, 3000);
  }
}
</script>


<style lang="scss" scoped>
.v-alert {
  z-index: 1;
  position: absolute;
  top: 20px;
  right: 30px;
  max-width: 700px;
}
</style>
