import { EmailDomain } from "../value-object/email-domain.js";
import { Email } from "../value-object/email.js";
import { ExpirationDate } from "../value-object/expiration-date.js";
import { SecretId } from "../value-object/secret-id.js";

export const SecretConstants = {
  MAX_SECRET_LENGTH: 10000,
  MAX_ATTEMPTS: 3,
} as const;

export const SecretErrors = {
  EMAIL_AND_EMAIL_ERROR: new Error("Email or Email Domain must be provided, not both."),
  SECRET_MAX_LENGTH_ERROR: new Error(`Secret must be no more than ${SecretConstants.MAX_SECRET_LENGTH} characters.`),
  ATTEMPTS_MAX_ERROR: new Error(`Attempts must be less than ${SecretConstants.MAX_ATTEMPTS}.`),
  ATTEMPTS_MIN_ERROR: new Error("Attempts must be greater than 0."),
} as const;

const SecretInternalErrors = {
  UNEXPECTED_ERROR: new Error("An unexpected error occurred when creating the secret."),
};

export type SecretProps = {
  id: string;
  content: string;
  email?: string;
  emailDomain?: string;
  remainingAttempts?: number;
  expirationDate?: Date;
};

export class Secret {
  #error;
  #id;
  #content;
  #email;
  #emailDomain;
  #remainingAttempts;
  #expirationDate;

  get id(): SecretId {
    if (this.#id == null) throw SecretInternalErrors.UNEXPECTED_ERROR;
    return this.#id;
  }

  get content(): string {
    return this.#content;
  }

  get email(): Email | null {
    return this.#email;
  }

  get emailDomain(): EmailDomain | null {
    return this.#emailDomain;
  }

  get remainingAttempts(): number {
    return this.#remainingAttempts;
  }

  get expirationDate(): ExpirationDate {
    if (this.#expirationDate == null) throw SecretInternalErrors.UNEXPECTED_ERROR;
    return this.#expirationDate;
  }

  static new(props: SecretProps): Result<Secret> {
    const secret = new Secret(props);
    if (secret.#error != null) return [null, secret.#error];
    return [secret, null];
  }

  private constructor(props: SecretProps) {
    let error: Error | null;
    const errors = [];

    this.#email = null;
    this.#emailDomain = null;

    this.#content = props.content;
    error = this.#validateSecretMaxLength();
    if (error != null) errors.push(error);

    this.#remainingAttempts = props.remainingAttempts ?? SecretConstants.MAX_ATTEMPTS;
    error = this.#validateAttempts();
    if (error != null) errors.push(error);

    if (props.email != null && props.emailDomain == null) {
      const [email, error] = Email.new(props.email);
      if (error != null) errors.push(error);
      this.#email = email;
    }

    if (props.email == null && props.emailDomain != null) {
      const [emailDomain, error] = EmailDomain.new(props.emailDomain);
      if (error != null) errors.push(error);
      this.#emailDomain = emailDomain;
    }

    error = this.#validateEmailOrEmailDomain(props.email, props.emailDomain);
    if (error != null) errors.push(error);

    {
      const [expirationDate, error] = ExpirationDate.new(props.expirationDate);
      if (error != null) errors.push(error);
      this.#expirationDate = expirationDate;
    }

    {
      const [id, error] = SecretId.new(props.id);
      if (error != null) errors.push(error);
      this.#id = id;
    }

    if (errors.length > 0) this.#error = AggregateError(errors, "Invalid secret");
  }

  #validateEmailOrEmailDomain(email?: string, emailDomain?: string): Error | null {
    if (email != null && emailDomain != null) {
      return SecretErrors.EMAIL_AND_EMAIL_ERROR;
    }
    return null;
  }

  #validateSecretMaxLength(): Error | null {
    if (this.#content.length > SecretConstants.MAX_SECRET_LENGTH) {
      return SecretErrors.SECRET_MAX_LENGTH_ERROR;
    }
    return null;
  }

  #validateAttempts(): Error | null {
    if (this.#remainingAttempts > SecretConstants.MAX_ATTEMPTS) {
      return SecretErrors.ATTEMPTS_MAX_ERROR;
    }
    if (this.#remainingAttempts <= 0) {
      return SecretErrors.ATTEMPTS_MIN_ERROR;
    }
    return null;
  }
}
