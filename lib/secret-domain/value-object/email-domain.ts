export class EmailDomain {
  /**
   * @throws {INVALID_EMAIL_DOMAIN_ERROR} If email domain is invalid
   */
  constructor(readonly value: string) {
    this.validate();
  }

  private validate(): void {
    let value = this.value;
    if (this.value.startsWith("@")) value = this.value.slice(1);
    if (!this.regex.test(value)) throw INVALID_EMAIL_DOMAIN_ERROR;
  }

  private get regex(): RegExp {
    return /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  }
}

export const INVALID_EMAIL_DOMAIN_ERROR = new Error("Email domain is invalid");
