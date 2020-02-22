<template>
  <Table :headers="tableHeaders" :rows="tableRows" :title="'Список компаний'" :mode="'companies'" />
</template>


<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { DataTableHeader } from "vuetify";
import { Company } from "../interfaces/company.interface";
import { CompaniesService } from "../services/companies.service";
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
        value: "created_at",
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

  private async getTableRows() {
    this.tableRows = await CompaniesService.getCompaniesList();
  }
}
</script>
