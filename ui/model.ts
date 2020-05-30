export interface DataType {
  date: string | Date | number;
  [property: string]: string | number | boolean | Date;
}

export interface Dimensions {
  top: number;
  right: number;
  bottom: number;
  left: number;
  baseWidth: number;
  baseHeight: number;
}

export type SelectionElement = d3.Selection<SVGGraphicsElement, {}, HTMLElement, any>;
export type TimeScale = d3.ScaleTime<number, number>;
export type LinearScale = d3.ScaleLinear<number, number>;
export type LinePath = d3.Line<DataType>