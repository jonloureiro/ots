export const EmailDomainErrors = {
  INVALID_EMAIL_DOMAIN_ERROR: new Error("Email domain is invalid"),
} as const;

export class EmailDomain {
  #value;
  #error;

  get value(): string {
    return this.#value;
  }

  static new(value: string): Result<EmailDomain> {
    const emailDomain = new EmailDomain(value);
    if (emailDomain.#error != null) return [null, emailDomain.#error];
    return [emailDomain, null];
  }

  private constructor(value: string) {
    this.#value = value;
    this.#error = this.#validate();
  }

  #validate(): Error | undefined {
    const regex = /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    let value = this.value;
    if (this.value.startsWith("@")) value = this.value.slice(1);
    if (!regex.test(value)) return EmailDomainErrors.INVALID_EMAIL_DOMAIN_ERROR;
  }
}
