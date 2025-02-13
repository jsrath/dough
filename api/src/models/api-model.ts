export interface Data {
  [year: string]: Year;
}

export interface Year {
  [month: string]: Month;
}

export interface MonthsCategories {
  months: (keyof Year)[], 
  categories: (keyof Month)[]  
}

export interface Month {
  [category: string]: Category;
}

export interface Category {
  [property: string]: number | boolean;
}

export interface Total {
  total: number;
}

export interface VisualData {
  date: string;
  [property: string]: Category | string | number;
}

export interface TableData {
  [property: string]: (number | boolean)[];
}

export enum CategoryType {
  Assets = "assets",
  Income = "income",
  Expenses = "expenses"
}

export const enum CategoryProperty {
  Total = "total"
}
