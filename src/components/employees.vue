<template>
  <Table
    :headers="tableHeaders"
    :rows="tableRows"
    :title="'Список сотрудников'"
    :mode="'employees'"
  />
</template>


<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import DataTableHeader from "../interfaces/dataTableHeader.interface";
import { Employee } from "../interfaces/employee.interface";
import Table from "../views/Table.vue";

@Component({
  components: { Table }
})
export default class Employees extends Vue {
  private tableHeaders: DataTableHeader[] = [];
  private tableRows: Employee[] = [];

  private created() {
    this.initTableHeaders();
    this.getTableRows();
  }

  private initTableHeaders() {
    this.tableHeaders = [
      { text: "Дата создания", value: "createdAt", filterable: false },
      { text: "Сотрудник", value: "username", filterable: true },
      { text: "Компания", value: "companyName", filterable: true },
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
        username: "Иван Мягкий",
        companyName: "Рога И Копыта"
      },
      {
        id: "2",
        createdAt: Date.now().toString(),
        username: "Иван Немягкий",
        companyName: "Рога И Копыта"
      }
    ];
  }
}
</script>
