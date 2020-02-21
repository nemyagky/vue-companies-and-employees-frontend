<template>
  <Table :headers="tableHeaders" :rows="tableRows" :title="'Список компаний'" :mode="'companies'" />
</template>


<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { DataTableHeader } from "vuetify";
import { Company } from "../interfaces/company.interface";
import Table from "../views/Table.vue";

@Component({
  components: { Table }
})
export default class Companies extends Vue {
  private tableHeaders: DataTableHeader[] = [];
  private tableRows: Company[] = [];

  private created() {
    this.initTableHeaders();
    this.getTableRows();
  }

  private initTableHeaders() {
    this.tableHeaders = [
      {
        text: "Дата создания",
        value: "createdAt",
        filterable: false
      },
      { text: "Название", value: "name", filterable: true },
      {
        text: "Действия",
        value: "action",
        sortable: false,
        filterable: false,
        align: "end"
      }
    ];
  }

  private getTableRows() {
    this.tableRows = [
      {
        id: "1",
        createdAt: Date.now().toString(),
        name: "Рога и Копыта"
      },
      {
        id: "2",
        createdAt: Date.now().toString(),
        name: "Рога и Подковы"
      }
    ];
  }
}
</script>
