import { parseCategoryName } from "../util/util";
import { Attributes, DomElements, DOMElement } from "../models/model";

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

  private populateYearOptions(years: string[]) {
    const selectElements = [...document.querySelectorAll(`${this.yearsSelector}`)] as HTMLSelectElement[];
    selectElements.forEach((selectElement: HTMLSelectElement, index) => {
      years.forEach((year: string) => {
        const optionProperties = { text: year, value: year };
        const option = document.createElement(DomElements.Option);
        this.addAttributesToElement(option, optionProperties);
        selectElement.add(option);
      });
      selectElement.value = this.dates[index];
    });
  }

  private populatePropertyOptions(properties: string[]) {
    const parentElement: HTMLDivElement = document.querySelector(`${this.propertiesSelector} fieldset`);
    properties.forEach((property: string) => {
      const inputElement: HTMLInputElement = document.createElement(DomElements.Input);
      const labelElement: HTMLLabelElement = document.createElement(DomElements.Label);
      const containerElement: HTMLDivElement = document.createElement(DomElements.Div);
      const labelProperties = {
        htmlFor: property,
        innerText: parseCategoryName(property)
      };
      const inputProperties = {
        type: DomElements.Checkbox,
        name: property,
        id: property,
      };

      this.addAttributesToElement(labelElement, labelProperties);
      this.addAttributesToElement(inputElement, inputProperties);
      containerElement.append(inputElement, labelElement);
      parentElement.appendChild(containerElement);
    });
  }

  private addAttributesToElement(element: DOMElement, attributes: Attributes): DOMElement {
    Object.keys(attributes).forEach((attribute: keyof Attributes) => element[attribute] = attributes[attribute]);
    return element;
  }

}