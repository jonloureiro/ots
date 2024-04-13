export const EmailErrors = {
  INVALID_EMAIL_ERROR: new Error("Email is invalid"),
} as const;

export class Email {
  #value;
  #error;

  get value(): string {
    return this.#value;
  }

  static new(value: string): Result<Email> {
    const email = new Email(value);
    if (email.#error != null) return [null, email.#error];
    return [email, null];
  }

  private constructor(value: string) {
    this.#value = value;
    this.#error = this.#validate();
  }

  #validate(): Error | undefined {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!regex.test(this.value)) return EmailErrors.INVALID_EMAIL_ERROR;
  }
}
