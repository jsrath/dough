import { TableData } from './model';

export class TableUI {
  tableRef = ".table";

  constructor(data: TableData) {
    this.buildTable(data);
  }

  getCategoryType(category: string): string {
    const dashIndex = category.indexOf("-");
    return category.slice(0, dashIndex);
  }

  parseCategoryName(category: string): string {
    const dashIndex = category.indexOf("-") + 1;
    const categoryName = category.slice(dashIndex, category.length).replace(/([A-Z])/g, " $1");
    return `${categoryName.charAt(0).toUpperCase()}${categoryName.slice(1)}`;
  }

  buildTable(data: TableData) {
    Object.keys(data).forEach(key => {
      const selector: HTMLTableElement = document.querySelector(`.${this.getCategoryType(key)} tbody`);
      const row = selector.insertRow(-1);
      data[key].forEach((cell, index) => row.insertCell(index).appendChild(document.createTextNode(this.formatNumber(cell))));
      const category = document.createTextNode(this.parseCategoryName(key));
      row.insertCell(0).appendChild(category);
      const headerRow: HTMLTableElement = document.querySelector(`.${this.getCategoryType(key)} thead tr th`);
      headerRow.setAttribute("colspan", (data[key].length + 1).toString());
    });
  }

  formatNumber(input: number): string {
    const decimalsRemoved = input.toLocaleString('en-US', { maximumFractionDigits: 0 });
    if (input > 0) {
      return decimalsRemoved;
    }
    return input < 0 ? this.replaceNegativesWithParentheses(decimalsRemoved) : "-";
  }

  replaceNegativesWithParentheses(input: string): string {
    return `(${input.substring(1, input.length)})`;
  }
}