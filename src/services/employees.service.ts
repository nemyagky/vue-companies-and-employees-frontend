import axios from "axios";
import { Employee } from './../interfaces/employee.interface';
import { ErrorService } from './error.service';

export class EmployeesService {

   public static async createEmployee(employee: { [propName: string]: string | number }): Promise<Employee> {
      try {
         const response = await axios.post("http://localhost:3000/employee", employee);
         return response.data[0];
      } catch (e) {
         ErrorService.showError(e.response?.data);
         throw e;
      }
   }

   public static async updateEmployee(employee: { [propName: string]: string | number }): Promise<Employee> {
      try {
         const response = await axios.patch("http://localhost:3000/employee", employee);
         return response.data[0];
      } catch (e) {
         ErrorService.showError(e.response?.data);
         throw e;
      }
   }

   public static async deleteEmployeeById(employeeId: number): Promise<Employee> {
      try {
         const response = await axios.delete("http://localhost:3000/employee", {
            data: { id: employeeId }
         });
         return response.data[0];
      } catch (e) {
         ErrorService.showError(e.response?.data);
         throw e;
      }
   }

   /**
    * Возращаем список всех пользователей. Так как объеъм данных небольшой, то нет смысла заморачиваться с пагинацией
    * Vuetify table предоставляет пагинацию из коробки
    */
   public static async getEmployeesList(): Promise<Employee[]> {
      try {
         const response = await axios.get("http://localhost:3000/employees");
         return response.data;
      } catch (e) {
         ErrorService.showError(e.response?.data);
         throw e;
      }
   }
}
