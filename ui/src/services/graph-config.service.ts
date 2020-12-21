import { Dimensions } from "../models/model";

export class GraphConfigService {
  constructor(
    private dimensions: Dimensions = { top: 10, right: 0, bottom: 10, left: 60}
  ) {
  }

  getBaseClass(): string {
    return ".graph";
  }

  getOffset(): string {
    const { left, top } = this.dimensions;
    return `${left},${top}`;
  }
}