import type { WorkSheet, WorkBook as XLSXWorkBook } from "xlsx";

export class WorkBook implements XLSXWorkBook {
  Sheets: Record<string, WorkSheet> = {};
  SheetNames: string[] = [];
}
