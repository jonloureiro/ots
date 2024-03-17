export class ExpirationDate {
  static readonly DEFAULT_EXPIRES_IN_DAYS = 7;
  static readonly MAX_EXPIRES_IN_DAYS = 7;
  readonly value: Date;

  /**
   * @throws {IN_PAST_EXPIRATION_DATE_ERROR} If expiration date is in the past
   * @throws {MORE_THAN_DAYS_LIMIT_EXPIRATION_DATE_ERROR} If expiration date is more than days limit in the future
   */
  constructor(value?: Date) {
    this.value = value ?? ExpirationDate.defaultExpirationDate();
    this.validate();
  }

  private validate(): void {
    const now = new Date();
    const dateInSevenDays = new Date(new Date().setDate(now.getDate() + 7));
    if (this.value < now) throw IN_PAST_EXPIRATION_DATE_ERROR;
    if (this.value > dateInSevenDays) throw MORE_THAN_DAYS_LIMIT_EXPIRATION_DATE_ERROR;
  }

  private static defaultExpirationDate(): Date {
    const date = new Date();
    date.setDate(date.getDate() + ExpirationDate.DEFAULT_EXPIRES_IN_DAYS);
    return date;
  }
}

export const MORE_THAN_DAYS_LIMIT_EXPIRATION_DATE_ERROR = new Error(
  `Expiration date must be no more than ${ExpirationDate.MAX_EXPIRES_IN_DAYS} days in the future.`,
);
export const IN_PAST_EXPIRATION_DATE_ERROR = new Error(
  `Expiration date must be in the future and no more than ${ExpirationDate.MAX_EXPIRES_IN_DAYS} days in the future.`,
);
