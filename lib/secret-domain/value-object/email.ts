export class Email {
  /**
   * @throws {INVALID_EMAIL_ERROR} If email is invalid
   */
  constructor(readonly value: string) {
    this.validate();
  }

  private validate(): void {
    if (!this.regex.test(this.value)) throw INVALID_EMAIL_ERROR;
  }

  private get regex(): RegExp {
    return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  }
}

export const INVALID_EMAIL_ERROR = new Error("Email is invalid");
