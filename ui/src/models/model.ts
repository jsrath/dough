export interface DataType {
  date: string | Date | number;
  [property: string]: string | number | boolean | Date;
}

export interface TableData {
  [property: string]: number[];
}

export interface Dimensions {
  top: number;
  right: number;
  bottom: number;
  left: number;
  baseWidth: number;
  baseHeight: number;
}

export enum YearType {
  Start = "start", 
  End = "end"
}

export enum DomElements {
  Checkbox = "checkbox",
  Option = "option",
  Input = "input",
  Label = "label",
  Div = "div"
}

export type SelectionElement = d3.Selection<SVGGraphicsElement, {}, HTMLElement, any>;
export type TimeScale = d3.ScaleTime<number, number>;
export type LinearScale = d3.ScaleLinear<number, number>;
export type LinePath = d3.Line<DataType>
export type LabelAttributes = Pick<HTMLLabelElement, "htmlFor" | "innerText">;
export type InputAttributes = Pick<HTMLInputElement, "type" | "name" | "id">;
export type OptionAttributes = Pick<HTMLOptionElement, "text" | "value">;
export type Attributes = LabelAttributes | InputAttributes | OptionAttributes;
export type DOMElement = HTMLInputElement | HTMLLabelElement | HTMLOptionElement;