import { GraphConfigService } from "./graph-config.service"
import { DataService } from "./data.service"
import { GraphUI } from "./graph-ui";
import { TableUI } from "./table-ui";

class DataGraph {
  graphConfig = new GraphConfigService();
  width = this.graphConfig.getWidth();
  height = this.graphConfig.getHeight();

  async init() {
    const years = process.env.YEARS.split(",");
    const properties = process.env.PROPERTIES.split(",");
    const data = new DataService(years, properties, );
    new GraphUI(await data.fetchVisualData(), properties.length + 1);
    new TableUI(await data.fetchTableData());
  }
}

const graph = new DataGraph();
graph.init();