import { assert, describe, expect, it } from "vitest";
import {
  ExpirationDate,
  IN_PAST_EXPIRATION_DATE_ERROR,
  MORE_THAN_DAYS_LIMIT_EXPIRATION_DATE_ERROR,
} from "./expiration-date.js";

describe("ExpirationDate", () => {
  it("should throw an error if the expiration date is in the past", () => {
    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - 1);
    expect(() => new ExpirationDate(pastDate)).toThrow(IN_PAST_EXPIRATION_DATE_ERROR);
  });

  it("should throw an error if the expiration date is more than 7 days in the future", () => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + ExpirationDate.MAX_EXPIRES_IN_DAYS + 1);
    expect(() => new ExpirationDate(futureDate)).toThrow(MORE_THAN_DAYS_LIMIT_EXPIRATION_DATE_ERROR);
  });

  it("should not throw an error if the expiration date is within the next 7 days", () => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + ExpirationDate.MAX_EXPIRES_IN_DAYS);
    expect(() => new ExpirationDate(futureDate)).not.toThrow();
  });

  it("should not throw an error if the expiration date is undefined or null", () => {
    expect(() => new ExpirationDate(undefined)).not.toThrow();
    expect(() => new ExpirationDate(null as never)).not.toThrow();
  });
});
