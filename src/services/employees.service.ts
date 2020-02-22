import { Employee } from './../interfaces/employee.interface';

export class EmployeesService {
   public static createEmployee(employee: { [propName: string]: string }): Promise<Employee> {
      return new Promise((resolve) => {
         resolve({
            id: 3,
            created_at: "Типа текущее время",
            username: employee.firstName + " " + employee.lastName,
            companyName: employee.company
         });
      });
   }

   public static updateEmployee(employee: { [propName: string]: any }): Promise<Employee> {
      return new Promise((resolve) => {
         resolve({
            id: employee.id,
            created_at: "Типа текущее время",
            username: employee.firstName + " " + employee.lastName,
            companyName: employee.company
         });
      });
   }

   public static deleteEmployeeById(employeeId: number) {
      // TODO query to server
      console.log(employeeId);
   }
}
