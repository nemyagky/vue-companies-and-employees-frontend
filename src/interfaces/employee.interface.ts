import { TableRow } from './tableRow.interface';

export interface Employee extends TableRow {
   createdAt: string;
   username: string;
   companyName: string;
}
