import { assert, describe, expect, it } from "vitest";

import { EMAIL_AND_EMAIL_ERROR, SECRET_MAX_LENGTH_ERROR, Secret, type SecretProps } from "./secret.js";

describe("secret", () => {
  const greaterThanMaxSecretLength = "a".repeat(Secret.MAX_SECRET_LENGTH + 1);
  const validProps: SecretProps = {
    id: "1234567890123456",
    secret: "encryptedSecret",
    email: "test@example.com",
  };

  it("should not throw any errors if the id, email, and encryptedSecret are valid", () => {
    expect(() => new Secret(validProps)).not.toThrow();
  });

  it("should throw an error if both email and emailDomain are provided", () => {
    try {
      new Secret({ ...validProps, emailDomain: "example.com" });
      assert.fail();
    } catch (error) {
      if (!(error instanceof AggregateError)) assert.fail();
      expect(error.errors).toContain(EMAIL_AND_EMAIL_ERROR);
    }
  });

  it("should throw an error if the secret is more than 10000 characters", () => {
    try {
      new Secret({ ...validProps, secret: greaterThanMaxSecretLength });
      assert.fail();
    } catch (error) {
      if (!(error instanceof AggregateError)) assert.fail();
      expect(error.errors).toContain(SECRET_MAX_LENGTH_ERROR);
    }
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
          secret: greaterThanMaxSecretLength,
        },
        errorLength: 4,
      },
    ],
  ])("should throw an error if %s", (_, testCase) => {
    try {
      new Secret(testCase.props);
      assert.fail();
    } catch (error) {
      if (!(error instanceof AggregateError)) assert.fail();
      expect(error.errors).toHaveLength(testCase.errorLength);
    }
  });
});
