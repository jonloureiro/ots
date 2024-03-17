export function isString(value: unknown): boolean {
  return typeof value === "string";
}

export function isNumber(value: unknown): boolean {
  return typeof value === "number" && !Number.isNaN(value);
}

export function isDate(value: unknown): boolean {
  return value instanceof Date && !Number.isNaN(value.getTime());
}

export function isOptionalString(value: unknown): boolean {
  return value == null || isString(value);
}
