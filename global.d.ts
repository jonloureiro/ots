declare global {
  type Result<T> = [T, null] | [null, Error];

  interface Datetime {
    now(): number;
  }
}

export type {};
