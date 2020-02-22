import { Company } from '@/interfaces/company.interface';
import axios from "axios";
import { ErrorService } from './error.service';

export class CompaniesService {

   public static async createCompany(company: { [propName: string]: string | number }): Promise<Company> {
      try {
         const response = await axios.post("http://localhost:3000/company", company);
         return response.data[0];
      } catch (e) {
         ErrorService.showError(e.response?.data);
         throw e;
      }
   }

   public static async deleteCompanyById(companyId: number): Promise<Company> {
      try {
         const response = await axios.delete("http://localhost:3000/company", {
            data: { id: companyId }
         });
         return response.data[0];
      } catch (e) {
         ErrorService.showError(e.response?.data);
         throw e;
      }
   }

   /**
    * Возращаем список всех компаний. Так как объеъм данных небольшой, то нет смысла заморачиваться с пагинацией
    * Vuetify table предоставляет пагинацию из коробки
    */
   public static async getCompaniesList(): Promise<Company[]> {
      try {
         const response = await axios.get("http://localhost:3000/companies");
         return response.data;
      } catch (e) {
         ErrorService.showError(e.response?.data);
         throw e;
      }
   }
}
