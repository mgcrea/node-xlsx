import type {WorkBook as XLSXWorkBook, WorkSheet} from 'xlsx';

export class WorkBook implements XLSXWorkBook {
  Sheets: Record<string, WorkSheet> = {};
  SheetNames: string[] = [];
}
