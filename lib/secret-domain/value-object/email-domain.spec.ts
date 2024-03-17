import { assert, describe, expect, it } from "vitest";
import { EmailDomain, INVALID_EMAIL_DOMAIN_ERROR } from "./email-domain.js";

describe("EmailValueObject", () => {
  const validEmailDomain1 = "@domain.com";
  const validEmailDomain2 = "domain.com";

  it("should return same value passed to constructor", () => {
    expect(new EmailDomain(validEmailDomain1).value).toBe(validEmailDomain1);
    expect(new EmailDomain(validEmailDomain2).value).toBe(validEmailDomain2);
  });

  it("should not throw error if email is valid", () => {
    expect(() => new EmailDomain(validEmailDomain1)).not.toThrow();
    expect(() => new EmailDomain(validEmailDomain2)).not.toThrow();
  });

  it("should throw error if email is invalid", () => {
    expect(() => new EmailDomain("invalid_email_domain")).toThrow(INVALID_EMAIL_DOMAIN_ERROR);
  });
});
