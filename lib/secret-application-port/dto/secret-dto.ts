import { isDate, isNumber, isOptionalString, isString } from "@/common-application-layer/type-is";

export class SecretDto {
  /**
   * @throws {AggregateError} if the dto is invalid
   */
  constructor(
    readonly id: string,
    readonly secret: string,
    readonly remainingAttempts: number,
    readonly expirationDate: Date,
    readonly email?: string,
    readonly emailDomain?: string,
  ) {
    const errors: Error[] = [];
    if (isString(id)) errors.push(new Error("Id must be a string"));
    if (isString(secret)) errors.push(new Error("Secret must be a string"));
    if (isNumber(remainingAttempts)) errors.push(new Error("Remaining attempts must be a number"));
    if (isDate(expirationDate)) errors.push(new Error("Expiration date must be a Date"));
    if (!isOptionalString(email)) errors.push(new Error("Email must be a string or undefined"));
    if (!isOptionalString(emailDomain)) errors.push(new Error("Email domain must be a string or undefined"));
    if (errors.length > 0) throw new AggregateError(errors, "Invalid secret dto");
  }
}
