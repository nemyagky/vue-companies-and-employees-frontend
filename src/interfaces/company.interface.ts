import { TableRow } from './tableRow.interface';

export interface Company extends TableRow {
   createdAt: string;
   name: string;
}
