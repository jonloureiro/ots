import { describe, expect, it } from "vitest";
import { Email, EmailErrors } from "./email.js";

describe("EmailValueObject", () => {
  it("should return same value passed to constructor", () => {
    const validEmail = "valid_email@domain.com";
    const [email, error] = Email.new(validEmail);

    expect(error).toBeNull();
    expect(email?.value).toBe(validEmail);
  });

  it("should return error if email is invalid", () => {
    const [email, error] = Email.new("invalid_email");

    expect(email).toBeNull();
    expect(error).toBe(EmailErrors.INVALID_EMAIL_ERROR);
  });
});
