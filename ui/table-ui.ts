import { DataType, TableData } from './model';

export class TableUI {
  element = ".table";

  constructor(data: TableData) {
    this.displayTable(data);
  }

  parseCategoryName(category: string): string {
    const dashIndex = category.indexOf("-") + 1;
    const categoryNameOnly = category.slice(dashIndex, category.length);
    const uppercaseCharacters = category.match(/[A-Z]/g)?.map(letter => category.indexOf(letter));
    return category.slice(dashIndex, category.length);
  }

  buildTable(data: TableData) {
    let table = "";
    Object.keys(data).forEach(key => {
      let row = `<tr><td>${this.parseCategoryName(key)}</td>`;
      data[key].forEach(one => row += `<td>${one}<td>`);
      row += `</tr>`;
      table += row;
    });
    return table;
  }

  displayTable(data: TableData) {
    const selector = document.querySelector('.table');
    const table = this.buildTable(data);
    selector.innerHTML = table;
  }

}