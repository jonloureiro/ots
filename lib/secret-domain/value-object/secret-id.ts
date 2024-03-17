export class SecretId {
  /**
   * @throws {INVALID_SECRET_ID_ERROR} If secret id is invalid
   */
  constructor(readonly value: string) {
    this.validate();
  }

  private validate() {
    if (this.value.length !== 16) throw INVALID_SECRET_ID_ERROR;
  }
}

export const INVALID_SECRET_ID_ERROR = new Error("Secret id is invalid");
