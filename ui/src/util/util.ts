  export function parseCategoryName(category: string): string {
    const dashIndex = category.indexOf("-") + 1;
    const categoryName = category.slice(dashIndex, category.length).replace(/([A-Z])/g, " $1");
    return `${categoryName.charAt(0).toUpperCase()}${categoryName.slice(1)}`;
  }
