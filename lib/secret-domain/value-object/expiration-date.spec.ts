import { assert, describe, expect, it } from "vitest";
import { ExpirationDate, ExpirationDateConstants, ExpirationDateErrors } from "./expiration-date.js";

describe("ExpirationDate", () => {
  const fakeDatetime = {
    now: () => new Date("1212-12-12").getTime(),
  };

  it("should return an error if the expiration date is in the past", () => {
    const pastDate = new Date();
    pastDate.setUTCDate(pastDate.getUTCDate() - 1);

    const [expirationDate, error] = ExpirationDate.new(pastDate);

    expect(expirationDate).toBeNull();
    expect(error).toBe(ExpirationDateErrors.IN_PAST_EXPIRATION_DATE_ERROR);
  });

  it("should return an error if the expiration date is more than 7 days in the future", () => {
    const futureDate = new Date();
    futureDate.setUTCDate(futureDate.getUTCDate() + ExpirationDateConstants.MAX_EXPIRES_IN_DAYS + 1);

    const [expirationDate, error] = ExpirationDate.new(futureDate);

    expect(expirationDate).toBeNull();
    expect(error).toBe(ExpirationDateErrors.MORE_THAN_DAYS_LIMIT_EXPIRATION_DATE_ERROR);
  });

  it("should not return an error if the expiration date is within the next 7 days", () => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + ExpirationDateConstants.MAX_EXPIRES_IN_DAYS);

    const [expirationDate, error] = ExpirationDate.new(futureDate);

    expect(error).toBeNull();
    expect(expirationDate).toBeInstanceOf(ExpirationDate);
    expect(expirationDate?.value).toBe(futureDate);
  });

  it("should return an error if the expiration date is undefined or null", () => {
    const want = new Date("1212-12-19").getTime(); // 12 + 7 = 19

    const [expirationDate1, error1] = ExpirationDate.new(undefined, fakeDatetime);
    const [expirationDate2, error2] = ExpirationDate.new(null as never, fakeDatetime);

    expect(error1).toBeNull();
    expect(expirationDate1).toBeInstanceOf(ExpirationDate);
    expect(expirationDate1?.value?.getTime()).toBe(want);
    expect(error2).toBeNull();
    expect(expirationDate2).toBeInstanceOf(ExpirationDate);
    expect(expirationDate2?.value?.getTime()).toBe(want);
  });
});
