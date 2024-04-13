export const ExpirationDateConstants = {
  DEFAULT_EXPIRES_IN_DAYS: 7,
  MAX_EXPIRES_IN_DAYS: 7,
} as const;

export const ExpirationDateErrors = {
  MORE_THAN_DAYS_LIMIT_EXPIRATION_DATE_ERROR: new Error(
    `Expiration date must be no more than ${ExpirationDateConstants.MAX_EXPIRES_IN_DAYS} days in the future.`,
  ),
  IN_PAST_EXPIRATION_DATE_ERROR: new Error(
    `Expiration date must be in the future and no more than ${ExpirationDateConstants.MAX_EXPIRES_IN_DAYS} days in the future.`,
  ),
} as const;

export class ExpirationDate {
  #value;
  #datetime;
  #error;

  get value(): Date {
    return this.#value;
  }

  static new(value?: Date, datetime?: Datetime): Result<ExpirationDate> {
    const expirationDate = new ExpirationDate(value, datetime);
    if (expirationDate.#error != null) return [null, expirationDate.#error];
    return [expirationDate, null];
  }

  private constructor(value?: Date, datetime?: Datetime) {
    this.#datetime = datetime ?? Date;
    this.#value = value ?? ExpirationDate.#defaultExpirationDate(this.#datetime);
    this.#error = this.#validate();
  }

  #validate(): Error | undefined {
    const now = new Date(this.#datetime.now());
    const dateInSevenDays = new Date(now);
    dateInSevenDays.setUTCDate(now.getUTCDate() + 7);
    if (this.value < now) return ExpirationDateErrors.IN_PAST_EXPIRATION_DATE_ERROR;
    if (this.value > dateInSevenDays) return ExpirationDateErrors.MORE_THAN_DAYS_LIMIT_EXPIRATION_DATE_ERROR;
  }

  static #defaultExpirationDate(datetime: Datetime): Date {
    const date = new Date(datetime.now());
    date.setUTCDate(date.getUTCDate() + ExpirationDateConstants.DEFAULT_EXPIRES_IN_DAYS);
    return date;
  }
}
