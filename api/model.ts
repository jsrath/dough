export interface Data {
  [year: string]: Year;
}

export interface Year {
  [month: string]: Month;
}

export interface Month {
  assets: Category;
  income: Category;
  expenses: Category;
}

export interface Category {
  [property: string]: number | boolean;
}

export interface VisualData {
  date: string;
  [property: string]: Category | string;
}
