import { DataType, LinearScale, LinePath, SelectionElement, TimeScale } from "../../models/model";
import { GraphConfigService } from "../../services/graph-config.service";
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
    const graphElement = document.querySelector(baseClass);
    d3.select(`${baseClass} > svg`).remove();
    this.svg = d3.select(baseClass).append("svg");
    this.setGraphDimensions(graphElement.clientWidth, graphElement.clientHeight);
    this.drawGraph(this.data, this.categoryCount);
  }

  private setGraphDimensions(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.offset = this.config.getOffset();
  }

  private drawCanvas(element: SelectionElement): SelectionElement {
    return element.attr("width", this.width)
      .attr("height", this.height + 30)
      .append("g")
      .attr("transform", `translate(${this.offset})`);
  }

  private setDomains(x: TimeScale, y: LinearScale, data: DataType[], categoryCount: number) {
    x.domain(d3.extent(data, (d: DataType) => +this.parseTime(d.date as string)));
    y.domain([0, d3.max(data, (d: DataType) => this.getMaximum(d, categoryCount))]);
  }

  private getMaximum(d: DataType, categoryCount: number): number {
    return Math.max(...Object.values(d).slice(1, categoryCount).map(item => Number(item)));
  }

  private setLineData(x: TimeScale, y: LinearScale, property: string): LinePath {
    return d3.line<DataType>()
      .curve(d3.curveCatmullRom)
      .x(d => x(this.parseTime(d.date as string)))
      .y(d => y(Number(d[property])));
  }

  private extractProperties(data: DataType[], categoryCount: number): string[] {
    return Object.keys(data[0]).slice(1, categoryCount);
  }

  private setAxes(x: TimeScale, y: LinearScale) {
    this.svg.append("g")
      .attr("transform", `translate(0, ${this.height})`)
      .call(d3.axisBottom(x));

    this.svg.append("g")
      .call(d3.axisLeft(y));
  }

  private drawGraph(data: DataType[], categoryCount: number) {
    const x = d3.scaleTime().range([0, this.width - 130]);
    const y = d3.scaleLinear().range([this.height, 0]);
    const properties = this.extractProperties(data, categoryCount);
    this.svg = this.drawCanvas(this.svg);
    this.setDomains(x, y, data, categoryCount);

    properties.forEach((property, index) => {
      this.svg.append("path")
        .data([data])
        .attr("class", "line")
        .attr("d", this.setLineData(x, y, property))
        .style("stroke", d3.schemeSet2[index]);
    });

    this.setAxes(x, y);
  };
}