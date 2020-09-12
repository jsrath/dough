import { Dimensions } from "../models/model";

export class GraphConfigService {
  dimensions: Dimensions = { top: 20, right: 0, bottom: 10, left: 60, baseWidth: 1060, baseHeight: 730 };

  getBaseClass(): string {
    return ".graph";
  }

  getWidth(): number {
    const { baseWidth, left, right } = this.dimensions;
    return baseWidth - left - right;
  }

  getWidthPlusMargins() {
    const { baseWidth, left, right } = this.dimensions;
    return baseWidth + left + right;
  }

  getHeight(): number {
    const { baseHeight, top, bottom } = this.dimensions;
    return baseHeight - top - bottom;
  }

  getHeightPlusMargins() {
    const { baseHeight, top, bottom } = this.dimensions;
    return baseHeight + top + bottom;
  }

  getOffset(): string {
    const { left, top } = this.dimensions;
    return `${left},${top}`;
  }
}