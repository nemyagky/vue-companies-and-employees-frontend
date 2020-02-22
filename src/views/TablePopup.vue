<template>
  <v-dialog v-bind:value="isOpen" max-width="500px" @input="!isOpen ? $emit('close') : 0">
    <template v-slot:activator="{ on }">
      <v-btn color="primary" dark class="mb-2" v-on="on" @click="$emit('open-popup')">Создать</v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">{{header}}</span>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-row>
            <v-col v-for="input in data.properties" :key="input.title" cols="12" sm="6" md="6">
              <v-text-field v-if="input.type ==='input'" v-model="input.value" :label="input.label"></v-text-field>
              <v-select
                v-if="input.type === 'select'"
                v-model="input.value"
                :item-text="input.value"
                :item-value="input.value"
                :items="input.selectData"
                :label="input.label"
              ></v-select>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="$emit('close')">Закрыть</v-btn>
        <v-btn color="blue darken-1" text @click="save">Сохранить</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>


<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Company } from "../interfaces/company.interface";
import { CompanyPopupData } from "../interfaces/companyPopupData.interface";
import { Employee } from "../interfaces/employee.interface";
import { EmployeePopupData } from "../interfaces/employeePopupData.interface";
import { CompaniesService } from "../services/companies.service";
import { EmployeesService } from "../services/employees.service";

@Component({
  props: {
    isOpen: Boolean,
    mode: String as () => "employees" | "companies"
  }
})
export default class TablePopup extends Vue {
  private data: EmployeePopupData | CompanyPopupData = {};
  private header: string = "";
  private type: "edit" | "create" = "create";

  /**
   * Row is actual equals to Company | Employee | never, but Typescript throw an error
   * This function calls in Table.vue and it get row, from which pupup will be built
   *
   * Если мы создаем новую строку в колонке - тогда row будет пуст. Иначе row будет что-то содержать
   */
  public initPopup(row: any | never) {
    if (this.$props.mode === "employees") {
      this.data = this.getPopupDataFromEmployee(row);
      this.header = row ? "Изменение сотрудника" : "Создание сотрудника";
      this.type = row ? "edit" : "create";
    }

    if (this.$props.mode === "companies") {
      this.data = this.getPopupDataFromCompany(row);
      this.header = "Создание компании";
      this.type = "create";
    }
  }

  private getPopupDataFromEmployee(employee: Employee): EmployeePopupData {
    return {
      id: employee?.id || 1,
      properties: {
        firstName: {
          value: employee?.username.split(" ")[0] || "",
          label: "Имя",
          type: "input"
        },
        lastName: {
          value: employee?.username.split(" ")[1] || "",
          label: "Фамилия",
          type: "input"
        },
        company: {
          value: employee?.companyName || "",
          label: "Компания",
          type: "select",
          // selectData: CompaniesService.getCompaniesList()
          selectData: ["hjj"]
        }
      }
    };
  }

  private getPopupDataFromCompany(company: Company): CompanyPopupData {
    return {
      id: company?.id || 1,
      properties: {
        name: {
          value: company?.name || "",
          label: "Название компании",
          type: "input"
        }
      }
    };
  }

  private async save() {
    this.$emit("close");

    // queryData - объект, который в дальнейшем будет отправлен на сервер
    const queryData: any | false = this.popupDataToQueryData();
    if (!queryData) {
      return;
    }

    if (this.$props.mode === "employees") {
      if (this.type === "edit") {
        const newEmployeeData = await EmployeesService.updateEmployee(
          queryData
        );
        this.$emit("edited-row", newEmployeeData);
      }

      if (this.type === "create") {
        const newEmployeeData = await EmployeesService.createEmployee(
          queryData
        );
        this.$emit("new-row", newEmployeeData);
      }
    }

    if (this.$props.mode === "companies") {
      if (this.type === "create") {
        CompaniesService.createCompany(queryData).then(newCompanyData => {
          this.$emit("new-row", newCompanyData);
        });
      }
    }
  }

  /**
   * Проходимся по всем свойствам в popupData.properties и присваеваем их value в возращаемый объект
   */
  private popupDataToQueryData() {
    const queryData: any = {};
    const popupData: any = this.data.properties;

    for (const property in popupData) {
      if (popupData.hasOwnProperty(property)) {
        // Если хоть одно поле является пустой строкой, то в дальнейшем запрос на сервер не будет отправлен
        if (popupData[property].value === "") {
          return false;
        }
        queryData[property] = popupData[property].value;
      }
    }

    // id лежит в this.data.id, а не в this.data.properties, поэтому присваиваем его вне цикла
    if (this.type === "edit") {
      queryData.id = this.data.id;
    }

    return queryData;
  }
}
</script>
