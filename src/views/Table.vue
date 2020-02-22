<template>
  <v-row justify="center">
    <v-col class="table-wrapper">
      <v-data-table
        :headers="headers"
        :items="rows"
        :page.sync="activePage"
        :items-per-page="rowsPerPage"
        :search="filterString"
        hide-default-footer
      >
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>{{ title }}</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-text-field
              v-model="filterString"
              append-icon="search"
              label="Искать"
              single-line
              hide-details
            ></v-text-field>
            <TablePopup
              :isOpen="isPopupOpen"
              :mode="mode"
              ref="popup"
              @open-popup="openPopup"
              @close="closePopup"
              @new-row="addRow"
              @edited-row="editRow"
            />
          </v-toolbar>
        </template>

        <template v-slot:item.action="{ item }">
          <v-icon v-if="mode==='employees'" class="mr-2" @click="openPopup(item)">edit</v-icon>
          <v-icon @click="deleteRow(item)">delete</v-icon>
        </template>
      </v-data-table>
      <div class="text-center table-pagination">
        <v-pagination v-model="activePage" :length="Math.ceil(rows.length / rowsPerPage)"></v-pagination>
      </div>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { DataTableHeader } from "vuetify";
import { Company } from "../interfaces/company.interface";
import { Employee } from "../interfaces/employee.interface";
import { TableRow } from "../interfaces/tableRow.interface";
import { CompaniesService } from "../services/companies.service";
import { EmployeesService } from "../services/employees.service";
import TablePopup from "./TablePopup.vue";

@Component({
  components: { TablePopup },
  props: {
    headers: Array as () => DataTableHeader[],
    rows: Array as () => TableRow[],
    title: String,
    mode: String as () => "employees" | "companies"
  }
})
export default class Table extends Vue {
  // Typescipt throw an error, so we declare refs
  public $refs!: { popup: TablePopup };
  private filterString: string = "";
  private isPopupOpen: boolean = false;

  private activePage: number = 1;
  private rowsPerPage: number = 7;

  private openPopup(row: TableRow) {
    this.isPopupOpen = true;

    this.$refs.popup.initPopup(row);
  }

  private closePopup() {
    this.isPopupOpen = false;
  }

  private addRow(row: TableRow) {
    this.$props.rows.push(row);
  }

  /**
   * Если просто присовить row в массив props, то не произойдет автоматического обновления HTML. Поэтому костылим
   */
  private editRow(row: { [propname: string]: any }) {
    // Перебираем каждое свойство в rowInProps и присваиваем ему свойство из row
    const rowInProps = this.$props.rows[this.getRowIndexById(row.id)];

    for (const property in rowInProps) {
      if (rowInProps.hasOwnProperty(property)) {
        rowInProps[property] = row[property];
      }
    }
  }

  private deleteRow(row: TableRow) {
    if (this.$props.mode === "employees") {
      EmployeesService.deleteEmployeeById(row.id).then(() => {
        this.$props.rows.splice(this.getRowIndexById(row.id), 1);
      });
    }

    if (this.$props.mode === "companies") {
      CompaniesService.deleteCompanyById(row.id).then(() => {
        this.$props.rows.splice(this.getRowIndexById(row.id), 1);
      });
    }
  }

  private getRowIndexById(id: number): number {
    return this.$props.rows.findIndex(
      (row: Employee | Company) => row.id === id
    );
  }
}
</script>


<style lang="scss" scoped>
.table-wrapper {
  margin-top: 10px;
  max-width: 1000px;
}

th.text-start {
  text-align: center;
  display: none !important;
}

.v-text-field {
  max-width: 225px;
  margin-right: 30px;

  label {
    margin-left: 5px;
  }
}

.table-pagination {
  margin-top: 30px;

  .v-pagination__item--active {
    background-color: #1867bf !important;
  }
}
</style>
