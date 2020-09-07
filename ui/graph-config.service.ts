import { Dimensions } from "./model";

export class GraphConfigService {
  dimensions: Dimensions = { top: 20, right: 20, bottom: 30, left: 60, baseWidth: 960, baseHeight: 750 };

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