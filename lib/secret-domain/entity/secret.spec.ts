import { assert, describe, expect, it } from "vitest";

import { Secret, SecretConstants, SecretErrors, type SecretProps } from "./secret.js";

describe("Secret", () => {
  const greaterThanMaxSecretLength = "a".repeat(SecretConstants.MAX_SECRET_LENGTH + 1);
  const validProps: SecretProps = {
    id: "1234567890123456",
    content: "encryptedSecret",
    email: "test@example.com",
  };

  it("should not throw any errors if the id, email, and encryptedSecret are valid", () => {
    const [secret, error] = Secret.new(validProps);

    expect(error).toBeNull();
    expect(secret).toBeInstanceOf(Secret);
  });

  it("should throw an error if both email and emailDomain are provided", () => {
    const [secret, error] = Secret.new({ ...validProps, emailDomain: "example.com" });

    expect(secret).toBeNull();
    expect(error).toBeInstanceOf(AggregateError);
    expect((error as AggregateError).errors).toContain(SecretErrors.EMAIL_AND_EMAIL_ERROR);
  });

  it("should throw an error if the secret is more than 10000 characters", () => {
    const [secret, error] = Secret.new({ ...validProps, content: greaterThanMaxSecretLength });

    expect(secret).toBeNull();
    expect(error).toBeInstanceOf(AggregateError);
    expect((error as AggregateError).errors).toContain(SecretErrors.SECRET_MAX_LENGTH_ERROR);
  });

  it.each([
    [
      "email invalid",
      {
        props: { ...validProps, email: "test@invalid" },
        errorLength: 1,
      },
    ],
    [
      "emailDomain invalid",
      {
        props: { ...validProps, emailDomain: "invalid" },
        errorLength: 1,
      },
    ],
    [
      "expirationDate invalid",
      {
        props: { ...validProps, expirationDate: new Date(0) },
        errorLength: 1,
      },
    ],
    [
      "all invalid",
      {
        props: {
          id: "invalid",
          email: "test@invalid",
          expirationDate: new Date(0),
          content: greaterThanMaxSecretLength,
        },
        errorLength: 4,
      },
    ],
  ])("should throw an error if %s", (_, testCase) => {
    const [secret, error] = Secret.new(testCase.props);

    expect(secret).toBeNull();
    expect(error).toBeInstanceOf(AggregateError);
    expect((error as AggregateError).errors).toHaveLength(testCase.errorLength);
  });
});
