import { assert, describe, expect, it } from "vitest";
import { EmailDomain, EmailDomainErrors } from "./email-domain.js";

describe("EmailValueObject", () => {
  it("should return same value passed to constructor", () => {
    const validEmailDomain1 = "@domain.com";
    const validEmailDomain2 = "domain.com";

    const [emailDomain1, error1] = EmailDomain.new(validEmailDomain1);
    const [emailDomain2, error2] = EmailDomain.new(validEmailDomain2);

    expect(error1).toBeNull();
    expect(emailDomain1?.value).toBe(validEmailDomain1);
    expect(error2).toBeNull();
    expect(emailDomain2?.value).toBe(validEmailDomain2);
  });

  it("should throw error if email is invalid", () => {
    const [emailDomain, error] = EmailDomain.new("invalid_email_domain");

    expect(emailDomain).toBeNull();
    expect(error).toBe(EmailDomainErrors.INVALID_EMAIL_DOMAIN_ERROR);
  });
});
