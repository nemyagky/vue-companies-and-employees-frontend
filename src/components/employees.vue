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
import { DataTableHeader } from "vuetify";
import { Employee } from "../interfaces/employee.interface";
import { EmployeesService } from "../services/employees.service";
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
      { text: "Дата создания", value: "created_at", filterable: false },
      { text: "Сотрудник", value: "username", filterable: true },
      { text: "Компания", value: "company_name", filterable: true },
      {
        text: "Действия",
        value: "action",
        sortable: false,
        filterable: false,
        align: "end"
      }
    ];
  }

  private async getTableRows() {
    this.tableRows = await EmployeesService.getEmployeesList();
  }
}
</script>
