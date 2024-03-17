import { assert, describe, expect, it } from "vitest";
import { INVALID_SECRET_ID_ERROR, SecretId } from "./secret-id.js";

describe("SecretId", () => {
  const validSecretId = "1234567890123456";
  const invalidSecretId1 = "123456789012345";
  const invalidSecretId2 = "12345678901234567";

  it("should correctly validate secret id length", () => {
    expect(new SecretId(validSecretId).value).toBe(validSecretId);
  });

  it("should throw an error when secret id length is not 16", () => {
    expect(() => new SecretId(invalidSecretId1)).toThrow(INVALID_SECRET_ID_ERROR);
    expect(() => new SecretId(invalidSecretId2)).toThrow(INVALID_SECRET_ID_ERROR);
  });
});
