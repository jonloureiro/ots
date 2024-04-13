export const SecretIdErrors = {
  INVALID_SECRET_ID_ERROR: new Error("Secret id is invalid"),
} as const;

export class SecretId {
  #value;
  #error;

  get value(): string {
    return this.#value;
  }

  static new(value: string): Result<SecretId> {
    const secretId = new SecretId(value);
    if (secretId.#error != null) return [null, secretId.#error];
    return [secretId, null];
  }

  private constructor(value: string) {
    this.#value = value;
    this.#error = this.#validate();
  }

  #validate(): Error | undefined {
    if (this.value.length !== 16) return SecretIdErrors.INVALID_SECRET_ID_ERROR;
  }
}
