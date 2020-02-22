import { TableRow } from './tableRow.interface';

export interface Company extends TableRow {
   created_at: string;
   name: string;
}
