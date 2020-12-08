export function getCurrentYear(): string {
  return new Date().getFullYear().toString();
}

export function processQueryParam(param: any, defaultFunction: () => string): string {
  return param ? param : defaultFunction();
}
