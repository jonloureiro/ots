import { describe, expect, it } from "vitest";
import { isDate, isNumber, isOptionalString, isString } from "./type-is.js";

describe("type-is", () => {
  it("should correctly identify strings", () => {
    expect(isString("abc")).toBe(true);
    expect(isString(123)).toBe(false);
  });

  it("should correctly identify numbers", () => {
    expect(isNumber(123)).toBe(true);
    expect(isNumber("abc")).toBe(false);
    expect(isNumber(Number.NaN)).toBe(false);
  });

  it("should correctly identify dates", () => {
    expect(isDate(new Date())).toBe(true);
    expect(isDate("abc")).toBe(false);
    expect(isDate(123)).toBe(false);
  });

  it("should correctly identify optional strings", () => {
    expect(isOptionalString("abc")).toBe(true);
    expect(isOptionalString(null)).toBe(true);
    expect(isOptionalString(undefined)).toBe(true);
    expect(isOptionalString(123)).toBe(false);
    expect(isOptionalString(true)).toBe(false);
    expect(isOptionalString({})).toBe(false);
    expect(isOptionalString([])).toBe(false);
  });
});
