import { Company } from '@/interfaces/company.interface';

export class CompaniesService {

   public static createCompany(company: { [propName: string]: string }): Promise<Company> {
      return new Promise((resolve) => {
         resolve({
            id: "Айдишник",
            createdAt: "Типа текущее время",
            name: company.name
         });
      });
   }

   public static deleteCompanyById(companyId: string) {
      // TODO query to server
      console.log(companyId);
   }

   public static getCompaniesList(): string[] {
      return ["Рога И Копыта", "Рога И Подковы"];
   }
}
