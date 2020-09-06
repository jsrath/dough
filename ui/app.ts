import { GraphConfigService } from "./graph-config.service";
import { DataService } from "./data.service";
import { GraphUI } from "./graph-ui";
import { GraphOptionsUI } from "./graph-options-ui";
import { TableUI } from "./table-ui";
import { YearType } from "./model";

class DataGraph {
  graphConfig = new GraphConfigService();
  width = this.graphConfig.getWidth();
  height = this.graphConfig.getHeight();
  graphUI: GraphUI;
  graphOptions: GraphOptionsUI;
  dataService: DataService;

  async init() {
    const years = process.env.YEARS.split(",");
    const properties = process.env.PROPERTIES.split(",");
    this.dataService = new DataService(years, properties);
    this.graphUI = new GraphUI(await this.dataService.fetchVisualData(), properties.length + 1);
    this.graphOptions = new GraphOptionsUI(await this.dataService.fetchDataYears(), this.dataService.dates);
    new TableUI(await this.dataService.fetchTableData());
    this.initializeListeners();
  }

  initializeListeners() {
    document.querySelectorAll(".graph-options select")
      .forEach(element => element.addEventListener("change", () => this.onYearSelect(event)));
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

  setGraphStartYear(value: string) {
    if (Number(value) > Number(this.dataService.dates[1])) {
      return;
    }

    this.dataService.dates[0] = value;
  }

  setGraphEndYear(value: string) {
    if (Number(value) < Number(this.dataService.dates[0])) {
      return;
    }

    this.dataService.dates[1] = value;
  }

}

const graph = new DataGraph();
graph.init();