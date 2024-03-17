import { assert, describe, expect, it } from "vitest";
import { Email, INVALID_EMAIL_ERROR } from "./email.js";

describe("EmailValueObject", () => {
  const validEmail = "valid_email@domain.com";

  it("should return same value passed to constructor", () => {
    expect(new Email(validEmail).value).toBe(validEmail);
  });

  it("should not throw error if email is valid", () => {
    expect(() => new Email(validEmail)).not.toThrow();
  });

  it("should throw error if email is invalid", () => {
    expect(() => new Email("invalid_email")).toThrow(INVALID_EMAIL_ERROR);
  });
});
