import { DataType, LinearScale, LinePath, SelectionElement, TimeScale } from "./model"
import { GraphConfigService } from "./graph-config.service"
import * as d3 from "d3";

export class GraphUI {
  svg: SelectionElement;
  config: GraphConfigService;
  width: number;
  height: number;
  offset: string;
  data: DataType[];
  categoryCount: number;
  parseTime = d3.timeParse("%Y-%m-%d");

  constructor(data: DataType[], categoryCount: number) {
    this.data = data;
    this.categoryCount = categoryCount;
    this.config = new GraphConfigService();
    this.initializeSvg();
  }

  initializeSvg() {
    const baseClass = this.config.getBaseClass();
    d3.select(`${baseClass} > svg`).remove();
    this.svg = d3.select(baseClass).append("svg");
    this.setGraphDimensions();
    this.drawGraph(this.data, this.categoryCount);
  }

  setGraphDimensions() {
    this.height = this.config.getHeight();
    this.width = this.config.getWidth();
    this.offset = this.config.getOffset();
  }

  drawCanvas(element: SelectionElement): SelectionElement {
    return element.attr("width", this.config.getWidthPlusMargins())
      .attr("height", this.config.getHeightPlusMargins())
      .append("g")
      .attr("transform", `translate(${this.offset})`);
  }

  setDomains(x: TimeScale, y: LinearScale, data: DataType[], categoryCount: number) {
    x.domain(d3.extent(data, (d: DataType) => +this.parseTime(d.date as string)));
    y.domain([0, d3.max(data, (d: DataType) => this.getMaximum(d, categoryCount))]);
  }

  getMaximum(d: DataType, categoryCount: number): number {
    return Math.max(...Object.values(d).slice(1, categoryCount).map(item => Number(item)))
  }

  setLineData(x: TimeScale, y: LinearScale, property: string): LinePath {
    return d3.line<DataType>()
      .curve(d3.curveCatmullRom)
      .x(d => x(this.parseTime(d.date as string)))
      .y(d => y(Number(d[property])));
  }

  extractProperties(data: DataType[], categoryCount: number): string[] {
    return Object.keys(data[0]).slice(1, categoryCount);
  }

  setAxes(x: TimeScale, y: LinearScale) {
    this.svg.append("g")
      .attr("transform", `translate(0, ${this.height})`)
      .call(d3.axisBottom(x));

    this.svg.append("g")
      .call(d3.axisLeft(y));
  }

  drawGraph(data: DataType[], categoryCount: number) {
    const x = d3.scaleTime().range([0, this.width]);
    const y = d3.scaleLinear().range([this.height, 0]);
    const properties = this.extractProperties(data, categoryCount);
    this.svg = this.drawCanvas(this.svg);
    this.setDomains(x, y, data, categoryCount);

    properties.forEach((property, index) => {
      this.svg.append("path")
        .data([data])
        .attr("class", "line")
        .attr("d", this.setLineData(x, y, property))
        .style("stroke", d3.schemeTableau10[index])
    })

    this.setAxes(x, y);
  };
}