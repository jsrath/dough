import { DataService } from "./data.service";

export class GraphOptionsUI {
  years: string[];
  selector = ".graph-options select";
  dataService: DataService;
  dates: string[];

  constructor(data: string[], dates: string[]) {
    this.years = data;
    this.dates = dates;
    this.populateYearOptions(this.years);
  }

  populateYearOptions(years: string[]) {
    const selectElements = [...document.querySelectorAll(`${this.selector}`)] as HTMLSelectElement[];
    selectElements.forEach((selectElement: HTMLSelectElement, index) => {
      years.forEach(year => {
        const option = document.createElement("option");
        option.text = year;
        option.value = year;
        selectElement.add(option);
      });
      selectElement.value = this.dates[index]
    });
  }


  populatePropertyOptions() {

  }

}