import { EmailDomain } from "../value-object/email-domain.js";
import { Email } from "../value-object/email.js";
import { ExpirationDate } from "../value-object/expiration-date.js";
import { SecretId } from "../value-object/secret-id.js";

export type SecretProps = {
  id: string;
  secret: string;
  email?: string;
  emailDomain?: string;
  remainingAttempts?: number;
  expirationDate?: Date;
};

/**
 * Secret is an entity that represents a secret that can be shared.
 */
export class Secret {
  static readonly MAX_SECRET_LENGTH = 10000;
  static readonly MAX_ATTEMPTS = 3;

  private errors: unknown[] = [];

  readonly id!: SecretId;
  readonly secret: string;
  readonly email?: Email;
  readonly emailDomain?: EmailDomain;
  readonly remainingAttempts: number;
  readonly expirationDate!: ExpirationDate;

  /**
   * @throws {AggregateError} if props are invalid
   */
  constructor({ id, secret, email, emailDomain, remainingAttempts, expirationDate }: SecretProps) {
    this.secret = secret;
    this.remainingAttempts = remainingAttempts ?? Secret.MAX_ATTEMPTS;
    this.validateEmailOrEmailDomain(email, emailDomain);
    this.validateSecretMaxLength();
    this.validateAttempts();

    try {
      this.id = new SecretId(id);
    } catch (error) {
      this.errors.push(error);
    }

    if (email != null && emailDomain == null)
      try {
        this.email = new Email(email);
      } catch (error) {
        this.errors.push(error);
      }

    if (email == null && emailDomain != null)
      try {
        this.emailDomain = new EmailDomain(emailDomain);
      } catch (error) {
        this.errors.push(error);
      }

    console.log("expirationDate", expirationDate);
    try {
      this.expirationDate = new ExpirationDate(expirationDate);
    } catch (error) {
      this.errors.push(error);
    }

    if (this.errors.length) throw new AggregateError(this.errors, "Invalid secret");
  }

  private validateEmailOrEmailDomain(email?: string, emailDomain?: string) {
    if (email != null && emailDomain != null) this.errors.push(EMAIL_AND_EMAIL_ERROR);
  }

  private validateSecretMaxLength() {
    if (this.secret.length > Secret.MAX_SECRET_LENGTH) this.errors.push(SECRET_MAX_LENGTH_ERROR);
  }

  private validateAttempts() {
    if (this.remainingAttempts > Secret.MAX_ATTEMPTS) this.errors.push(ATTEMPTS_MAX_ERROR);
    if (this.remainingAttempts <= 0) this.errors.push(ATTEMPTS_MIN_ERROR);
  }
}

export const EMAIL_AND_EMAIL_ERROR = new Error("Email or Email Domain must be provided, not both.");
export const SECRET_MAX_LENGTH_ERROR = new Error(`Secret must be no more than ${Secret.MAX_SECRET_LENGTH} characters.`);
export const ATTEMPTS_MAX_ERROR = new Error(`Attempts must be less than ${Secret.MAX_ATTEMPTS}.`);
export const ATTEMPTS_MIN_ERROR = new Error("Attempts must be greater than 0.");
