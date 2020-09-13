import { GraphConfigService } from "./services/graph-config.service";
import { DataService } from "./services/data.service";
import { GraphUI } from "./views/graph-ui";
import { GraphOptionsUI } from "./views/graph-options-ui";
import { TableUI } from "./views/table-ui";
import { YearType } from "./models/model";

class DataGraph {
  graphConfig = new GraphConfigService();
  width = this.graphConfig.getWidth();
  height = this.graphConfig.getHeight();
  graphUI: GraphUI;
  graphOptions: GraphOptionsUI;
  dataService: DataService;

  constructor() {
    this.init();
  }

  private async init() {
    const years = process.env.YEARS.split(",");
    const properties = process.env.PROPERTIES.split(",");
    this.dataService = new DataService(years, properties);
    this.graphUI = new GraphUI(await this.dataService.fetchVisualData(), properties.length + 1);
    this.graphOptions = new GraphOptionsUI(await this.dataService.fetchDataYears(), this.dataService.dates, await this.dataService.fetchProperties());
    new TableUI(await this.dataService.fetchTableData());
    this.initializeListeners();
    this.initalizeCheckboxes(properties);
  }

  private initializeListeners() {
    document.querySelectorAll(".graph-options-years select")
      .forEach(element => element.addEventListener("change", () => this.onYearSelect(event)));

    document.querySelectorAll(".graph-options-properties input")
      .forEach(element => element.addEventListener("input", () => this.onPropertySelect(event)));
  }

  private initalizeCheckboxes(properties: string[]) {
    properties.forEach(property => (document.getElementById(property) as HTMLInputElement).checked = true);
  }

  async onYearSelect(event: Event) {
    const target = event.target as HTMLOptionElement;
    const elementType = target.classList[0];

    elementType === YearType.Start
      ? this.setGraphStartYear(target.value)
      : this.setGraphEndYear(target.value);

    this.graphUI.data = await this.dataService.fetchVisualData();
    this.graphUI.initializeSvg();
  }

  async onPropertySelect(event: Event) {
    const target = event.target as HTMLInputElement;
    const name = target.name;
    this.dataService.properties = this.addOrRemoveProperties(this.dataService.properties, name);
    this.graphUI.categoryCount = this.dataService.properties.length + 1;
    this.graphUI.data = await this.dataService.fetchVisualData();
    this.graphUI.initializeSvg();
  }

  private addOrRemoveProperties(existingProperties: string[], newProperty: string): string[] {
    return existingProperties.includes(newProperty)
      ? existingProperties.filter(property => property !== newProperty)
      : [...existingProperties, newProperty];
  }

  private setGraphStartYear(value: string) {
    if (Number(value) > Number(this.dataService.dates[1])) {
      return;
    }
    this.dataService.dates[0] = value;
  }

  private setGraphEndYear(value: string) {
    if (Number(value) < Number(this.dataService.dates[0])) {
      return;
    }
    this.dataService.dates[1] = value;
  }

}

const graph = new DataGraph();