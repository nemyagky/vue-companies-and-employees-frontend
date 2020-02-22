import { TableRow } from './tableRow.interface';

export interface Employee extends TableRow {
   created_at: string;
   username: string;
   company_name: string;
}
