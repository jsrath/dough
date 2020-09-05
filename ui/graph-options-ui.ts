import { DataService } from "./data.service"

export class GraphOptionsUI {
  years: string[];
  selector = ".graph-options select";

  constructor(data: string[]) {
    this.years = data;
    const dataService = new DataService();
    this.populateOptions(this.years);
  }

  populateOptions(years: string[]) {
    const selectElements = [...document.querySelectorAll(`${this.selector}`)];
    selectElements.forEach((selectElement: HTMLSelectElement) => {
      years.forEach(year => {
        const option = document.createElement("option");
        option.text = year;
        option.value = year;
        selectElement.add(option);
      });
    });
  }
}