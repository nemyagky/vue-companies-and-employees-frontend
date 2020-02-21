import { Employee } from './../interfaces/employee.interface';

export class EmployeesService {
   public static createEmployee(employee: { [propName: string]: string }): Promise<Employee> {
      return new Promise((resolve) => {
         resolve({
            id: "Айдишник",
            createdAt: "Типа текущее время",
            username: employee.firstName + " " + employee.lastName,
            companyName: employee.company
         });
      });
   }

   public static updateEmployee(employee: { [propName: string]: string }): Promise<Employee> {
      return new Promise((resolve) => {
         resolve({
            id: employee.id,
            createdAt: "Типа текущее время",
            username: employee.firstName + " " + employee.lastName,
            companyName: employee.company
         });
      });
   }

   public static deleteEmployeeById(employeeId: string) {
      // TODO query to server
      console.log(employeeId);
   }
}
