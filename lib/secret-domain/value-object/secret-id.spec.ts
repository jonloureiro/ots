import { describe, expect, it } from "vitest";
import { SecretId, SecretIdErrors } from "./secret-id.js";

describe("SecretId", () => {
  it("should correctly validate secret id length", () => {
    const validSecretId = "1234567890123456";

    const [secretId, error] = SecretId.new(validSecretId);

    expect(error).toBeNull();
    expect(secretId?.value).toBe(validSecretId);
  });

  it("should throw an error when secret id length is not 16", () => {
    const invalidSecretId1 = "123456789012345";
    const invalidSecretId2 = "12345678901234567";

    const [secretId1, error1] = SecretId.new(invalidSecretId1);
    const [secretId2, error2] = SecretId.new(invalidSecretId2);

    expect(secretId1).toBeNull();
    expect(error1).toBe(SecretIdErrors.INVALID_SECRET_ID_ERROR);
    expect(secretId2).toBeNull();
    expect(error2).toBe(SecretIdErrors.INVALID_SECRET_ID_ERROR);
  });
});
