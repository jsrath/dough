import { parseCategoryName } from "../util/util";

export class GraphOptionsUI {
  years: string[];
  yearsSelector = ".graph-options-years select";
  propertiesSelector = ".graph-options-properties";
  dates: string[];
  properties: string[];

  constructor(data: string[], dates: string[], properties: string[]) {
    this.years = data;
    this.dates = dates;
    this.properties = properties;
    this.populateYearOptions(this.years);
    this.populatePropertyOptions(this.properties);
  }

  populateYearOptions(years: string[]) {
    const selectElements = [...document.querySelectorAll(`${this.yearsSelector}`)] as HTMLSelectElement[];
    selectElements.forEach((selectElement: HTMLSelectElement, index) => {
      years.forEach(year => {
        const option = document.createElement("option");
        option.text = year;
        option.value = year;
        selectElement.add(option);
      });
      selectElement.value = this.dates[index];
    });
  }

  populatePropertyOptions(properties: string[]) {
    const parentElement: HTMLDivElement = document.querySelector(`${this.propertiesSelector} fieldset`);
    properties.forEach(property => {
      const inputElement: HTMLInputElement = document.createElement("input");
      const labelElement: HTMLLabelElement = document.createElement("label");
      const containerElement: HTMLDivElement = document.createElement("div");
      labelElement.htmlFor = property;
      labelElement.innerText = parseCategoryName(property);
      inputElement.type = "checkbox";
      inputElement.name = property;
      inputElement.id = property;
      containerElement.append(inputElement, labelElement);
      parentElement.appendChild(containerElement);
    });
  }

}